import { type Writable } from "svelte/store";
import { createLocalStorage, persist, writable } from "@macfja/svelte-persistent-store"

export let customTokenStore: Writable<string> = persist(writable(""), createLocalStorage(), "customToken");