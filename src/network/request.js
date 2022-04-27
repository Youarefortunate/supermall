import axios from "axios";

// 不要使用export default,因为export default只会导出一个,但是网络请求的实例可以有多个
// 第四种使用方式
export function request(option) {
    const instance1 = axios.create({
        baseURL:"http://152.136.185.210:7878/api/hy66",
        timeout:5000,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        }
    })
    // axios的拦截器,拦截的是axios实例对象,当然也可以拦截全局的axios
    // 每次拦截之后都需要把数据return出去,否则外面不能获取到数据
    // 网络请求前拦截,服务器还没有响应,也就是说参数config里面没有服务器返回的数据
    instance1.interceptors.request.use(config => { // 拦截请求
        // console.log(config);
        return config;
    },err => {
        console.log(err);
    });

    // 服务器已经响应,拿到的是结果(服务器返回的结果),里面携带有服务器返回的数据
    instance1.interceptors.response.use(response =>  { // 拦截响应
        // console.log(response);
        return response.data;
    },err => {
        console.log(err);
    });
    // 因为axios本身就返回一个Promise对象,所以这里可以直接return axios的实例对象
    return instance1(option);
}


