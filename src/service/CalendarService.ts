import { instance } from "./ApiClient";
import { downloadICSFile } from "../utils/CalendarDownloader";

let gid : string = "fake";

export async function exportCalendar() {
    const response = await instance.get<string>(`/activities/calendar/${gid}`);

    const calendar: string = response.data;

        if (calendar != null) {
            downloadICSFile(calendar, "Calendrier Planivacances");
        } else {
            console.error("Erreur lors de la récupération du calendrier");
        }
}