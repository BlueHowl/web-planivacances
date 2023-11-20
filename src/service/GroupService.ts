import type { Group } from "../model/Group";
import type { GroupMap } from "../model/GroupMap";
import { groupListStore } from "../stores/group";
import { instance } from "./ApiClient";

const groups: GroupMap = {};

/*export async function getGroups(): Promise<Array<Group>> {
    if(Object.keys(groups).length == 0) {
        loadUserGroups();
    }

    return Object.values(groups);
}*/

export async function loadUserGroups() {
    try {
        const response = await instance.get<string>(`/group/list`);

        if(response.status == 200) {
            const groupList = response.data as unknown as Array<Group>;

            groupList.forEach(group => {
                groups[group.gid] = group;
            });

            groupListStore.set(groups);
            
            console.log("Groupes chargés");
            
        }
    } catch (error) {
        console.error(error);
    }

}

