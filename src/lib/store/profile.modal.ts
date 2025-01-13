import {create} from "zustand";
import {BasicProfileForm} from "@/lib/types/basic-profile.type";
import axios from "axios";


type ProfileState = {
    profile: BasicProfileForm;
    setProfile: (profile: BasicProfileForm) => void;
    fetchProfile: (token: string) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
    profile: {},
    setProfile: (newProfile: BasicProfileForm) => {
        set({profile: newProfile});
    },
    fetchProfile: (token: string) => {
        // console.log(token);
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/profile`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({data}) => {
            console.log(data.data);
            set({profile: data.data});
        }).catch(() => {
        })
    }
}));

export default useProfileStore;
