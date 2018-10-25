import { Component } from '@angular/core';
import { RequestService } from '../../../../cores/services';
import { ToastService } from 'ng-tui';
import { QuillOptions } from '../../../../configs/quill.config';

@Component({
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent {

    content = '';

    quillOptions = QuillOptions;

    constructor(
        private request: RequestService,
        private toast: ToastService,
    ) {
        this.loadText();
    }

    /**
     * 主动获取富文本内容
     * @return {void}
     */
    loadText() {
        this.request.withoutHost.withoutHeader.
            text(`https://hello1024.oss-cn-beijing.aliyuncs.com/upload/temp.txt?${new Date().getTime()}`)
            .subscribe(content => this.content = content);
    }

    /**
     * 富文本内容需要单独上传，不再是图片单独上传，数据库不再保存富文本的内容；
     * 数据只保存富文本的访问地址，前端使用时需要自行请求获取文档内容（获取一个txt文件）
     * @param {any} btn 加载按钮对象，用于关闭加载状态
     * @return {void}
     */
    confirmSave(btn: any) {
        const blob = new Blob([this.content]);
        const file = new File([blob], 'temp.txt', { type: 'text/plain' });
        this.request.ossUpload('/managerapi/quill', file)
            .subscribe(res => {
                if (res !== 'upload error') {
                    this.toast.success('保存成功', '成功保存富文本内容～');
                } else {
                    this.toast.warning('保存失败', '无法上传文件到云端～');
                }
                btn.dismiss();
            });
    }
}
