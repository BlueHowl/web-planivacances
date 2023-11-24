<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { CompatClient, Stomp, StompHeaders } from "@stomp/stompjs";
  import InputMessage from "./InputMessage.svelte";
  import MessageItem from "./MessageItem.svelte";
  import { formatTimestampForDisplay } from "../utils/DateFormatter";
  import { userStore } from "../stores/User";
  import { getIdToken } from "../service/AuthService";
  import { groupListStore } from "../stores/groups";
  import { currentGidStore as currentGidStore } from "../stores/currentGroup";
  import type { GroupMap } from "../model/GroupMap";

  let definedHoliday = false;
  let messages: any = [];
  let uid: string;
  let title: string;
  let groupId: string;
  let displayName: string;
  let headers: StompHeaders | undefined;
  let tchatWS: CompatClient | null;

  let groups: GroupMap = $groupListStore || {};
  let group = groups[$currentGidStore];

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

    if (group) {
      definedHoliday = true;
      groupId = group.gid;
      title = group.groupName;
    }

    const onMessageReceived = (message: any) => {
      message = JSON.parse(message.body);
      addMessage(message);
    };

    function addMessage(message: any) {
      if (messages.length == 100) {
        messages.shift();
      }

      messages = [...messages, message];
    }


    onMount(async () => {
      const token = await getIdToken();
      if (token != null) {
        tchatWS = Stomp.client(
          "ws://localhost:8080/websocket-groupMessages" //"wss://studapps.cg.helmo.be:5011/REST_CAO_BART/websocket-groupMessages"
        );

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
