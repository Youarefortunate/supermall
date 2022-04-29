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

// tabControl下面的商品列表展示
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}