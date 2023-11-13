<script lang="ts">
    export let sender: string;
    export let content: string;
    export let time: string;
    export let isCurrentUser = false;
  </script>
  
  <div class="{isCurrentUser ? 'text-right' : 'text-left'}">
    <p>{sender}</p>
    <div class="message-bubble {isCurrentUser ? 'bg-primary text-white' : 'bg-light'}">
      <p class="mb-0">{content}</p>
      <p class="mb-0 text-right">{time}</p>
    </div>
  </div>
  
  <style>
    .message-bubble {
      max-width: 70%;
      padding: 10px;
      border-radius: 10px;
      margin: 5px;
    }

  </style>