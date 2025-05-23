import GameList from "@/components/GameList";
import SideBar from "@/components/SideBar";
import {
  fetchGames,
  fetchGamesByGenre,
  fetchGenreDetails,
} from "@/lib/actions";

const GameDisplay = async ({
  searchQuery,
  genreQuery,
}: {
  searchQuery?: string;
  genreQuery?: string;
}) => {
  const data = searchQuery
    ? await fetchGames({ searchQuery })
    : genreQuery
    ? await fetchGamesByGenre({ genreQuery })
    : await fetchGames({});

  const genre = genreQuery ? await fetchGenreDetails({ genreQuery }) : null;

  const getTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (genreQuery && genre) return `${genre.name} Games`;
    return "Popular Games";
  };

  const games = data.results;

  return (
    <section className="section_container" style={{ paddingTop: 0 }}>
      <p className="text-30-semibold">{getTitle()}</p>
      <div className="flex flex-row gap-4 mt-4">
        <SideBar />
        <div className="flex-1 w-full space-y-8">
          <GameList games={games} />
        </div>
      </div>
    </section>
  );
};

export default GameDisplay;
