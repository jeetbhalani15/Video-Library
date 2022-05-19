import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "../Reducers/FilterReducer";

const FilterContext = createContext();
const initailValue = {category : "All", searchQuery:""};

const FilterProvider = ({children})=>{
    const [filterState, filterDispatch] = useReducer(filterReducer, initailValue)
    const [search, setSearch] = useState("");
    return(
        <FilterContext.Provider value={{filterState, filterDispatch, search, setSearch}}>
        {children}
        </FilterContext.Provider>
    )
    
}

const useFilter =()=> useContext(FilterContext);
export { useFilter, FilterProvider}