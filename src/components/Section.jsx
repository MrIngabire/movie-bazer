import MovieCard from "./MovieCard";

export default function Section({ title, movies }) {
  return (
    <section className="px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <a href="#" className="text-sm text-pink-400">See More</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </section>
  );
}
