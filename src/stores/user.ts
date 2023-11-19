import { writable, type Writable } from 'svelte/store';
import type { User } from '../model/User';

export let userStore: Writable<User | null> = writable(null);
