import service from "../config";
export function login(data) {
    return service({
        url: "/user/login/",
        method: "post",
        data
    });
}

export function register(data) {
    return service({
        url: "/user/register/",
        method: "post",
        data
    });
}

export function personal() {
    return service({
        url: "/user/user_info/",
        method: "get",
        
    });
}
export function order() {
    return service({
        url: "/order/user_orders/",
        method: "get",
        
    });
}
export function change(data) {
    return service({
        url: "/update_user/update_user_info/",
        method: "put",
        data
    });
}


export function refresh(data){
    return service({
        url:"/token/refresh/",
        method:"post",
        data
    })
}