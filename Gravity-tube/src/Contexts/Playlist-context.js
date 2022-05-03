import { createContext, useContext, useReducer } from "react";
import playlistReducer from "../Reducers/PlaylistReducer";

const playlistContext = createContext();

const PlaylistProvider = ({children})=>{
    const [playlistState, playlistDispatch] = useReducer(playlistReducer,{
        playlists:[],
    })
    
    return(
        <playlistContext.Provider value={{playlistState, playlistDispatch}}>
            {children}
        </playlistContext.Provider>
    );
}

const usePlaylist = () => useContext(playlistContext); 
export {usePlaylist, PlaylistProvider}