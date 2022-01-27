import { Component } from "@angular/core";
import {
  Pagination,
  requestObject,
  ConfirmService,
  SearchParams,
  ModalService,
} from "ng-tui";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MoreComponent } from "./more/more.component";

@Component({
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  theads: Array<string> = [
    "No.",
    "Project",
    "Language",
    "Star",
    "Forks",
    "Opt",
  ];

  constructor(private confirm: ConfirmService, private modal: ModalService) { }

  doSearch(table: any) {
    if (this.checkSearchForm(table.params)) {
      table.doSearch();
    }
  }

  showMore(data: any) {
    this.modal.create(MoreComponent, { data }).present();
  }

  checkSearchForm(search: SearchParams): boolean {
    if (search.isEmptyKey("q")) {
      this.confirm.danger(
        "Invalid params",
        "The key works should not be empty!"
      );
      return false;
    }
    if (search.isEmptyKey("sort")) {
      this.confirm.danger(
        "Invalid params",
        "The sort value should not be empty!"
      );
      return false;
    }
    return true;
  }

  dataLoader(page: Pagination, search: SearchParams): Observable<any> {
    return requestObject(
      `https://api.github.com/search/repositories?q=${search.params.q || "Angular"
      }&sort=${search.params.sort || "stars"}&page=${page.page}&per_page=${page.limit
      }`
    ).pipe(
      map((res) => {
        const total = Math.min(res.total_count || 0, 1000);
        const data = res.items;
        return { result: true, total, data };
      })
    );
  }
}
