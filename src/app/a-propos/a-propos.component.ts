import { Component } from "@angular/core";
import { GoToHomeService } from "../go-to-home.service";

@Component({
  selector: "app-a-propos",
  templateUrl: "./a-propos.component.html",
  styleUrls: ["./a-propos.component.css"],
})
export class AProposComponent {
  isOn: boolean = true;
  constructor(public goToHomeService: GoToHomeService) {}
  ngOnInit() {
    this.goToHomeService.isOn = true;
  }
  goToHome() {
    this.goToHomeService.goToHome();
  }
}
