import { writable, type Writable } from "svelte/store";

export let currentGidStore: Writable<string> = writable("null");