module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // 在默认的webpack配置别名的文件已经对src这个文件夹做过了配置 '@': 'src'
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                // 一般情况下router是不需要配置路径别名的,原因是router文件一般只会在main.js下面引用
                // 'router': '@/router',
                // 'store': '@/store',
                'views': '@/views',
            }
        }
    }
}