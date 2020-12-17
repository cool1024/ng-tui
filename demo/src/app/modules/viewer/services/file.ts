export interface FileItem {

    // 文件名称
    fileName: string;
    // 文件地址
    filePath: string;
    // 文件类型
    fileType: string;
    // 文件预览地址
    previewUrl: string;
    // 文件下载地址
    downloadUrl: string;
    // 所属目录地址
    parentDir: string;
    // 预览尺寸
    previewSize: { width: number, height: number };

}