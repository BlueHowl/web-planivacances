<script lang="ts">
  import { Input, Button } from "sveltestrap";
  import GreyParagraphFrame from "./GreyParagraphFrame.svelte";
  let counterHolidaysForACountry: number = 15;
</script>

<section id="numberHolidaysByCountry">
  <p>Découvrez le nombre de voyages par pays :</p>
  <div id="searchHolidayByCountry">
    <Input type="select" name="select" style="margin-right:0.2rem;">
      <option value="">Bulgarie</option>
    </Input>
    <Button color="primary" outline>Valider</Button>
  </div>

  <GreyParagraphFrame
    paragraphContent="{counterHolidaysForACountry} {counterHolidaysForACountry >
    1
      ? 'voyages'
      : 'voyage'}"
  />
</section>

<style>
  #numberHolidaysByCountry {
    margin: 2rem auto;
    width: 32rem;
  }

  #searchHolidayByCountry {
    display: flex;
    flex-direction: row;
  }
</style>
