<script lang="ts">
  import { onMount } from "svelte";
  import { useLocation } from "svelte-navigator";
  import {
    ArrayQueue,
    ConstantBackoff,
    Websocket,
    WebsocketBuilder,
    WebsocketEvent,
  } from "websocket-ts";
  import InputMessage from "./InputMessage.svelte";
  import MessageItem from "./MessageItem.svelte";
  import { formatTimestampForDisplay } from "../utils/DateFormatter";

  const location = useLocation();

  let definedHoliday = false;
  let title: string;
  let uid = "usuzok367272";
  let groupId = 1;
  let displayName = "John Doe";

  let messages: any = [];

  if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    title = state.title;
  }

  const tchatWS = new WebsocketBuilder(
    "ws://localhost:8080/websocket-groupMessages"
  )
    .withBuffer(new ArrayQueue()) // buffer messages when disconnected
    .withBackoff(new ConstantBackoff(3000)) // retry every 3s
    .build();

  const onMessageReceived = (i: Websocket, event: MessageEvent) => {
    console.log(`received message:${event.data}`);
    addMessage(event.data);
  };

  function addMessage(message: any) {
    messages = [...messages, message];
  }

  function sendMessage(event: CustomEvent) {
    tchatWS.send(
      JSON.stringify({
        sender: uid,
        displayName: displayName,
        groupId: groupId,
        content: event.detail.message,
        time: Date.now(),
      })
    );
  }

  onMount(() => {
    tchatWS.addEventListener(WebsocketEvent.open, () => {
      console.log("opened message websocket!");

      tchatWS.send(JSON.stringify({ command: "init", groupId: groupId }));
    });

    tchatWS.addEventListener(WebsocketEvent.close, () =>
      console.log("closed message websocket!")
    );

    tchatWS.addEventListener(WebsocketEvent.message, onMessageReceived);
  });
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
