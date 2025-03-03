import {create} from "zustand";
import {BasicPortfolioForm, PortfolioForm} from "@/lib/types/portfolio.type";
import axios from "axios";


type PortfolioState = {
    isChooseNewPortfolio: boolean;
    setIsChooseNewPortfolio: (value: boolean) => void;
    createNewPortfolio: (token: string) => Promise<number>;
    basicPortfolios: BasicPortfolioForm[];
    fetchBasicPortfolios: (token: string) => void;
    currentPortfolio: PortfolioForm;
    fetchCurrentPortfolio: (token: string, portfolioId: number) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
    basicPortfolios: [],
    isChooseNewPortfolio: false,
    currentPortfolio: {
        id: 0,
        portfolioProminentProjects: [],
        portfolioCustomerFeedbacks: [],
        portfolioAboutSection: {
            id: undefined,
            avatar: undefined,
            overview: undefined,
            detail: undefined
        },
        portfolioWorkExperiences: [],
        portfolioSkills: []
    },
    setIsChooseNewPortfolio: (value) => {
        set({isChooseNewPortfolio: value})
    },
    fetchBasicPortfolios: async (token) => {
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/get-portfolios`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({data}) => {
            // console.log(data.data);
            set({basicPortfolios: data.data});
        }).catch(() => {
        })
    },

    createNewPortfolio: async (token) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/create-portfolio`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );
            return response.data.data.id || 0;
        } catch (error) {
            console.error("Error creating portfolio:", error);
            return 0;
        }
    },

    fetchCurrentPortfolio: async (token: string, portfolioId: number) => {
        try {
            axios.get(
                `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/get-portfolio-detail/${portfolioId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            ).then(({data}) => {
                set({currentPortfolio: data.data});
            }).catch(() => {

            })
        } catch (error) {
            console.error("Error creating portfolio:", error);
            return false;
        }
    }

}));

export default usePortfolioStore;
