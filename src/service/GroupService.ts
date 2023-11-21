import type { Group } from "../model/Group";
import type { GroupInvite } from "../model/GroupInvite";
import type { GroupMap } from "../model/GroupMap";
import type { User } from "../model/User";
import { groupListStore } from "../stores/group";
import { groupInviteStore } from "../stores/groupInvite";
import { userStore } from "../stores/user";
import { instance } from "./ApiClient";

let user: User|null;

userStore.subscribe(value => {
    user = value;
});

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

export async function loadUserGroupInvites() {

    try {
        const response = await instance.get<string>(`/group/invitation`);

        if(response.status == 200) {

            groupInviteStore.set(response.data as unknown as Array<GroupInvite>);
            
            console.log("Invitations aux groupes chargées");
            
        }
    } catch (error) {
        console.error(error);
    }

}

export async function sendGroupInvite(gid: string, mail: string) {
    if(user != null && mail == user.email) {
        console.log("Impossible de s'inviter soit même");
        return;
    }

    try {
        const response = await instance.post<string>(`/group/invitation/${gid}/${mail}`);

        if(response.status == 200 && response.data) {     
            console.log("Invitation envoyée");
        }
    } catch (error) {
        console.error(error);
    }

}

export async function acceptGroupInvite(gid: string) {
    try {
        const response = await instance.post<boolean>(`/group/invitation/${gid}`);

        if(response.status == 200 && response.data) {
            loadUserGroupInvites()

            console.log("Invitation acceptée");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function declineGroupInvite(gid: string) {
    try {
        const response = await instance.delete<string>(`/group/invitation/${gid}`);

        if(response.status == 200 && response.data) {  
            loadUserGroupInvites()

            console.log("Invitation supprimée");
        }
    } catch (error) {
        console.error(error);
    }
}