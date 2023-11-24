import { writable, type Writable } from "svelte/store";
import { GCMEncryption, createEncryptionStorage, createLocalStorage, persist } from "@macfja/svelte-persistent-store"
import { STORE_ENCRYPTION_KEY } from "../utils/config";

const storage = createEncryptionStorage(createLocalStorage(), new GCMEncryption(STORE_ENCRYPTION_KEY))
export let customTokenStore: Writable<string> = persist(writable(""), storage, "customToken") as Writable<string>;