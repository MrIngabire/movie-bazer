import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import Section from "../components/Section";

export default function Explore() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    tmdb.get("/discover/movie").then(res => setMovies(res.data.results));
  }, []);

  return (
    <div>
      <Section title="Explore" movies={movies} />
    </div>
  );
}
