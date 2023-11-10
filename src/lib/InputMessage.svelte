<script lang="ts">
    import { FormGroup, Form, Input } from "sveltestrap";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import EmojiPicker from "./EmojiPicker.svelte";
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();

    let messageText: string;

    function onSubmit(e: any) {
      e.preventDefault();

      const formData = new FormData(e.target);

      dispatch("send", {message: formData.get("message") as string});
    }

    function appendEmoji(event: CustomEvent) {
      messageText += event.detail.emoji;
    }
    
  </script>
  
  <Form on:submit={onSubmit}>
    <FormGroup>

      <EmojiPicker on:change={appendEmoji} />

      <div id="message-container">
          <Input
              textContent={messageText}
              type={"text"}
              name="message"
              placeholder="Message"
              required
          />

          <i class="fa-regular fa-paper-plane" 
              on:click={onSubmit}
              on:keypress={onSubmit} />
      </div>
    </FormGroup>
  </Form>
  
  <style>
    #message-container {
      display: flex;
      align-items: center;
    }
  
    #message-container > i {
      margin-left: -30px;
    }
  </style>
  