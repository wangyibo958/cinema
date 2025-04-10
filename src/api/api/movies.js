import service from "../config";
export function movies(page = 1) {
    return service({
        url: `/movie_list/movie_info/?page=${page}`,
        method: "get",

    });
}

export function keyWordSearch(data) {
    return service({
        url: "/search/keyword_search/",
        method: "post",
        data
    })
}
//影片筛选
export function movies_choose(type) {
    return service({
        url: `/filter/mv_type_filter/?mv_type=${type}`,
        method: "get",

    });
}
export function details(id = "1") {
    return service({
        url: `/movie_list/movie_details/?movie_id=${id}`,//带单个传参写法  多个参数用&连接
        method: "get",
    });
}

//电影详情评论
export function comment(name) {
    return service({
        url: `/comment_list/comment_info/?mv_name=${name}`,
        method: "get",

    });
}