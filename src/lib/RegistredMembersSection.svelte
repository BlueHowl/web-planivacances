<script lang="ts">
  import { Link } from "svelte-navigator";
  let counterMembers: number = 10231;
  let isConnected: Boolean = false;
</script>

<section id="numberRegistredMembers" class="bg-primary">
  <p>
    Nous comptons déjà <span id="counterMembers">{counterMembers}</span> membres
    !
  </p>
  {#if !isConnected}
    <Link class="text-white text-decoration-underline" to="/register"
      >Cliquez ici pour nous rejoindre</Link
    >
  {:else}
    <p>Et tout cela, c’est grâce à vous !</p>
  {/if}
</section>

<style>
  #numberRegistredMembers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 600;
    width: 33rem;
    height: 11.0625rem;
    flex-shrink: 0;
    color: white;
  }

  #counterMembers {
    font-size: 1.5rem;
  }
</style>
