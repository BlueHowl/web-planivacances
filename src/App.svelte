<script lang="ts">
  import { Router, Route } from 'svelte-routing';

  import Footer from './lib/Footer.svelte';
  import Header from './lib/Header.svelte';
  import Home from './lib/Home.svelte';

  export let url = "";

</script>

<Router {url}> <!--basepath = "/~d170051/APOD">-->
  <Header></Header>
  <main class="app">
    <Route path="/" component={Home} />

    <Route path="/test">
      <h1>"Coucou Mr Hendrikx !"</h1>
    </Route>
  </main>
</Router>

<Footer></Footer>