import { Component, ViewChildren, QueryList } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item } from '../../projects/ng-tui/src/public_api';
import { SideMenuGroupDirective } from 'projects/ng-tui/src/modules/dropdown/side-menu.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selectedValue = 0;

    content = `
    <h2>Sample</h2>

	<p>This is an instance of the <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor">classic editor build</a>.</p>

	<figure class="image">
		<img src="https://hello1024.oss-cn-beijing.aliyuncs.com/upload/banner/201808310313105b88b246cb80c.jpg" />
	</figure>

	<p>You can use this sample to validate whether your <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html">custom build</a> works fine.</p>
    `;

    options = {
        language: 'zh-cn',
        ckfinder: {
            uploadUrl: 'https://www.cool1024.com/devexample/upload/ckeditor'
        }
    };

    @ViewChildren(SideMenuGroupDirective) menuGroups: QueryList<SideMenuGroupDirective>;

    doSearch = (key: string) => {
        return of(['A', 'AA', 'B', 'BB', 'ABC']).pipe(
            // delay(2000),
            map<string[], Item[]>(res => {
                return res.map((item, index) => ({ value: index, text: item }));
            })
        );
    }

    closeOtherMenu(index: number) {
        const menuGroups = this.menuGroups.toArray();
        menuGroups.splice(index, 1);
        menuGroups.forEach(item => item.dismiss());
    }
}
