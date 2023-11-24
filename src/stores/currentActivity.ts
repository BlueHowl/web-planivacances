import { writable, type Writable } from "svelte/store";

export let currentAidStore: Writable<string> = writable("null");