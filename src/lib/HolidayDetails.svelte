<script lang="ts">
  import { useLocation, useNavigate } from "svelte-navigator";
  import { Button, FormGroup } from "sveltestrap";
  import { format } from 'date-fns';
  import Calendar from "../assets/calendrier.png";
  import Weather from "../assets/meteo.png";
  import Tchat from "../assets/tchat.png";
  import { groupListStore } from "../stores/group";
  import type { GroupMap } from "../model/GroupMap";
  import { currentGroupId as currentGroupId } from "../stores/currentGroup";

  const location = useLocation();
  const navigate = useNavigate();

  let groups: GroupMap = $groupListStore || {};
  
  let group = groups[$currentGroupId];
  let address = `${group.place.street}, ${group.place.number} ${group.place.city} ${group.place.country}`;
  let formattedStartDate = format(new Date(group.startDate), "dd/MM/yyyy");
  let formattedEndDate = format(new Date(group.endDate), "dd/MM/yyyy");


  function addMemberToHoliday() {
    const mail = window.prompt(
      "Ajout d'un membre au voyage\nEntrez ci-dessous l’email de l’utilisateur à ajouter..."
    );
  }

  function handleUpdateHoliday() {
    navigate("/updateHoliday", { state: $location.state });
  }

  function onGoToPlanning() {
    navigate("/planning", { state: { id: $location.state.id } });
  }

  function onGoToWeather() {
    navigate("/weather", { state: { place: $location.state.place } });
  }

  function onGoToTchat() {
    navigate("/tchat", { state: { title: $location.state.title } });
  }
</script>

<section id="holidayDetails">
  {#if group.gid != null}
    <i
      id="addMemberIcone"
      class="fa-solid fa-user-plus fa-2xl"
      on:click={addMemberToHoliday}
      on:keypress={addMemberToHoliday}
    />
    <h1>{group.groupName}</h1>
    <h2>Du {formattedStartDate} au {formattedEndDate}</h2>
    <h3>{address}</h3>
    <p>{group.description}</p>
    <!--<FormGroup style="display:flex;justify-content:center;">
      <Input
        type="switch"
        label="Publier ce voyage"
        bind:checked={isPublish}
        on:change={handleSwitchChange}
      />
    </FormGroup>-->
    <!--En faire un nouveau composant ? (ActionsForHoliday) -->
    <div id="moreActionsForHoliday">
      <div
        id="goToPlanning"
        on:click={onGoToPlanning}
        on:keypress={onGoToPlanning}
      >
        <img src={Calendar} alt="Icône calendrier" />
        <h4>Planning</h4>
      </div>
      <div
        id="goToWeather"
        on:click={onGoToWeather}
        on:keypress={onGoToWeather}
      >
        <img src={Weather} alt="Icône météo" />
        <h4>Météo</h4>
      </div>
      <div id="goToTchat" on:click={onGoToTchat} on:keypress={onGoToTchat}>
        <img src={Tchat} alt="Icône tchat" />
        <h4>Tchat</h4>
      </div>
    </div>
    <div>
      <Button color="primary" on:click={handleUpdateHoliday}>Modifier</Button>
      <Button color="danger">Supprimer</Button>
    </div>
  {:else}
    <h1>Aucun voyage trouvé</h1>
  {/if}
</section>

<style>
  #holidayDetails {
    width: 60%;
    margin: auto;
  }
  #addMemberIcone {
    margin-bottom: 1rem;
  }

  #moreActionsForHoliday {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    width: 30rem;
    height: auto;
    margin: auto;
    margin-bottom: 2rem;
    background-color: #f2f2f2;
  }

  #moreActionsForHoliday div:hover {
    cursor: pointer;
  }
</style>
