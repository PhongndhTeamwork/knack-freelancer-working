import {create} from "zustand";
import {BasicProfileForm} from "@/lib/types/basic-profile.type";
import axios from "axios";


type ProfileState = {
    profile: BasicProfileForm;
    setProfile: (profile: BasicProfileForm) => void;
    fetchProfile: (token: string) => void;
    updateProfile:  (token: string) => Promise<boolean>;
    setProfileUpdate: (updateFn: (profileInfo: BasicProfileForm) => BasicProfileForm) => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
    profile: {
        profileWorkExperiences: [

        ],
        profileAchievements: [],
        profileProminentWorks: []
    },
    setProfile: (newProfile: BasicProfileForm) => {
        set({profile: newProfile});
    },
    setProfileUpdate: (updateFn: (profileInfo: BasicProfileForm) => BasicProfileForm) => {
        set((state) => {
            return {
                profile: updateFn(state.profile)
            };
        });
    },

     updateProfile: async (token: string) => {
        const form = new FormData();
        for (const [key, value] of Object.entries(get().profile)) {
            if (Array.isArray(value)) {

            } else if (value instanceof File) {
                form.append(key, value);
            } else if (value === null) {
                form.append(key, "");
            } else if (value !== undefined) {
                form.append(key, String(value));
            }
        }

        // for (const [key, value] of form.entries()){
        //     console.log(`${key}: ${value}`);
        // }

        // axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-profile`, form, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         Authorization: "Bearer " + token
        //     }
        // }).then(({data}) => {
        //     set({profile: data.data});
        //     return true;
        // }).catch(() => {
        //     // console.error(error);
        //     return false;
        // })
        // return false;

         try {
              await axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-profile`, form, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${token}`,
                 }
             });

             // Successfully updated profile
             // set({ profile: data.data });
             return true;  // Return true when the request is successful
         } catch (error) {
             // Handle error
             // console.error(error);
             return false;  // Return false when there's an error
         }

    },

    fetchProfile: (token: string) => {
        // console.log(token);
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/profile`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({data}) => {
            // console.log(data.data);
            set({profile: data.data});
        }).catch(() => {
        })
    }
}));

export default useProfileStore;
