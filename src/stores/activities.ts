import { writable, type Writable } from "svelte/store";
import type { ActivityMap } from "../model/ActivityMap";

export let activityListStore: Writable<ActivityMap> = writable({});