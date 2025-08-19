import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import Section from "../components/Section";

export default function Genre() {
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    tmdb.get("/discover/movie", { params: { with_genres: 28 } }) // 28 = Action
        .then(res => setActionMovies(res.data.results));
  }, []);

  return (
    <div>
      <Section title="Action Movies" movies={actionMovies} />
    </div>
  );
}
