import type { Group } from "../model/Group";
import type { GroupMap } from "../model/GroupMap";
import { groupListStore } from "../stores/group";
import { instance } from "./ApiClient";

export async function createGroup(group: Group): Promise<string|null> {
    try {
        const response = await instance.post<string>(`/group`, group);

        if(response.status == 200) {
            return response.data;
        }
        
    } catch (error) {
        console.error(error);
    }

    return null;
}

export async function loadUserGroups() {
    const groups: GroupMap = {};

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

