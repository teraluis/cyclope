import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {WelcomeComponent} from './modules/welcome/welcome.component';
import {QuestionComponent} from './modules/question/question.component';
import {QuestionsComponent} from './modules/questions/questions.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'welcome'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'questions', component: QuestionsComponent},
      {path: 'game-over', component: WelcomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
