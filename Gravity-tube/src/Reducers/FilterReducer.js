export const filterReducer =(state,{type,payload})=>{
    switch (type) {
        case "SEARCH_VIDEOS":
            return {searchQuery : payload}
        case "FILTER_BY_CATEGORY":
            return {category: payload}
        case "CLEAR_FILTER":
            return {category: payload}
        default:
            state;
    }
}