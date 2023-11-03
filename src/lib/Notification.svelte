<script lang="ts">
  export let title: string;
  export let action: string;
</script>

<div class="row" id="notification">
  <div class="col" id="title">{title}</div>
  <div class="col">{action}</div>
  <div class="col" id="buttons">
    <i class="fa-solid fa-square-check fa-2xl" style="color: #5d9f28;" />
    <i class="fa-solid fa-square-xmark fa-2xl" style="color: #cc192b;" />
  </div>
</div>

<style>
  #notification {
    margin-bottom: 1rem;
    background-color: #f2f2f2;
    padding: 1rem;
  }

  #title {
    font-weight: bold;
    text-align: left;
  }

  #buttons {
    text-align: right;
  }

  #buttons * {
    cursor: pointer;
  }
</style>
