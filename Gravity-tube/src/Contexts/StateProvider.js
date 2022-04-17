import { AuthProvider } from "./Auth-context";
import { VideoProvider } from "./Videos-context";
const StateProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>{children}</VideoProvider>
    </AuthProvider>
  );
};

export { StateProvider };
