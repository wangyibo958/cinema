import service from "../config";

export function getHot() {
    return service({
        url: "/hot_mv_recommend/",
        method: "get"
    })
}

export function getPerson(id) {
    return service({
        url: `/personal_recommend/?user_id=${id}`,
        method: "get"
    })
}