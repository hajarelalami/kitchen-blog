import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './component/article-details/article-details.component';
import { CreateArticleComponent } from './component/create-article/create-article.component';
import { HomeComponent } from './component/home/home.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'article/:id', component: ArticleDetailsComponent },
  { path: 'user/:id', component: HomeComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'create', component: CreateArticleComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
