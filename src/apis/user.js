import { request } from "@/utils";

export function loginAPI(formData) {
    return request({
        url: "/authorizations",
        method: "POST",
        data: formData
    })
}

export function registerAPI(formData) {
    return request({
        url: "/user/profile",
        method: "GET",
        data: formData
    })
}

