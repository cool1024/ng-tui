import { Component } from "@angular/core";
import { ComponentHandleService } from "ng-tui";
@Component({
  templateUrl: "./more.html",
})
export class MoreComponent {
  data: any = {
    full_name: "",
    topics: [],
    description: "",
    owner: { avatar_url: "" },
    license: {},
  };
  constructor(public handle: ComponentHandleService) {}
}
