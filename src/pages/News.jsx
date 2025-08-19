import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import Section from "../components/Section";

export default function News() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    tmdb.get("/movie/upcoming").then(res => setUpcoming(res.data.results));
  }, []);

  return (
    <div>
      <Section title="Upcoming Movies" movies={upcoming} />
    </div>
  );
}
