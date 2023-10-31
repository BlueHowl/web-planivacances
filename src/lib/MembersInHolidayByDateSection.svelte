<script lang="ts">
  import { Button, Input } from "sveltestrap";
  import GreyParagraphFrame from "./GreyParagraphFrame.svelte";
  let counterMembersInHolidayForADate: number = 250;
</script>

<section id="numberMembersInHolidayByDate">
  <p>Découvrez le nombre de personnes en vacances le jour de votre choix :</p>
  <div id="searchHolidayByDateBar">
    <Input type="date" name="date" style="margin-right:0.2rem;" />
    <Button color="primary" outline>Valider</Button>
  </div>
  <GreyParagraphFrame
    paragraphContent="{counterMembersInHolidayForADate} {counterMembersInHolidayForADate >
    1
      ? 'membres'
      : 'membre'}"
  />
</section>

<style>
  #numberMembersInHolidayByDate {
    margin: 2rem auto;
    width: 32rem;
  }

  #searchHolidayByDateBar {
    display: flex;
    flex-direction: row;
  }
</style>
