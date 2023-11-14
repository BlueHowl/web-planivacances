<script lang="ts">
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

  const location = useLocation();

  let definedHoliday = false;
  let title: string;

  let messages: any = [];

  if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    title = state.title;
  }

  const tchatWS = new WebsocketBuilder("ws://localhost:8080")
    .withBuffer(new ArrayQueue()) // buffer messages when disconnected
    .withBackoff(new ConstantBackoff(1000)) // retry every 1s
    .build();

  const onMessageReceived = (i: Websocket, event: MessageEvent) => {
    console.log(`received message: ${event.data}`);
    addMessage(event.data, false);
  };

  function addMessage(message: any, isCurrentUser: boolean) {
    message.isCurrentUser = isCurrentUser; //TODO fonctionne?
    messages = [...messages, message];
  }

  tchatWS.addEventListener(WebsocketEvent.open, () =>
    console.log("opened message websocket!")
  );
  tchatWS.addEventListener(WebsocketEvent.close, () =>
    console.log("closed message websocket!")
  );
  tchatWS.addEventListener(WebsocketEvent.message, onMessageReceived);

  function sendMessage(event: CustomEvent) {
    tchatWS.send(JSON.stringify(event.detail.message));
    addMessage(
      {
        sender: "john.doe@gmail.com",
        content: event.detail.message,
        time: "13/11/23 - 18h45", // A faire côté serveur ?
      },
      false
    );
  }
</script>

{#if definedHoliday}
  <h1>Tchat - {title}</h1>
  <section id="tchat">
    {#each messages as message (message)}
      <MessageItem
        sender={message.sender}
        content={message.content}
        time={message.time}
        isCurrentUser={message.isCurrentUser}
      />
    {/each}
  </section>
  <InputMessage on:send={sendMessage} />
{:else}
  <h1>Impossible de charger le tchat pour ce voyage</h1>
{/if}
