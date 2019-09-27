import { Component } from '@angular/core';
import { DateRange, ItemTree, ModalService, ConfirmService } from '../../projects/ng-tui/src/public_api';
import { ExampleModalComponent } from './demo/example-modal.component';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    date = '2019/1/2';

    year = 1990;

    time = '15:31:46';

    range: DateRange = {
        start: '2019/01/02',
        end: '2019/01/09',
    };

    selectItems = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
        'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
        'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
        'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
        'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
        'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
        'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
        'Zagreb', 'Zaragoza', 'Łódź'].map((item, index) => ({
            value: index,
            text: item,
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/${index + 1}.jpg"> ${item}`
        }));

    departmentOptions: Array<ItemTree> = [{
        value: 1,
        text: '董事长',
        children: [
            { value: 2, text: '董事长助理' },
            {
                value: 3, text: '执行董事兼总经理',
                children: [
                    {
                        value: 4, text: '副总经理',
                        children: [
                            { value: 5, text: '执行部' },
                            { value: 6, text: '行政部' },
                            { value: 7, text: '财务部' },
                            { value: 8, text: '操作部' },
                            { value: 9, text: '安技部门' },
                        ]
                    },
                ]
            },
        ]
    }];

    uploader = (file: File): Observable<number | string> => {
        return interval(100).pipe(take(101), map(progress => progress >= 100 ? 'success' : progress));
    }

    constructor(
        private modal: ModalService,
        private confirm: ConfirmService,
    ) { }

    showModal() {
        const modal = this.modal.create(ExampleModalComponent, { title: '这个是标题' });
        modal.present().subscribe(res => {
            console.log(res);
        });
    }

    showConfirm() {
        this.confirm.success('确认操作', '这个提示你还是看一下，也许有用呢？');
    }
}
