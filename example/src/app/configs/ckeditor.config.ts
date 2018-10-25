import { HttpConfig } from './http.config';

export const CKEditorOptions = {
    language: 'zh-cn',
    ckfinder: {
        uploadUrl: HttpConfig.SERVER_URL + '/devexample/upload/ckeditor'
    }
};
