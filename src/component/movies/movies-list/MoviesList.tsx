import React, {useEffect, useState} from 'react';
import {Pagination} from '@material-ui/lab';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {moviesActions} from '@/redux';
import {MovieCard} from '@/component';
import {Grid} from '@material-ui/core';
import styles from '../../../styles/MovieList.module.scss';

export default function MoviesList() {
    const dispatch = useAppDispatch();
    const {searchResults, loading, error, currentPage, totalPages, q, favorites} = useAppSelector(
        (state) => state.movies
    );

    const [page, setPage] = useState(currentPage);
    const [favoritesIds, setFavoritesIds] = useState<string[]>([]);

    useEffect(() => {
        dispatch(moviesActions.searchMoviesAsync({searchQuery: q, page}));
    }, [page]);

    useEffect(() => {
        setFavoritesIds(favorites.map((favorite) => favorite.imdbID));
    }, [favorites]);


    useEffect(()=>{},[searchResults])


    if (searchResults.Error!=='Incorrect IMDb ID.'&&searchResults.Response==='False') {
        return <div className={styles.container}><div className={styles.error}>{searchResults.Error}</div></div>;
    }


    if (loading) {
        return <div className={styles.container}><div className={styles.loading}>Loading...</div></div>;
    }

    return (
        <div className={styles.container}>
            {
                searchResults.Error==='Incorrect IMDb ID.'
                    ?

                    <div className={styles.noAnyData}>
                        Enter Something
                    </div>

                    :

                    <><Grid className={styles.arr} container spacing={2}>
                        {searchResults.Search &&
                            searchResults.Search.map((movie) => (
                                <Grid className={styles.center} item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                                    <MovieCard movie={movie} isFavorite={favoritesIds.includes(movie.imdbID)}/>
                                </Grid>
                            ))}
                    </Grid>
                        <div  className={styles.pagination}>
                            <Pagination variant={"outlined"} color={"standard"} count={totalPages} page={page} onChange={(_, value: number) => setPage(value)} />
                        </div>
                    </>

            }
        </div>
    );
}
