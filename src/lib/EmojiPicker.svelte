<script lang="ts">
    import { EmojiButton } from "@joeattardi/emoji-button";
    import { createEventDispatcher } from "svelte";
    //import "@fortawesome/fontawesome-free/css/all.min.css";
  
    const dispatch = createEventDispatcher();
  
    const picker = new EmojiButton();
    let trigger: any;
  
    picker.on("emoji", selection => {
      dispatch("change", selection);
    });
  
    function togglePicker() {
      picker.togglePicker(trigger);
    }
  </script>
  
  <button bind:this={trigger} on:click={togglePicker}>
    <i class="fa-regular fa-face-smile"></i>
    <!--<img src="../assets/emoji-icon.png" alt="emoji menu" style="width: 2rem; height: 2rem" />-->
  </button>