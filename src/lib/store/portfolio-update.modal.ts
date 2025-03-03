import {create} from "zustand";


type PortfolioUpdateState = {
    isInUpdateMode: boolean;
    setIsInUpdateMode: (value: boolean) => void;
}

const usePortfolioUpdateStore = create<PortfolioUpdateState>((set) => ({
    isInUpdateMode: false,

    setIsInUpdateMode: (value: boolean) => {
        set({isInUpdateMode: value});
    },
}));

export default usePortfolioUpdateStore;
