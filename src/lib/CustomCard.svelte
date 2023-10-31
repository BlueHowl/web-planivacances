<script lang="ts">
  import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink,
  } from "sveltestrap";

  import { Link } from "svelte-navigator";

  export let title: string;
  export let startDate: string;
  export let endDate: string;
  export let description: string;
  export let link: string;
</script>

<Card
  style="width: 22rem; height:15rem;margin-bottom: 20px; margin-right:1rem;"
>
  <CardBody>
    <CardTitle
      >{title.length > 20 ? `${title.substring(0, 20)}...` : title}</CardTitle
    >
    <CardSubtitle class="mb-2 text-muted"
      >Du {startDate} au {endDate}</CardSubtitle
    >
    <CardText>
      {description.length > 70
        ? `${description.substring(0, 70)}...`
        : description}
    </CardText>
    <CardLink><Link to={link}>Consulter</Link></CardLink>
  </CardBody>
</Card>
