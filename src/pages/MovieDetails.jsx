// src/pages/MovieDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const API_KEY = "43bd2d02efba908daa30f720f820ab34";

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      );
      const data = await res.json();
      setMovie(data);

      // Find trailer video
      const trailer = data.videos.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
    }

    async function fetchSimilar() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      );
      const data = await res.json();
      setSimilarMovies(data.results || []);
    }

    fetchMovie();
    fetchSimilar();
  }, [id]);

  if (!movie) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Poster + Details */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.release_date}</p>
          <p className="mt-4 text-gray-200">{movie.overview}</p>
          <p className="mt-2 text-sm text-gray-400">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>

          {/* Play Trailer button */}
          {trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              ▶ Play Trailer
            </button>
          )}
        </div>
      </div>

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarMovies.map((simMovie) => (
              <MovieCard key={simMovie.id} movie={simMovie} />
            ))}
          </div>
        </div>
      )}

      {/* Trailer Modal Overlay */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
