import { Component, OnInit } from "@angular/core";

import { GoToHomeService } from "src/app/go-to-home.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-quizz",
  templateUrl: "./list-quizz.component.html",
  styleUrls: ["./list-quizz.component.css"],
})
export class ListQuizzComponent implements OnInit {
  isOn: boolean = true;

  constructor(
    public goToHomeService: GoToHomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.goToHomeService.isOn = true;
  }

  goToHome() {
    this.goToHomeService.goToHome();
  }
  goToQuizzDrapeau() {
    this.router.navigate(["/quizz-drapeau"]);
  }
}
