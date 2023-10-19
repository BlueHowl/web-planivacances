<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  let basepath = import.meta.env.BASE_URL;

  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";
</script>

<Router {basepath}>
  <Header />
  <main class="app">
    <Route path="/" component={Home} />

    <Route path="/test">
      <h1>"Coucou Mr Hendrikx !"</h1>
    </Route>
  </main>
</Router>

<Footer />
