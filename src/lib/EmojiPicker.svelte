<script lang="ts">
  import { EmojiButton } from "@joeattardi/emoji-button";
  import { createEventDispatcher } from "svelte";
  //import "@fortawesome/fontawesome-free/css/all.min.css";

  const dispatch = createEventDispatcher();

  const picker = new EmojiButton();
  let trigger: any;

  picker.on("emoji", (selection) => {
    dispatch("change", selection);
  });

  function togglePicker() {
    picker.togglePicker(trigger);
  }
</script>

<button id="emoji-button" type="button" on:click={togglePicker}>
  <i class="fa-regular fa-face-smile" />
</button>

<style>
  #emoji-button {
    padding: 0.3rem 0.2rem;
  }
</style>
