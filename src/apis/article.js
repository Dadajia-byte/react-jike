// 获取文章列表
import { request } from '@/utils'
export function getArticleApi(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// 删除文章
export function delArticleApi(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

// 获取文章详情
export function getArticleByIdApi(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}