import { AuthProvider } from "./Auth-context";
import { FilterProvider } from "./Filter-context";
import { PlaylistProvider } from "./Playlist-context";
import { VideoProvider } from "./Videos-context";
const StateProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <FilterProvider>
      <VideoProvider>{children}</VideoProvider>
      </FilterProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
};

export { StateProvider };
