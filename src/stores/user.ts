import { writable, type Writable } from 'svelte/store';
import type { User } from '../model/User';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';

export let userStore: Writable<User | null> = persist(writable(null), createSessionStorage(), "user")