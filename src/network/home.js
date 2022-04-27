import { request } from './request';

export function getHomeMultiData() {
    // 函数request返回的是一个Promise对象
    return request({
        url: '/home/multidata'
    })
}

// 获取商品列表展示数据
//参数1：type为请求的的哪一个的数据(pop流行、new新款、sell精选)
// 参数2：请求的页码数是多少页
export function getHomeGoodsList(type,page) { 
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}