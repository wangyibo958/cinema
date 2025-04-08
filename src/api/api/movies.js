import service from "../config";
export function movies() {
    return service({
        url: "/movie_list/movie_info/",
        method: "get",
        
    });
}
export function movies_choose() {
    return service({
        url: "/filter/mv_type_filter/",
        method: "get",
        
    });
}