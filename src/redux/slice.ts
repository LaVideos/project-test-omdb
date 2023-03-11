import { createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {Movie, MovieDetailsInterface} from '@/interfaces';
import { omdbService } from '@/services';

interface SearchResultInterface  {
    Search?: Movie[];
    totalResults?: string;
    Response?: string;
    Error?: string;
}

interface MoviesState {
    searchResults:SearchResultInterface;
    movieDetails: MovieDetailsInterface | undefined;
    loading: boolean;
    error: string | undefined;
    currentPage: number;
    totalPages: number;
    q: string;
    favorites: Movie[];
    favoritesArr: Movie[];
}

const initialState: MoviesState = {
    searchResults: {},
    movieDetails: undefined,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 1,
    q: '',
    favorites: [],
    favoritesArr:[]
};

const searchMoviesAsync = createAsyncThunk(
    'movies/searchMovies',
    async ({ searchQuery, page }: { searchQuery: string; page: number },{rejectWithValue}) => {
       try{
           const data = await omdbService.searchMovies(searchQuery, page);
           return { searchResults: data, page,searchQuery };
       }catch (e){
           console.log(rejectWithValue)
       }
    }
);

const getMovieDetailsAsync = createAsyncThunk('movies/getMovieDetails', async (id: string|number) => {
    const data = await omdbService.getMovieDetails(id);
    if (data.Error) {
        throw new Error(data.Error);
    }
    return data;
});



export const moviesSlice =createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const isMovieInFavorites = state.favorites.some((favorite) => favorite.imdbID === action.payload.imdbID);
            if (!isMovieInFavorites) {
                state.favorites.push(action.payload)
                localStorage.setItem('favorites',JSON.stringify(state.favorites))

            }
        },
        removeFromFavorites: (state, action) => {
            const id = action.payload;
            const index = state.favorites.findIndex(movie => movie.imdbID === id);
            let item = localStorage.getItem('favorites');
            if (item){
                const parse = JSON.parse(item);
                const p = parse.map((value:Movie)=>{
                    if (value.imdbID !== id) {
                        return value;
                    }
                }).filter(Boolean);
                localStorage.setItem('favorites', JSON.stringify(p))
                state.favorites.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(searchMoviesAsync.fulfilled, (state, action:any) => {
                state.loading = false;
                state.searchResults = action.payload.searchResults;
                state.currentPage = action.payload.page;
                state.totalPages = action.payload?.searchResults.totalResults ? Math.ceil(+action.payload.searchResults.totalResults / 10) : 1;
                state.q = action.meta.arg.searchQuery;
            })
            .addCase(searchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getMovieDetailsAsync.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getMovieDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movieDetails = action.payload;
            })
            .addCase(getMovieDetailsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.movieDetails = undefined;
            });
    },
});


const { reducer: moviesReducer, actions:{addToFavorites,removeFromFavorites} } = moviesSlice;

const moviesActions = {
    searchMoviesAsync,
    getMovieDetailsAsync,
    addToFavorites,removeFromFavorites
};

export { moviesActions, moviesReducer };
