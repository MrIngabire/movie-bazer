// src/components/MovieCard.jsx
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="flex flex-col items-start w-40 md:w-48 lg:w-56">
      {/* Poster */}
      <div className="group relative w-full aspect-[2/3]  overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay (on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="bg-white rounded-full p-4 shadow-md">
            <Play className="text-black" size={22} />
          </div>
        </div>
      </div>

      {/* Movie Details under the card */}
      <div className="mt-2">
        <h3 className="text-sm md:text-base font-semibold truncate w-full">
          {movie.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </Link>
  );
}
