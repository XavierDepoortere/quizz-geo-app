import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzDrapeauComponent } from "./quizz-drapeau/quizz-drapeau.component";
import { ListQuizzComponent } from "./list-quizz/list-quizz.component";
import { QuizzResultatComponent } from './quizz-resultat/quizz-resultat.component';
import { QuizzPaysComponent } from './quizz-pays/quizz-pays.component';
import { QuizzCapitalComponent } from './quizz-capital/quizz-capital.component';

@NgModule({
  declarations: [QuizzDrapeauComponent, ListQuizzComponent, QuizzResultatComponent, QuizzPaysComponent, QuizzCapitalComponent],
  imports: [CommonModule],
  providers: [],
})
export class QuizzModule {}
