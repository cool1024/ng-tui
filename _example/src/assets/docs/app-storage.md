##### 文件上传服务<br><br>

##### 功能列表<br><br>

| 序号 | 功能名称 | 功能说明 |
|-----|---------|----------|
| 1   | 本地存储  | 图片上传，文件上传 |
| 2   | OSS存储  | 云端上传支持|

##### 前端接口<br><br>

| 接口名称     | 接口地址                              | 请求方式 | 参数   |
|--------------|---------------------------------------|----------|------------|
| 本地图片上传 | https://www.cool1024.com/upload/image | POST     | image:`File` |
| 本地文件上传 | https://www.cool1024.com/upload/file  | POST     | file:`File`  |
| OSS上传      | https://www.cool1024.com/upload/oss   | GET      | folder:`string`  |


##### 参考用例子<br><br>

```typescript
this.request.ossUpload('https://www.cool1024.com/upload/image',file).subscrible(res=>{
    // 文件访问地址
    console.log(res);
});
```
<br>

##### 附带头部参数说明<br><br>
```javascript
{
    // 开发序列号-这个参数在公司详情/开发者参数中有
    "app-series":"x0087312",
    // 存储授权令牌-这个是本存储服务专用
    "app-storage-token":"x8917dfadsr321489304jkjdksfndskiuertjwejk689"
}
```