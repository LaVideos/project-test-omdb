import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {moviesActions} from '@/redux';
import {Button, IconButton, TextField} from '@material-ui/core';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../../styles/SearchForm.module.scss';
import FavoriteIcon from "@material-ui/icons/Favorite";

interface FormValues {
    query: string;
}

export default function SearchForm() {
    const {register, handleSubmit} = useForm<FormValues>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { favorites } = useAppSelector((state) => state.movies);

    const handleFavoritesClick = () => {
        router.push('/favorites');
    };

    useEffect(() => {}, [favorites]);

    const onSubmit = (data: FormValues) => {
        dispatch(moviesActions.searchMoviesAsync({searchQuery: data.query, page: 1}));
    };

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.btn}><Button variant={"contained"} color="inherit" onClick={handleFavoritesClick}>
                    <FavoriteIcon/>
                    {`Favorites (${favorites.length})`}
                </Button></div>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.searchBox}>
                    <TextField
                        className={styles.searchInput}
                        variant="standard"
                        {...register('query', {})}
                        placeholder="Search for movies"
                    />
                    <IconButton type="submit">
                        <SearchIcon/>
                    </IconButton>
                </form>
            </div>
        </div>

    );
}
