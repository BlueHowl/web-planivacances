import { type Writable } from "svelte/store";
import { GCMEncryption, createEncryptionStorage, createSessionStorage, persist, writable } from "@macfja/svelte-persistent-store"
import { STORE_ENCRYPTION_KEY } from "../utils/config";

const storage = createEncryptionStorage(createSessionStorage(), new GCMEncryption(STORE_ENCRYPTION_KEY))
export let registrationTokenStore: Writable<string> = persist(writable(""), storage, "fcmRegistrationToken") as Writable<string>;