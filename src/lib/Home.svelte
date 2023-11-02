<script lang="ts">
  import RegistredMembersSection from "./RegistredMembersSection.svelte";
  import MembersInHolidayByDateSection from "./MembersInHolidayByDateSection.svelte";
  import HolidaysByCountrySection from "./HolidaysByCountrySection.svelte";
</script>

<p id="catchPhrase" class="text-primary">
  Voyagez mieux, ensemble.<br />Organisez vos vacances en un clin d'œil !
</p>

<RegistredMembersSection />

<MembersInHolidayByDateSection />

<HolidaysByCountrySection />

<style>
  #catchPhrase {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
