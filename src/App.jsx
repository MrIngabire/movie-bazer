import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import Explore from "./pages/Explore";
import News from "./pages/News";
import TVShows from "./pages/TVShows";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/news" element={<News />} />
        <Route path="/tv" element={<TVShows />} />
      </Routes>
    </div>
  );
}
