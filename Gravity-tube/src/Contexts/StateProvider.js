import { AuthProvider } from "./Auth-context";
import { PlaylistProvider } from "./Playlist-context";
import { VideoProvider } from "./Videos-context";
const StateProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PlaylistProvider>
      <VideoProvider>{children}</VideoProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
};

export { StateProvider };
