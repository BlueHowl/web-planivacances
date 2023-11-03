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
  import HolidayDetails from "./lib/HolidayDetails.svelte";
  import UpdateHoliday from "./lib/UpdateHoliday.svelte";
  import ActivitiesPlanning from "./lib/ActivitiesPlanning.svelte";
  import ActivityDetails from "./lib/ActivityDetails.svelte";
  import NewActivity from "./lib/NewActivity.svelte";
  import UpdateActivity from "./lib/UpdateActivity.svelte";
  import Tchat from "./lib/Tchat.svelte";
  import Weather from "./lib/Weather.svelte";
  import NotificationPage from "./lib/NotificationPage.svelte";
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
    <Route path="/updateHoliday" component={UpdateHoliday} />
    <Route path="/holidayDetails" component={HolidayDetails} />
    <Route path="/newActivity" component={NewActivity} />
    <Route path="/updateActivity" component={UpdateActivity} />
    <Route path="/activityDetails" component={ActivityDetails} />
    <Route path="/planning" component={ActivitiesPlanning} />
    <Route path="/tchat" component={Tchat} />
    <Route path="/weather" component={Weather} />
    <Route path="/notifications" component={NotificationPage} />
  </main>
</Router>

<Footer />
