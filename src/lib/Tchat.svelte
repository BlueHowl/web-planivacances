<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useLocation } from "svelte-navigator";
  import { Websocket } from "websocket-ts";
  import { CompatClient, Stomp, StompHeaders } from "@stomp/stompjs";
  import InputMessage from "./InputMessage.svelte";
  import MessageItem from "./MessageItem.svelte";
  import { formatTimestampForDisplay } from "../utils/DateFormatter";
  import { userStore } from "../stores/User";
  import { getIdToken } from "../service/AuthService";

  let definedHoliday = false;
  let messages: any = [];
  let uid: string;
  let title: string;
  let groupId: string;
  let displayName: string;
  const location = useLocation();
  let headers: StompHeaders | undefined;

  let tchatWS: CompatClient | null;

  function sendMessage(event: CustomEvent) {
    if (tchatWS != null && headers != undefined) {
      tchatWS.send(
        "/app/message",
        headers,
        JSON.stringify({
          sender: uid,
          displayName: displayName,
          groupId: groupId,
          content: event.detail.message,
          time: Date.now(),
        })
      );
    }
  }

  if ($userStore) {
    uid = $userStore.uid;
    displayName = $userStore.displayName;

    if (location && $location.state) {
      definedHoliday = true;
      const state = $location.state;
      groupId = state.id;
      title = state.title;
    }

    const onMessageReceived = (message: any) => {
      message = JSON.parse(message.body);
      addMessage(message);
    };

    function addMessage(message: any) {
      messages = [...messages, message];
    }

    onMount(async () => {
      const token = await getIdToken();
      if (token != null) {
        tchatWS = Stomp.client("ws://localhost:8080/websocket-groupMessages");

        headers = {
          Authorization: `Bearer ${token}`,
          GroupId: groupId,
        };

        tchatWS.connect(headers, () => {
          console.log("WebSocket connecté");
          tchatWS?.subscribe(
            "/user/group/messages",
            (message) => {
              onMessageReceived(message);
            },
            headers
          );
          onDestroy(() => {
            tchatWS?.unsubscribe("/user/group/messages", headers);
            tchatWS?.disconnect();
          });
        });
      }
    });
  }
</script>

{#if definedHoliday}
  <h1>Tchat - {title}</h1>
  <section id="tchat">
    {#each messages as message (message)}
      <MessageItem
        sender={message.displayName}
        content={message.content}
        time={formatTimestampForDisplay(message.time)}
        isCurrentUser={message.sender === uid}
      />
    {/each}
  </section>
  <InputMessage on:send={sendMessage} />
{:else}
  <h1>Impossible de charger le tchat pour ce voyage</h1>
{/if}
