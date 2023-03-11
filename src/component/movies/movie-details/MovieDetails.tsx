import React, { useEffect } from 'react';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { moviesActions } from '@/redux';
import classes from '../../../styles/MovieDetails.module.scss';
import ButtonComponent from "@/component/button/Button";
import {useRouter} from "next/router";

interface MovieDetailsProps {
    imdbID: string | number | undefined | string[];
}

export default function MovieDetails({ imdbID }: MovieDetailsProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { movieDetails } = useAppSelector((state) => state.movies);

    useEffect(() => {
        if (imdbID) {
            dispatch(moviesActions.getMovieDetailsAsync(imdbID as string));
        }
    }, [imdbID]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Poster } =
        movieDetails;

    return (
        <div className={classes.container}>
            <div>
                <ButtonComponent children={'Go to Home'} onclick={()=>router.push('/')}/>
            </div>
            <div className={classes.wrapLight}>
                <div className={classes.titlePoster}>

                    <div className={classes.dataContainer}><img src={Poster} alt={Title}/></div>

                </div>


                <div className={classes.data}>
                    <div>Title : {Title}</div>
                    <div>Plot : {Plot}</div>
                    <div>Rated : {Rated}</div>
                    <div>Country : {Country}</div>
                    <div>Released : {Released}</div>
                    <div>Language : {Language}</div>
                    <div>Actors : {Actors}</div>
                    <div>Year : {Year}</div>
                    <div>Genre : {Genre}</div>
                    <div>Writer : {Writer}</div>
                    <div>Director : {Director}</div>
                    <div>Runtime : {Runtime}</div>
                </div>
            </div>
        </div>
    )}
