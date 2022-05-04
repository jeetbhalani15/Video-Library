export const filterReducer =(state,{type,payload})=>{
    switch (type) {
        case "FILTER_BY_CATEGORY":
            return {category: payload}
        default:
            state;
    }
}