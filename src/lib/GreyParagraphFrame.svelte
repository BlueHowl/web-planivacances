<script lang="ts">
  export let paragraphContent: string;
</script>

<p id="greyParagraphFrame">
  {paragraphContent}
</p>

<style>
  #greyParagraphFrame {
    margin: 1.5rem auto;
    padding: 1.5rem;
    color: #007bff;
    font-weight: 600;
    font-size: 1.3rem;
    border-radius: 5px;
    width: 25rem;
    background-color: #f2f2f2;
  }
</style>
