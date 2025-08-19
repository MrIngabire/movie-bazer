import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import Section from "../components/Section";

export default function TVShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    tmdb.get("/tv/popular").then(res => setShows(res.data.results));
  }, []);

  return (
    <div>
      <Section title="Popular TV Shows" movies={shows} />
    </div>
  );
}
