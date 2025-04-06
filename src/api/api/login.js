import service from "../config";

export function login(data){
    return service({
        url:"/user/login/",//http://121.40.144.56/api/user/login,http://locahost:8080/api/user/login
        method:"post",
        data
    })
}

export function register(data){
    return service({
        url:"/user/register/",
        method:"post",
        data
    })
}

export function personal(){
    return service({
        url:"/user/user_info/",
        method:"get"
    })
}