import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../Reducers/FilterReducer";

const FilterContext = createContext();
const initailValue = {category : "All"};

const FilterProvider = ({children})=>{
    const [filterState, filterDispatch] = useReducer(filterReducer, initailValue)
    return(
        <FilterContext.Provider value={{filterState, filterDispatch}}>
        {children}
        </FilterContext.Provider>
    )
    
}

const useFilter =()=> useContext(FilterContext);
export { useFilter, FilterProvider}