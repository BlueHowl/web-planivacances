<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  const navigate = useNavigate();
  let isConnected: Boolean = true;
  let mail = isConnected ? "maxime123.cao@gmail.com" : "";
  let subject = "";
  let message = "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/admin/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
            subject: subject,
            message: message,
          }),
        }
      );

      if (response.ok) {
        console.log("Message envoyé avec succès");
        navigate("/");
      } else {
        console.error("Erreur lors de l'envoi du message");
      }
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message");
    }
  };
</script>

<h1>Contacter l'administrateur</h1>
<section id="contactForm">
  <Form on:submit={handleSubmit}>
    <FormGroup floating label="Votre email">
      {#if isConnected}
        <Input type="email" name="email" value={mail} disabled />
      {:else}
        <Input type="email" name="email" bind:value={mail} />
      {/if}
    </FormGroup>
    <FormGroup floating label="Sujet">
      <Input id="subject" name="subject" bind:value={subject} />
    </FormGroup>
    <FormGroup floating label="Ecrivez votre message ici...">
      <Input type="textarea" name="message" bind:value={message} />
    </FormGroup>
    <Button type="submit" color="primary" class="w-75">Envoyer</Button>
  </Form>
</section>

<style>
  #contactForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
