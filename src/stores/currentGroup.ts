import { type Writable } from "svelte/store";
import { createSessionStorage, persist, writable } from "@macfja/svelte-persistent-store"

export let currentGidStore: Writable<string> = persist(writable(""), createSessionStorage(), "currentGid");