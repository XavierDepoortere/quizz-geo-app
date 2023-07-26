import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GoToHomeService } from "src/app/go-to-home.service";

@Component({
  selector: "app-quizz-resultat",
  templateUrl: "./quizz-resultat.component.html",
  styleUrls: ["../list-quizz/list-quizz.component.css"],
})
export class QuizzResultatComponent {
  score: string | null = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public goToHomeService: GoToHomeService
  ) {}

  ngOnInit() {
    this.score = this.route.snapshot.paramMap.get("score");
  }

  goToHome() {
    this.goToHomeService.goToHome();
  }

  goToQuizzDrapeau() {
    this.router.navigate(["/quizz-drapeau"]);
  }
}
