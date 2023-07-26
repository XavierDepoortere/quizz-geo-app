import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiGeoService {
  private apiUrl = "https://restcountries.com/v3.1/all";
  // "https://countriesnow.space/api/v0.1/countries/population/cities";
  countriesData: any[] = [];
  // utilisation de BehaviorSubject au lieu de Subject car le quizz ne ce recharge pas quand on relence la page
  countriesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isDataLoaded = false;

  constructor(private http: HttpClient) {
    this.fetchApiGeo().subscribe({
      next: (data) => {
        this.countriesData = data;
        this.isDataLoaded = true; // Définir la variable isDataLoaded sur true après le chargement des données
        this.countriesSubject.next(data); // Émettre les données via le subject
        console.log("test1");
      },
      error: (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error
        );
      },
    });
  }

  fetchApiGeo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCountriesData(): any[] {
    return this.countriesData;
  }

  getRandomData() {
    const randomData = [];
    while (randomData.length < 20 && this.countriesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.countriesData.length);
      const selectedData = this.countriesData.splice(randomIndex, 1)[0];
      randomData.push(selectedData);
      console.log(selectedData);
    }
    return randomData;
  }
  resetCountriesSubject() {
    this.countriesSubject = new BehaviorSubject<any>(null);
  }
}
