import { Injectable } from "@angular/core";
import { Pays } from "./pays";
import { ApiGeoService } from "../api-geo.service";

@Injectable({
  providedIn: "root",
})
export class MockQuizzService {
  quizz: Pays[] = [];

  constructor(private apiGeoService: ApiGeoService) {}
  randomIndex() {
    const randomIndex = Math.floor(
      Math.random() * this.apiGeoService.countriesData.length
    );
    return randomIndex;
  }

  getCreateMockQuizz(select: string | undefined) {
    let randomData = this.apiGeoService.getRandomData();
    let id = 0;

    if (this.quizz.length == 0) {
      for (let i = 0; i < randomData.length; i++) {
        switch (select) {
          case "pays":
            let countryPays = this.createQuizzPays(randomData, i, id);
            console.log("pays");
            this.quizz.push(countryPays);
            break;
          case "drapeau":
            let countryDrapeau = this.createQuizzDrapeau(randomData, i, id);
            console.log("drapeau");
            this.quizz.push(countryDrapeau);
            break;

          // Si select n'est ni "drapeau" ni "pays", vous pouvez ajouter une logique de gestion d'erreur ici

          default:
            break;
        }
      }
    }

    return this.quizz;
  }

  createQuizzDrapeau(randomData: any[], i: number, id: number): Pays {
    const countryData = randomData[i];
    let nameFalse1 =
      this.apiGeoService.countriesData[this.randomIndex()].translations.fra
        .common;
    let nameFalse2 =
      this.apiGeoService.countriesData[this.randomIndex()].translations.fra
        .common;
    while (
      nameFalse1 == countryData.translations.fra.common ||
      nameFalse1 == nameFalse2
    ) {
      nameFalse1 =
        this.apiGeoService.countriesData[this.randomIndex()].translations.fra
          .common;
    }
    while (
      nameFalse2 == countryData.translations.fra.common ||
      nameFalse1 == nameFalse2
    ) {
      nameFalse2 =
        this.apiGeoService.countriesData[this.randomIndex()].translations.fra
          .common;
    }
    const country = new Pays(
      id++,
      [countryData.translations.fra.common, nameFalse1, nameFalse2],
      countryData.capital,
      countryData.flags.png
    );
    return country;
  }

  createQuizzPays(randomData: any[], i: number, id: number): Pays {
    const countryData = randomData[i];
    let flagFalse1 =
      this.apiGeoService.countriesData[this.randomIndex()].flags.png;
    let flagFalse2 =
      this.apiGeoService.countriesData[this.randomIndex()].flags.png;
    while (flagFalse1 == countryData.flags.png || flagFalse1 == flagFalse2) {
      flagFalse1 =
        this.apiGeoService.countriesData[this.randomIndex()].flags.png;
    }
    while (flagFalse2 == countryData.flags.png || flagFalse1 == flagFalse2) {
      flagFalse2 =
        this.apiGeoService.countriesData[this.randomIndex()].flags.png;
    }
    const country = new Pays(
      id++,
      countryData.translations.fra.common,
      countryData.capital,
      [countryData.flags.png, flagFalse1, flagFalse2]
    );
    return country;
  }

  resetQuizz() {
    this.quizz = [];
  }
}
