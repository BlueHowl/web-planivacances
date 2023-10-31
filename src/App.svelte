<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  let basepath = import.meta.env.BASE_URL;

  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";
  import Contact from "./lib/Contact.svelte";
  import Connection from "./lib/Connection.svelte";
  import Register from "./lib/Register.svelte";
  import Holidays from "./lib/Holidays.svelte";
  import NewHoliday from "./lib/NewHoliday.svelte";
</script>

<Router {basepath}>
  <Header />
  <main class="app">
    <Route path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/register" component={Register} />
    <Route path="/connection" component={Connection} />
    <Route path="/profile">Mon profil</Route>
    <Route path="/holidays" component={Holidays} />
    <Route path="/newHoliday" component={NewHoliday} />
    <Route path="/notifications">Mes notifications</Route>
  </main>
</Router>

<Footer />
