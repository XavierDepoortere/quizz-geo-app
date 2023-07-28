import { Component, OnInit } from "@angular/core";
import { MockQuizzService } from "../mock-quizz.service";
import { ApiGeoService } from "src/app/api-geo.service";
import { Router } from "@angular/router";
import { Pays } from "../pays";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-quizz-capital",
  templateUrl: "./quizz-capital.component.html",
  styleUrls: ["../list-quizz/list-quizz.component.css"],
})
export class QuizzCapitalComponent implements OnInit {
  public quizzCapital: Pays[] = [];
  public indexQuestion: number = 0;
  public shuffledChoices: string[] = [];
  public isDataLoaded: boolean = false;
  selectedChoice: string | null = null;
  isAnswerCorrect: boolean | null = null;
  score: number = 0;
  quizz: string = "capital";

  constructor(
    private mockQuizzService: MockQuizzService,
    private apiGeoService: ApiGeoService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.apiGeoService.resetCountriesSubject();
    this.mockQuizzService.resetQuizz();
    console.log("test init");
    this.apiGeoService.countriesSubject.subscribe((data: any) => {
      this.quizzCapital = this.mockQuizzService.getCreateMockQuizz(this.quizz);
      console.log("isDataLoaded:", this.isDataLoaded); // Vérifier la valeur de isDataLoaded après le chargement des données

      // Utilisation d'une fonction asynchrone pour attendre que this.quizzCapital soit non vide
      const waitForQuizzCapital = async () => {
        while (this.quizzCapital.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Attendre 100 millisecondes avant de réessayer
        }

        // À ce stade, this.quizzCapital est non vide
        this.isDataLoaded = true; // Définir la variable isDataLoaded sur true après le chargement des données
        console.log("isDataLoaded:", this.isDataLoaded); // Vérifier la valeur de isDataLoaded après le chargement des données
        this.shuffleChoices();
      };

      // Appeler la fonction waitForQuizzCapital pour commencer l'attente
      waitForQuizzCapital();
    });
  }

  shuffleChoices() {
    //Fonction pour mélanger les 3 choix
    if (
      this.isDataLoaded && // Vérifier si les données sont chargées
      this.quizzCapital.length > 0 &&
      this.indexQuestion >= 0 &&
      this.indexQuestion < this.quizzCapital.length
    ) {
      this.shuffledChoices =
        this.quizzCapital[this.indexQuestion].capital.slice(); // Copie le tableau original
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
    const correctAnswer = this.quizzCapital[this.indexQuestion].capital[0];
    return choice === correctAnswer;
  }
  next() {
    if (this.indexQuestion < this.quizzCapital.length - 1) {
      this.indexQuestion++;
      this.shuffleChoices();
      this.selectedChoice = null;
    } else {
      this.localStorageService.saveDataToLocalStorage(this.quizz, this.score);
      //this.quizzDrapeau = [];
      //this.indexQuestion = 0;
      //this.shuffleChoices();
      this.isDataLoaded = false;

      this.router.navigate(["/quizz-resultat", this.score, this.quizz]);
    }
  }
}
