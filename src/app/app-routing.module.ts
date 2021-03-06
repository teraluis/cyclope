import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {WelcomeComponent} from './modules/welcome/welcome.component';
import {QuestionsComponent} from './modules/questions/questions.component';
import {GameOverComponent} from './modules/game-over/game-over.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {MovieComponent} from './modules/movie/movie.component';
import {ImageComponent} from './modules/image/image.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'welcome'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'questions', component: QuestionsComponent},
      {path: 'game-over', component: GameOverComponent},
      {path: 'add-movie', component: MovieComponent}
    ]
  },
  {path: 'not-found', component: NotfoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
