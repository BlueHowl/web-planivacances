import type { Place } from "./Place";

export type Group = {
    gid: number;
    groupName: string;
    description: string;
    startDate: string;
    endDate: string;
    place: Place;
    owner: string;
};