import { writable, type Writable } from "svelte/store";
import type { CountryUserMap } from "../model/CountryUserMap";
import { createSessionStorage, persist } from "@macfja/svelte-persistent-store";

export let userPerCountryStore: Writable<CountryUserMap | null> = persist(writable(null), createSessionStorage(), "userPerCountry")