import {MoviesList, SearchForm} from "@/component";
import styles from "../../styles/SearchPage.module.scss"

export default function Search() {
    return (
        <>
            <main>
                <div className={styles.searchForm}><SearchForm/></div>
                <div className={styles.movieList}><MoviesList/></div>
            </main>
        </>
    );
}
