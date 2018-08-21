import { Observable } from 'rxjs';

export interface UploadConfig {
    host?: string;
    queryString?: string;
    uploader?: (file: File) => Observable<string>;
    progresser?: (file: File) => Observable<number | string>;
}
