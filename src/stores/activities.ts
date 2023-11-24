import { writable, type Writable } from "svelte/store";
import type { ActivityMap } from "../model/ActivityMap";
import { createSessionStorage, persist } from "@macfja/svelte-persistent-store";

export let activityListStore: Writable<ActivityMap> = persist(writable({}), createSessionStorage(), "activities");