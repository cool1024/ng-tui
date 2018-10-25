/**
 * 富文本编辑器CKEditor5例子
 *
 * @author xiaojian
 * @file   ckeditor.component.ts
 * @date   2018-10-25 11:18:12
 */
import { Component } from '@angular/core';
import { CKEditorOptions } from 'src/app/configs/ckeditor.config';

@Component({
    templateUrl: './ckeditor.component.html',
    styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent {

    content = `
    <h2>Sample</h2>

	<p>This is an instance of the <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor">classic editor build</a>.</p>

	<figure class="image">
		<img src="https://hello1024.oss-cn-beijing.aliyuncs.com/upload/banner/201808310313105b88b246cb80c.jpg" />
	</figure>

	<p>You can use this sample to validate whether your <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html">custom build</a> works fine.</p>
    `;

    options = CKEditorOptions;

    /**
     * 测试方法
     * @param instance 编辑器实例
     */
    testFunc(instance: any) {
        console.log(Array.from(instance.ui.componentFactory.names()));
    }
}
