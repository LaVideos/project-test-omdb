import {axiosService} from "@/services/axios";
import { SearchResults } from '@/interfaces';
import {API_KEY} from "@/constants";

export const omdbService = {

    searchMovies: async (
        searchQuery: string,
        page: number,
    ): Promise<SearchResults> => {
        const response = await axiosService.get('', {
            params: {
                apikey:API_KEY,
                s: searchQuery,
                type: 'movie',
                page,
            },
        });
        return response.data;
    },

    getMovieDetails : async (id: string|number) => {
        const response = await axiosService.get('', {
            params: {
                apikey:API_KEY,
                i: id,
                plot: 'full',
            },
        });
        return response.data;
    },
}
