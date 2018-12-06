export const HttpConfig = {

    // 服务器接口地址
    SERVER_URL: 'https://www.cool1024.com',

    // 资源地址
    SOURCE_URL: 'https://www.cool1024.com',

    // WEBSOCKET链接地址
    WEBSOCKET_URL: '',

    // 是否开启参数打包功能，只有POST|PUT请求的参数会被打包,上线需开启
    OPEN_PARAM_PACKAGE: false,

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
        TIMEOUT_ERROR: ['通信异常', '服务器很久没有响应了,请检查您的网络'],
        RESPONSE_CONTENT_ERROR: '接收到一个错误的响应，这通常是由于请求的地址错误导致的～',
        CHECK_ERROR: '未授权的令牌~',
        OTHER_ERROR: ['请求发送失败', '其他错误，异常的请求'],
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
    TOKEN_ERROR_URL: '/login',

    // 403跳转页面
    AUTH_ERROR_URL: '/error',

    // RSA 请求公钥
    RSA_PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyfRmdYFS58Xrr3rVPbhv
    ofOFbMmWEJlr1Lec7O5faCG0ACXIWQnqlUwJhdIuimNJhFjwuiYDYjJnQ3EOdGIk
    YLRO12sdCefcqiKXF5+NIKW4NikgGdr2t2zi8RwA94Q5DO3g/+B+w3FP2QSwrnhW
    wQ0R2++CrwPFW4txsyXIJQdi0Uv/2pG8vhrRHQrHa29bc/qDUYT4a4z99d6fSDUV
    JtOrjBYPw76jjf5R1tGKgoCQs9YIM7d6EzNv4j3cbOJqU2kRhhgDyHhinB/c1dpi
    JWXAjkJHRCyEU9Ugex1Mmi149B6Ucs2JN8PFm9vSoMDesSDtTOd9pQNwyeCIn0TP
    wwIDAQAB
    -----END PUBLIC KEY-----`,

    // RSA 私钥
    RSA_PRIVATE_KEY: ``
};

export const INTERCEPTOR_MESSAGES = {
    500: HttpConfig.HTTP_ERRORS.SERVER_ERROR,
    401: HttpConfig.HTTP_ERRORS.TOKEN_ERROR,
    403: HttpConfig.HTTP_ERRORS.AUTH_ERROR,
    404: HttpConfig.HTTP_ERRORS.NOTFOUND_ERROR,
};
