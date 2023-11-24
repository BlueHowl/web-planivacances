import { writable, type Writable } from "svelte/store";
import type { GroupInvite } from "../model/GroupInvite";
import { createSessionStorage, persist } from "@macfja/svelte-persistent-store";

export let groupInviteStore: Writable<Array<GroupInvite> | null> = persist(writable(null), createSessionStorage(), "groupInvites");