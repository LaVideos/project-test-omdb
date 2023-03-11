import { useRouter } from 'next/router';
import {MovieDetails} from "@/component";

export default function MoviePage() {
    const router = useRouter();
    const imdbID = router.query?.imdbID;
    return <MovieDetails imdbID={imdbID} />;
}
