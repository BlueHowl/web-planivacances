import { writable, type Writable } from "svelte/store";
import type { CountryUserMap } from "../model/CountryUserMap";
import { createEncryptionStorage, createSessionStorage, GCMEncryption, persist } from "@macfja/svelte-persistent-store";
import { STORE_ENCRYPTION_KEY } from "../utils/config";

const storage = createEncryptionStorage(createSessionStorage(), new GCMEncryption(STORE_ENCRYPTION_KEY))
export let userPerCountryStore: Writable<CountryUserMap | null> = persist(writable(null), storage, "userPerCountry") as Writable<CountryUserMap | null>