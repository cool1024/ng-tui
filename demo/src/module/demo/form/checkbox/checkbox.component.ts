import { Component } from "@angular/core";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
})
export class CheckboxComponent {
  inputs = [
    ["color", " string", `color name, such as 'success', 'primary', etc.`],
    ["value", " any", "checked value"],
  ];

  outputs = [["checkedChange", "boolean", "checked status."]];

  radioValues = ["success", "primary", "danger"];

  checkedValue = "primary";

  switchValue = "secondary";

  radioValue = "primary";

  checkboxValue = ["primary"];
}
