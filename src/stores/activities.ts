import { writable, type Writable } from "svelte/store";
import type { Activity } from "../model/Activity";

export const activityListStore: Writable<Array<Activity>> = writable([]);