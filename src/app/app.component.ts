import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GoToHomeService } from "./go-to-home.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private router: Router,
    public goToHomeService: GoToHomeService
  ) {}

  viewMenu: boolean = true;
  toggleMenu() {
    this.viewMenu = !this.viewMenu;
  }

  goToHome() {
    this.goToHomeService.goToHome();
  }

  goToQuizz() {
    this.router.navigate(["/list-quizz"]);
    this.toggleMenu();
  }

  goToAPropos() {
    this.router.navigate(["/a-propos"]);
    this.toggleMenu();
  }
}
