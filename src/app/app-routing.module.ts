import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListQuizzComponent } from "./quizz/list-quizz/list-quizz.component";
import { AProposComponent } from "./a-propos/a-propos.component";
import { QuizzDrapeauComponent } from "./quizz/quizz-drapeau/quizz-drapeau.component";
import { QuizzResultatComponent } from "./quizz/quizz-resultat/quizz-resultat.component";

const routes: Routes = [
  { path: "quizz-resultat/:score", component: QuizzResultatComponent },
  { path: "quizz-drapeau", component: QuizzDrapeauComponent },
  { path: "list-quizz", component: ListQuizzComponent },
  { path: "a-propos", component: AProposComponent },
  { path: "", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
