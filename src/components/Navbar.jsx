import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/genre", label: "Genre" },
    { to: "/news", label: "News" },
    { to: "/tv", label: "TV Shows" },
  ];

  return (
    <header className="flex items-center justify-between px-12 py-6 bg-black sticky top-0 z-50 border-b border-gray-800">
      <h1 className="text-3xl font-extrabold tracking-wide">
        <img src="/movieLogo.png" />
      </h1>
      <nav className="flex space-x-10 text-lg">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`transition ${
              location.pathname === link.to
                ? "text-white font-semibold"
                : "text-gray-400"
            } hover:text-white`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
