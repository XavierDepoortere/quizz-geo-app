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
  quizz: string | null = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public goToHomeService: GoToHomeService
  ) {}

  ngOnInit() {
    this.score = this.route.snapshot.paramMap.get("score");
    this.quizz = this.route.snapshot.paramMap.get("quizz");
  }

  goToHome() {
    this.goToHomeService.goToHome();
  }

  goToQuizz() {
    if (this.quizz === "drapeau") {
      this.router.navigate(["/quizz-drapeau"]);
    }

    if (this.quizz === "pays") {
      this.router.navigate(["/quizz-pays"]);
    }
    if (this.quizz === "capital") {
      this.router.navigate(["/quizz-capital"]);
    }
  }
}
