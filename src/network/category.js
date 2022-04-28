import { request } from './request';

// 请求分类页面左侧菜单数据
export function getLeftMenuData() {
    return request({
        url: '/category'
    })
}

// 请求每个分类对应商品的展示页面
export function getCategoryContent(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}