import type { Place } from "./Place";

export type Group = {
    gid: string;
    groupName: string;
    description: string;
    startDate: string;
    endDate: string;
    place: Place|null;
    owner: string;
};