<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap";

  import { Link } from "svelte-navigator";
  import { useLocation } from "svelte-navigator";

  const location = useLocation();
  let isOpen = false;
  let isConnected = false;
  let profileConnected = "Maxime Cao";

  function handleUpdate(event: CustomEvent) {
    isOpen = event.detail.isOpen;
  }
</script>

<header class="planiVacancesHeader">
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">PlaniVacances</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem class="nav-item">
          <Link
            id="home"
            class={$location.pathname == "/"
              ? "nav-link bg-primary rounded text-white"
              : "nav-link"}
            to="/">Accueil</Link
          >
        </NavItem>
        <NavItem class="nav-item">
          <Link
            id="contact"
            class={$location.pathname == "/contact"
              ? "nav-link bg-primary rounded text-white"
              : "nav-link"}
            to="/contact">Contact</Link
          >
        </NavItem>
        {#if isConnected}
          <Dropdown nav inNavbar>
            <DropdownToggle nav caret>{profileConnected}</DropdownToggle>
            <DropdownMenu end>
              <Link
                id="profile"
                class={$location.pathname == "/profile"
                  ? "dropdown-item bg-primary text-white"
                  : "dropdown-item"}
                to="/profile">Mon profil</Link
              >
              <Link
                id="holidays"
                class={$location.pathname == "/holidays"
                  ? "dropdown-item bg-primary text-white"
                  : "dropdown-item"}
                to="/holidays">Mes vacances</Link
              >
              <Link
                id="notifications"
                class={$location.pathname == "/notifications"
                  ? "dropdown-item bg-primary text-white"
                  : "dropdown-item"}
                to="/notifications">Mes notifications</Link
              >
              <DropdownItem>Déconnexion</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        {:else}
          <NavItem class="nav-item">
            <Link
              class={$location.pathname == "/connection"
                ? "nav-link bg-primary rounded text-white"
                : "nav-link"}
              to="/connection">Connexion</Link
            >
          </NavItem>
        {/if}
      </Nav>
    </Collapse>
  </Navbar>
</header>
