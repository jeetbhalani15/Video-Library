import { AuthProvider } from "./Auth-context";
const StateProvider = ({children})=>{
    return(
        
        <AuthProvider>
            
            {children}
           
        </AuthProvider>
        
    );
}

export {StateProvider};