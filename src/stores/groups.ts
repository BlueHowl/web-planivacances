import { writable, type Writable } from 'svelte/store';
import type { GroupMap } from '../model/GroupMap';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';

export let groupListStore: Writable<GroupMap> = persist(writable({}), createSessionStorage(), "groups")
