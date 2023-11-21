<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import CustomCard from "./CustomCard.svelte";
  import { groupListStore } from "../stores/group";
  import { loadUserGroups } from "../service/GroupService";
  import type { Group } from "../model/Group";
  import { onMount } from "svelte";
  import { currentGroupId } from "../stores/currentGroup";

  const navigate = useNavigate();

  let groups: Group[] = [];

  onMount(() => {
    const unsubscribe = groupListStore.subscribe((value) => {
      groups = Object.values(value ?? {}) || [];
    });

    return unsubscribe;
  });

  loadUserGroups();

  function handleNavToDetails(event: CustomEvent) {
    currentGroupId.set(event.detail.id);
    navigate("/holidayDetails");
  }
</script>

<section id="holidays-container">
  {#if groups.length != 0}
    {#each groups as group}
      <CustomCard
        id={group.gid}
        title={group.groupName}
        startDate={group.startDate}
        endDate={group.endDate}
        description={group.description}
        on:navToDetails={handleNavToDetails}
      />
    {/each}
  {/if}
</section>

<style>
  #holidays-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }
</style>
