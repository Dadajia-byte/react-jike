// 获取文章列表
import { request } from '@/utils'
export function getArticleApi(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}