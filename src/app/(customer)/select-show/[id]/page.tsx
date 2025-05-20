import { MovieBanner } from "@/app/(customer)/select-show/[id]/movie-banner";
import MovieShowtimeSelector from "@/app/(customer)/select-show/[id]/Selectshow";

export default function MoviePage({ params }: { params: { id: string } }) {
  const movie_id = parseInt(params.id);
  const movieData = 12; // Fetch movie data

  return (
    <>
      <MovieBanner movie_id={movie_id} className="rounded-b-lg shadow-lg" />
      <MovieShowtimeSelector movieId={movie_id} />
    </>
  );
}
