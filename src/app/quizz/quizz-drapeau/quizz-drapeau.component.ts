import { Component, OnInit } from "@angular/core";
import { MockQuizzService } from "../mock-quizz.service";
import { Pays } from "../pays";
import { ApiGeoService } from "src/app/api-geo.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-quizz-drapeau",
  templateUrl: "./quizz-drapeau.component.html",
  styleUrls: ["../list-quizz/list-quizz.component.css"],
})
export class QuizzDrapeauComponent implements OnInit {
  public quizzDrapeau: Pays[] = [];
  public indexQuestion: number = 0;
  public shuffledChoices: string[] = [];
  public isDataLoaded: boolean = false;
  selectedChoice: string | null = null;
  isAnswerCorrect: boolean | null = null;
  public score: number = 0;

  constructor(
    private mockQuizzService: MockQuizzService,
    private apiGeoService: ApiGeoService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("test init");
    this.apiGeoService.countriesSubject.subscribe((data: any) => {
      this.quizzDrapeau = this.mockQuizzService.getCreateMockQuizz();
      console.log("isDataLoaded:", this.isDataLoaded); // Vérifier la valeur de isDataLoaded après le chargement des données
      this.isDataLoaded = true; // Définir la variable isDataLoaded sur true après le chargement des données
      console.log("isDataLoaded:", this.isDataLoaded); // Vérifier la valeur de isDataLoaded après le chargement des données
      this.shuffleChoices();
    });
  }

  shuffleChoices() {
    //Fonction pour mélanger les 3 choix
    if (
      this.isDataLoaded && // Vérifier si les données sont chargées
      this.quizzDrapeau.length > 0 &&
      this.indexQuestion >= 0 &&
      this.indexQuestion < this.quizzDrapeau.length
    ) {
      this.shuffledChoices = this.quizzDrapeau[this.indexQuestion].name.slice(); // Copie le tableau original
      this.shuffledChoices.sort(() => Math.random() - 0.5); // Mélange les éléments du tableau
    }
  }
  validateAnswer(choice: string) {
    //Fonction pour vérifier la reponse de l'utilisateur
    if (this.selectedChoice === null) {
      // Si l'utilisateur n'a pas encore cliqué sur une réponse, on enregistre la réponse sélectionnée
      this.selectedChoice = choice;

      // Vérification de la réponse et mise à jour du statut (correct ou incorrect)
      this.isAnswerCorrect = this.isChoiceCorrect(choice);
      if (this.isAnswerCorrect === true) {
        this.score++;
        console.log(this.score);
      }
    }
  }

  isChoiceCorrect(choice: string): boolean {
    //Fonction pour comparer la réponse de l'utilisateur avec la réponse du quizz
    const correctAnswer = this.quizzDrapeau[this.indexQuestion].name[0];
    return choice === correctAnswer;
  }
  next() {
    if (this.indexQuestion < this.quizzDrapeau.length - 1) {
      this.indexQuestion++;
      this.shuffleChoices();
      this.selectedChoice = null;
    } else {
      console.log("fin du quizz");
      this.apiGeoService.resetCountriesSubject();
      this.mockQuizzService.resetQuizz();
      //this.quizzDrapeau = [];
      //this.indexQuestion = 0;
      //this.shuffleChoices();
      //this.isDataLoaded = false;

      this.router.navigate(["/quizz-resultat", this.score]);
    }
  }
}