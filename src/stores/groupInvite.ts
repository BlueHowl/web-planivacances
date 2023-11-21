import { writable, type Writable } from "svelte/store";
import type { GroupInvite } from "../model/GroupInvite";

export let groupInviteStore: Writable<Array<GroupInvite> | null> = writable(null);