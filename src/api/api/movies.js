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
export function details(id=1) {
    return service({
        url: `/movie_list/movie_details/?movie_id=${id}`,//带单个传参写法
        method: "get",
        
    });
}
export function comment() {
    return service({
        url: "/comment_list/comment_info/",
        method: "get",
        
    });
}