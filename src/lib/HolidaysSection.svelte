<script lang="ts">
  import CustomCard from "./CustomCard.svelte";

  type Holiday = {
    title: string;
    startDate: string;
    endDate: string;
    place: string;
    description: string;
    isPublish: boolean;
  };

  let holidays: Holiday[] = [
    {
      title: "Weekend en amoureux",
      startDate: "20/10/2023",
      endDate: "22/10/2023",
      place: "Rue des Pottiers 3 à 2344 LoveCity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus quis leo.",
      isPublish: false,
    },
    {
      title: "Séjour à la montagne",
      startDate: "26/11/2023",
      endDate: "05/12/2023",
      place: "Rue des Montagnes 44 à 2223 MontagneCity",
      description:
        "Maecenas ullamcorper tempus nisi, eget pulvinar nulla accumsan condimentum.Maecenas ullamcorper tempus nisi, eget pulvinar nulla accumsan condimentum.",
      isPublish: false,
    },
  ];
</script>

<section id="holidays-container">
  {#each holidays as holiday}
    <CustomCard
      title={holiday.title}
      startDate={holiday.startDate}
      endDate={holiday.endDate}
      description={holiday.description}
      link={"/"}
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
