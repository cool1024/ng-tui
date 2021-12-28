import { Component } from "@angular/core";
import { Item } from "ng-tui";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
})
export class DropdownComponent {
  inputs = [
    ["color", " string", `color name, such as 'success', 'primary', etc.`],
    ["items", " Item[]", "dropdown items"],
    ["dropup", "string", "change to dropup"],
    ["offsetX", " number", "change menu postion"],
    ["offsetY", " number", "change menu postion"],
    ["minWidth", " number", "menu min width"],
    ["zIndex", " number", "menu z-index"],
    ["activeValue", " any", "selected item value"],
  ];

  outputs = [
    ["menuClick", "Item", "the item which be clicked"],
    ["menuWheel", "number", "mousewheel event"],
  ];

  activeColor = "white";

  colorItems: Item[] = [
    { text: "White", value: "white" },
    { text: "Success", value: "success" },
    { text: "Danger", value: "danger" },
    { text: "Warning", value: "warning" },
    { text: "Dark", value: "dark" },
    { text: "Primary", value: "primary" },
  ];

  constructor() {}

  showMenu(targetDom: HTMLElement): void {
    // this.menu
    //     .showMenu(targetDom, [
    //         DropMenuItem.label('Action'),
    //         DropMenuItem.label('Another Action'),
    //         DropMenuItem.label('Something else here'),
    //     ])
    //     .subscribe((item) => {
    //         alert(JSON.stringify(item));
    //     });
  }
}
