<script lang="ts">
  import Notification from "./Notification.svelte";

  let notifications = [
    { title: "Vacances en amoureux", action: "Rejoindre le groupe" },
    { title: "Vacances à la montagne", action: "Rejoindre le groupe" },
    { title: "Vacances à la plage", action: "Rejoindre le groupe" },
  ];
</script>

<section id="notificationsSection" class="container">
  {#each notifications as notification}
    <Notification title={notification.title} action={notification.action} />
  {/each}
</section>

<style>
  #notificationsSection {
    display: flex;
    flex-direction: column;
  }
</style>
