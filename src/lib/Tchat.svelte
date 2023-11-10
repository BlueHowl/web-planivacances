<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import {
    ArrayQueue,
    ConstantBackoff,
    Websocket,
    WebsocketBuilder,
    WebsocketEvent
  } from "websocket-ts";
    import InputMessage from "./InputMessage.svelte";

  const location = useLocation();

  let definedHoliday = false;
  let title: string;

  if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    title = state.title;
  }

  const tchatWS = new WebsocketBuilder("ws://localhost:8080")
    .withBuffer(new ArrayQueue())           // buffer messages when disconnected
    .withBackoff(new ConstantBackoff(1000)) // retry every 1s
    .build();


  const OnMessageReceived = (i: Websocket, event: MessageEvent) => {
    console.log(`received message: ${event.data}`);
  };

  tchatWS.addEventListener(WebsocketEvent.open, () => console.log("opened!"));
  tchatWS.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
  tchatWS.addEventListener(WebsocketEvent.message, OnMessageReceived);


  function sendMessage(event: CustomEvent) {
    tchatWS.send(JSON.stringify(event.detail.message));
  }

</script>

{#if definedHoliday}
  <h1>Tchat - {title}</h1>
  <section id="tchat" />
  <InputMessage on:send={sendMessage}></InputMessage>
{:else}
  <h1>Impossible de charger le tchat pour ce voyage</h1>
{/if}
