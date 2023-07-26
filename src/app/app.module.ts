import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GoToHomeService } from "./go-to-home.service";
import { AProposComponent } from "./a-propos/a-propos.component";
import { HttpClientModule } from "@angular/common/http";
import { QuizzModule } from "./quizz/quizz.module";

@NgModule({
  declarations: [AppComponent, AProposComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, QuizzModule],
  providers: [GoToHomeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
