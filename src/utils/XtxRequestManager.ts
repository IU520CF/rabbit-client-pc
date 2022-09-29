import { useUserStore } from "@/stores/userStore";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { AxiosError } from "axios";
import router from "../router";

interface XtxAxiosInstance extends AxiosInstance {
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}

// 用于管理小兔鲜
export default class XtxRequestManager {
  // 既然要实现单例模式，当前类的实例就不能被外部创建
  // 存储单例对象
  private static _singletonInstance: XtxRequestManager;
  // 用于保存 axios 实例对象
  private readonly _intance: XtxAxiosInstance;
  // 用于保存 useStore 实例
  private _useStore = useUserStore();
  // 接口请求地址
  public static baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net/";
  //将构造函数设置为私有 防止外部直接实例化当前类来创建实例
  private constructor() {
    // 创建新的 axios 实例 专门用于和小兔鲜儿服务器端进行请求交互
    this._intance = axios.create({ baseURL: XtxRequestManager.baseURL });
    // 注册请求拦截器（在请求头中加入token）
    this._intance.interceptors.request.use(
      this._addTokenToRequestHeader.bind(this)
    );

    // 注册响应拦截器
    this._intance.interceptors.response.use(
      // 响应的成功态，剥离响应对象
      this._peelOffAxiosResponse,
      // 响应的失败态，处理未授权的情况
      this._unauthorized.bind(this)
    );
  }
  // 用于获取单例对象的方法
  static get instance() {
    // 判断单例对象是否存在
    if (typeof XtxRequestManager._singletonInstance === "undefined") {
      // 如果不存在 创建该对象
      XtxRequestManager._singletonInstance = new XtxRequestManager();
    }
    // 返回单例对象
    return XtxRequestManager._singletonInstance;
  }

  private _addTokenToRequestHeader(config: AxiosRequestConfig) {
    // 我们期望该方法中的 this 关键字指向当前类的实例
    const token = this._useStore.profile.token;
    // 如果token 存在 将token加入到请求头中
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  }
  // 剥离响应对象 直接为调用者返回服务端的数据
  private _peelOffAxiosResponse(response: AxiosResponse) {
    return response.data;
  }

  // 统一的错误处理(未授权)
  private _unauthorized(error: unknown) {
    // 检测 error 参数是否为 axios 封装的 error 对象
    if (error instanceof AxiosError) {
      // 401 表示未授权 Unauthorized
      if (error.response?.status === 401) {
        // 清空本地用户信息
        this._useStore.$reset();
        // 跳转到登录页面
        router.replace("/login");
      }
    } else {
      throw Error;
    }
  }

  // 添加一个用于外部发送请求的方法
  public request<T, D>(config: AxiosRequestConfig<D>): Promise<T> {
    // 由于我们调用的是 axios 实例下的 request 方法，这个方法他的参数被要求是 AxiosRequestConfig
    return this._intance.request<T, D>(config);
  }
}
