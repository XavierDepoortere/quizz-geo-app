import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  currentDate: Date = new Date();
  scores: any[] = [];

  saveDataToLocalStorage(quizz: string, score: number) {
    console.log(quizz, score);

    // Récupérer les données existantes depuis le localStorage (si elles existent)
    const data = localStorage.getItem(quizz);
    let userData: any[] = [];

    if (data) {
      userData = JSON.parse(data);
    }

    // Ajouter une nouvelle ligne à userData avec la date courante
    const newLine = {
      quizz,
      score,
      date: this.currentDate,
    };

    // Vérifier si userData a moins de 3 éléments avant d'ajouter la nouvelle ligne
    if (userData.length < 3 || userData === undefined) {
      console.log("moins de 3");
      userData.push(newLine);
    } else {
      // Trouver la ligne ayant le score le plus bas
      let lowestScoreIndex = 0;
      for (let i = 1; i < userData.length; i++) {
        if (userData[i].score < userData[lowestScoreIndex].score) {
          lowestScoreIndex = i;
        }
      }

      // Remplacer la ligne ayant le score le plus bas par la nouvelle ligne
      userData[lowestScoreIndex] = newLine;
    }

    // Enregistrer les données mises à jour dans le localStorage
    localStorage.setItem(quizz, JSON.stringify(userData));
  }
}
