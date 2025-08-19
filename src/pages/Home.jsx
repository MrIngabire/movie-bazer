import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

// Constants for the TMDB API
const API_KEY = "43bd2d02efba908daa30f720f820ab34";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [featured, setFeatured] = useState(null);

  // Fetch data from the TMDB API on component mount
  useEffect(() => {
    // Fetch trending movies
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.results.slice(0, 10));
        setFeatured(data.results[0]); // main hero card
      })
      .catch((error) => console.error("Error fetching trending movies:", error));

    // Fetch popular movies for recommendations
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setRecommended(data.results.slice(0, 10)))
      .catch((error) => console.error("Error fetching popular movies:", error));
  }, []);

  return (
    <div className="px-12 py-10 text-white bg-black min-h-screen">
      {/* Hero Section */}
      {featured && (
        <section className="relative min-h-[600px] flex items-center bg-gradient-to-b from-black via-[#0b0b0f] to-black px-6 md:px-12">
          {/* Left Text */}
          <div className="flex-1">
            <h2 className="text-5xl font-extrabold leading-tight">
              FIND MOVIES <br />
              <span className="text-pink-400">TV SHOWS AND MORE</span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-lg">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galleyof type and scrambledit
              to make a type specimen book.
            </p>
            <Link to={`/movie/${featured.id}`}>
              <button className="mt-8 bg-black px-6 py-3 rounded-xl flex items-center gap-3 text-lg font-medium hover:bg-gray-700">
                <Play size={18} /> Watch Tutorial
              </button>
            </Link>
          </div>

          {/* Right Posters */}
          <div className="flex-1 relative flex justify-center items-center">
            {/* Back card (2nd trending movie) */}
            {trending[1] && (
              <img
                src={`${IMG_URL}${trending[1].poster_path}`}
                alt={trending[1].title}
                className=" absolute top-1 right-10 w-60 md:w-80 rounded-2xl shadow-lg transform  opacity-90 "
              />
            )}

            {/* Front card (featured) */}
            <div className="relative z-10">
              <Link to={`/movie/${featured.id}`}>
                <img
                  src={`${IMG_URL}${featured.poster_path}`}
                  alt={featured.title}
                  className="w-72 md:w-96 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300 transform translate-y-15"
                />
                {/* Play Button Overlay */}
                <button className="absolute inset-0 flex items-center justify-center" >
                  <div className="bg-white rounded-full p-5 shadow-md hover:scale-110 transition">
                    <Play className="text-black" size={28} />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      <MovieRow title="🔥 Trending" movies={trending} />

      {/* Recommended */}
      <MovieRow title="⭐ You May Like This" movies={recommended} />
    </div>
  );
}

function MovieRow({ title, movies }) {
  return (
    <section className="py-12">
      <div className="flex items-center gap-4 mb-6">
        {/* Left Title */}
        <h3 className="text-2xl font-bold flex items-center whitespace-nowrap">
          {title}
        </h3>

        {/* Divider Line */}
        <div className="flex-grow h-px bg-gray-800"></div>

        {/* Right Link */}
        <button className="text-sm text-gray-400 hover:text-white whitespace-nowrap">
          See More
        </button>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-gray-150 overflow-hidden hover:scale-105 transition shadow-lg rounded-lg"
          >
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h4 className="text-sm font-semibold truncate">{movie.title}</h4>
              <p className="text-xs text-gray-400">
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

