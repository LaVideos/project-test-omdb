import React, { useEffect } from 'react';
import Head from 'next/head';
import classes from '../../../styles/Favorites.module.scss';
import { Grid } from '@material-ui/core';
import { useAppSelector } from '@/hooks';
import { MovieCard } from '@/component';
import styles from "@/styles/MovieList.module.scss";
import {Pagination} from "@material-ui/lab";
import {useRouter} from "next/router";
import ButtonComponent from "@/component/button/Button";
import {Typography} from "@mui/material";



export default function Favorites() {
    const { favorites } = useAppSelector((state) => state.movies);
    const router = useRouter();


    useEffect(() => {}, [favorites]);

    return (
        <>
            <Head>
                <title>Movie Search App - Favorites</title>
                <meta name="description" content="Favorites movies" />
            </Head>
            <div className={styles.containerFavorite}>
                <ButtonComponent children={'Go to Home'} onclick={()=>router.push('/')}/>
                <div className={styles.pages}>
                    Favorite Page
                </div>
                <main className={styles.mainarr} >

                    <Grid className={styles.arr} container spacing={2}>
                        {favorites&&favorites.map((movie) => (
                            <Grid className={styles.center} item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
        </>
    );
}
