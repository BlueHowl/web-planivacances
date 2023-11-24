import { writable, type Writable } from 'svelte/store';
import type { GroupMap } from '../model/GroupMap';

export let groupListStore: Writable<GroupMap> = writable({});
