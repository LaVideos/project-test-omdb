import Link from "next/link";
import { Movie } from "@/interfaces";
import {useAppDispatch, useAppSelector} from "@/hooks";
import { moviesActions } from "@/redux";
import {useEffect, useState} from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import classes from "../../../styles/movieCard.module.scss";
import classNames from "classnames";

interface Props {
    movie: Movie;
    isFavorite?: boolean;
}

export default function MovieCard({ movie, isFavorite = false }: Props) {
    const dispatch = useAppDispatch();
    useAppSelector(state => state.movies)
    const [fav, setFav] = useState<boolean>(isFavorite);
    const { Title, Year, Poster, imdbID } = movie;
    const item = localStorage.getItem('favorites');
    useEffect(()=>{
        if (item){
            JSON.parse(item).forEach((item:Movie) => {
                if (item.imdbID === imdbID) {
                    setFav(true)
                    dispatch(moviesActions.addToFavorites(movie));
                }
            });
        }
    },[item])

    const toggleFavorite = () => {
        if (fav) {
            dispatch(moviesActions.removeFromFavorites(movie.imdbID));
        } else {
            dispatch(moviesActions.addToFavorites(movie));
        }
        setFav(!fav);
    };

    return (
        <div className={classes.posterWrap}>
            <div className={classes.badgeNew}>
                <IconButton size={"large"} className={classes.btn} aria-label="add to favorites" onClick={toggleFavorite}>
                    {fav ? (
                        <FavoriteIcon className={classNames(classes.favoriteButtonActive,classes.favoriteButton)} />
                    ) : (
                        <FavoriteBorderIcon className={classNames(classes.favoriteButtonUnactive,classes.favoriteButton)} />
                    )}
                </IconButton>
            </div>

            <Link className={classes.link} href={`/movie/${imdbID}`} passHref>
                <div className={classes.poster}>
                    {Poster ? (
                        <img src={`${Poster}`} alt={`${Title} poster`} />
                    ) : (
                        <img src="<https://phti.by/wp-content/themes/bb/acf-blocks/blocks/block-9/img/not-found.png>" alt="Poster not found" />
                    )}
                </div>
            </Link>
        </div>
    );
}
