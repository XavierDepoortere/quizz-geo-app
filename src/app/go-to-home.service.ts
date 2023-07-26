import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GoToHomeService {
  constructor(private router: Router) {}
  isOn: boolean = true;
  goToHome() {
    this.isOn = !this.isOn;

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 700);
  }
}
