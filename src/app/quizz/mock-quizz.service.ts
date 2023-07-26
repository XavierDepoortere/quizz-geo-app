import { Injectable } from "@angular/core";
import { Pays } from "./pays";
import { ApiGeoService } from "../api-geo.service";

@Injectable({
  providedIn: "root",
})
export class MockQuizzService {
  quizz: Pays[] = [];

  /* getQuizzById(quizz: [], quizzId: number): Pays | undefined {
    return quizz.find((quizz) => quizz.id == quizzId);
  }*/
  constructor(private apiGeoService: ApiGeoService) {}
  randomIndex() {
    const randomIndex = Math.floor(
      Math.random() * this.apiGeoService.countriesData.length
    );
    return randomIndex;
  }

  getCreateMockQuizz() {
    let randomData = this.apiGeoService.getRandomData();
    let id = 0;
    if (this.quizz.length == 0) {
      for (let i = 0; i < randomData.length; i++) {
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
            this.apiGeoService.countriesData[this.randomIndex()].translations
              .fra;
        }
        while (
          nameFalse2 == countryData.translations.fra.common ||
          nameFalse1 == nameFalse2
        ) {
          nameFalse2 =
            this.apiGeoService.countriesData[this.randomIndex()].translations
              .fra;
        }
        const country = new Pays(
          id++,
          [countryData.translations.fra.common, nameFalse1, nameFalse2],
          countryData.capital,
          countryData.flags.png
        );
        console.log("test3");
        this.quizz.push(country);
      }
    }

    return this.quizz;
  }

  resetQuizz() {
    this.quizz = [];
  }
}
