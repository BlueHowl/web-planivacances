<script lang="ts">
  import { Link } from "svelte-navigator";
  import HolidaysSection from "../../organism/HolidaysSection.svelte";
</script>

<h1>Mes vacances</h1>
<Link to="/newHoliday">Ajouter une période de vacances</Link>

<HolidaysSection />
