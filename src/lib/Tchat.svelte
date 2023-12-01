<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Pusher, { Channel } from "pusher-js";
  import { PUSHER } from "../utils/config";
  import InputMessage from "./InputMessage.svelte";
  import MessageItem from "./MessageItem.svelte";
  import { formatTimestampForDisplay } from "../utils/DateFormatter";
  import { userStore } from "../stores/user";
  import { getIdToken } from "../service/AuthService";
  import { groupListStore } from "../stores/groups";
  import { currentGidStore as currentGidStore } from "../stores/currentGroup";
  import type { GroupMap } from "../model/GroupMap";

  let definedHoliday = false;
  let messages: any = [];
  let token: string;
  let uid: string;
  let title: string;
  let groupId: string;
  let displayName: string;
  let tchatWS: Pusher | null;
  let channel: Channel | null;
  let previousMessagesLoaded: boolean = false;

  let groups: GroupMap = $groupListStore || {};
  let group = groups[$currentGidStore];

  function sendMessage(event: CustomEvent) {
    if (token && groupId) {
      fetch("http://localhost:8080/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender: uid,
          displayName: displayName,
          groupId: groupId,
          content: event.detail.message,
          time: Date.now(),
        }),
      });
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

    function addMessage(message: any) {
      if (messages.length == 100) {
        messages.shift();
      }
      messages = [...messages, message];

      document.querySelector("footer")?.scrollIntoView();
    }

    onMount(async () => {
      token = await getIdToken();
      if (token != null) {
        tchatWS = new Pusher(PUSHER.key, {
          cluster: PUSHER.cluster,
          authEndpoint: "http://localhost:8080/api/chat/",
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        tchatWS.connect();

        channel = tchatWS.subscribe(`private-${groupId}`);

        channel.bind("pusher:subscription_succeeded", () => {
          loadPreviousMessages(token, groupId);
        });

        channel.bind("new_messages", (message) => {
          if (previousMessagesLoaded) {
            addMessage(message);
          }
        });
      }
    });
    onDestroy(() => {
      console.log("onDestroy called");
      channel?.unbind("pusher:subscription_succeeded");
      channel?.unbind("new_messages");
      tchatWS?.unsubscribe(`private-${groupId}`);
      tchatWS?.disconnect();
    });

    const loadPreviousMessages = async (authToken: string, gid: string) => {
      const response = await fetch("http://localhost:8080/api/chat/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          GID: gid,
        },
      });

      if (response.ok) {
        const messages = await response.json();
        messages.forEach((message) => {
          addMessage(message);
        });
        previousMessagesLoaded = true;
      }
    };
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
  <div style="height:2rem" />
{:else}
  <h1>Impossible de charger le tchat pour ce voyage</h1>
{/if}
