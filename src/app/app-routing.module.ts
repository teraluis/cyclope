import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {WelcomeComponent} from './modules/welcome/welcome.component';
import {QuestionComponent} from './modules/question/question.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'welcome'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'questions', component: QuestionComponent},
      {path: 'game-over', component: WelcomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
