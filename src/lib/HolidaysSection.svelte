<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import CustomCard from "./CustomCard.svelte";

  const navigate = useNavigate();

  type Holiday = {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    place: string;
    description: string;
    isPublish: boolean;
  };

  let holidays: Holiday[] = [
    {
      id: 1,
      title: "Weekend en amoureux",
      startDate: "2023-10-20",
      endDate: "2023-10-22",
      place: "Rue des Pottiers 3 à 2344 LoveCity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo.",
      isPublish: true,
    },
    {
      id: 2,
      title: "Séjour à la montagne",
      startDate: "2023-11-26",
      endDate: "2023-12-05",
      place: "Rue des Montagnes 44 à 2223 MontagneCity",
      description:
        "Maecenas ullamcorper tempus nisi, eget pulvinar nulla accumsan condimentum.Maecenas ullamcorper tempus nisi, eget pulvinar nulla accumsan condimentum.",
      isPublish: false,
    },
  ];

  function handleNavToDetails(event: CustomEvent) {
    navigate("/holidayDetails", {
      state: holidays.find((elem) => elem.id === event.detail.id),
    });
  }
</script>

<section id="holidays-container">
  {#each holidays as holiday}
    <CustomCard
      id={holiday.id}
      title={holiday.title}
      startDate={holiday.startDate}
      endDate={holiday.endDate}
      description={holiday.description}
      on:navToDetails={handleNavToDetails}
    />
  {/each}
</section>

<style>
  #holidays-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }
</style>
