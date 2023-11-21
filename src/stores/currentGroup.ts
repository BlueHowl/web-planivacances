import { writable, type Writable } from "svelte/store";

export let currentGroupId: Writable<string> = writable("null");