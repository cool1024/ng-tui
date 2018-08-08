export const HttpConfig = {

    // 服务器接口地址
    SERVER_URL: '',

    WEBSOCKET_URL: '',

    // 请求超时时间
    TIME_OUT: 10000,

    // 错误提示时间
    TOAST_ERROR_TIME: 3000,

    // WEBSOCKET重新连接时间
    RECONNECT_TIME: 2000,

    // 响应错误提示消息
    HTTP_ERRORS: {
        API_DATA_ERROR: '服务器数据错误，无法解析的数据格式~',
        SERVER_ERROR: '服务器处理异常，无法获取正常的服务器响应',
        NOTFOUND_ERROR: '哎呀，请求地址不存在',
        TOKEN_ERROR: '您的登入已经过期，请重新登入',
        AUTH_ERROR: '您没有权限访问这些数据',
        TIMEOUT_ERROR: '服务器很久没有响应了',
        RESPONSE_CONTENT_ERROR: '接收到一个错误的响应',
        CHECK_ERROR: '未授权的令牌~',
        OTHER_ERROR: '其他错误，异常的请求',
    },

    // 显示通知消息状态码
    INFO_CODES: [401],

    // 显示警告消息状态码
    WARNING_CODES: [403, 404, 422],

    // 不属于通知也不属于警告的状态码都将划分到危险消息中
    // DANGER_CODE：[],

    // 权限头部参数配置
    AUTH_HEADER_PARAMS: ['ng-params-one', 'ng-params-two', 'ng-params-three'],

    // 平台参数配置
    PLATFORM_NAMWE: 'managerapi',

    // 401跳转页面
    TOKEN_ERROR_URL: '/dashboard/login',

    // 403跳转页面
    AUTH_ERROR_URL: '/dashboard/error',
};

export const INTERCEPTOR_MESSAGES = {
    500: HttpConfig.HTTP_ERRORS.SERVER_ERROR,
    401: HttpConfig.HTTP_ERRORS.TOKEN_ERROR,
    403: HttpConfig.HTTP_ERRORS.AUTH_ERROR,
    404: HttpConfig.HTTP_ERRORS.NOTFOUND_ERROR,
};
