import service from "../config";
export function movies() {
    return service({
        url: "/movie_list/movie_info/",
        method: "get",
        
    });
}

//影片筛选
export function movies_choose() {
    return service({
        url: "/filter/mv_type_filter/",
        method: "get",
        
    });
}
export function details(id="1") {
    return service({
        url: `/movie_list/movie_details/?movie_id=${id}`,//带单个传参写法  多个参数用&连接
        method: "get",
        
    });
}

//电影详情评论
export function comment() {
    return service({
        url: "/comment_list/comment_info/",
        method: "get",
        
    });
}