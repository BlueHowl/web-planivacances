<script lang="ts">
  import { FormGroup, Input } from "sveltestrap";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  let passwordVisible: boolean = false;
  function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
  }
</script>

<FormGroup>
  <div id="password-container">
    <Input
      type={passwordVisible ? "text" : "password"}
      name="password"
      placeholder="Mot de passe"
      feedback="Mot de passe requis"
      required
    />
    {#if passwordVisible}
      <i
        class="fa-solid fa-eye-slash"
        on:click={togglePasswordVisibility}
        on:keypress={togglePasswordVisibility}
      />
    {:else}
      <i
        class="fa-solid fa-eye"
        on:click={togglePasswordVisibility}
        on:keypress={togglePasswordVisibility}
      />
    {/if}
  </div>
</FormGroup>

<style>
  #password-container {
    display: flex;
    align-items: center;
  }

  #password-container i {
    margin-left: -30px;
  }
</style>
