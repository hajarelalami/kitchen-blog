import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faUtensils, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { FileEntity } from 'src/app/model/file';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  article$: Observable<Article>;
  files$: Observable<FileEntity[]>;
  faClock = faClock;
  faUtensils = faUtensils;

  NOT_FOUND = "../../../assets/image/not-found.png";

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.article$ = this.articleService.getArticleById(this.activatedRoute.snapshot.params.id);
    this.files$ = this.articleService.getFilesByArticleId(this.activatedRoute.snapshot.params.id);
  }

  transform(file) {
    return 'data:image/jpeg;base64,' + file.image
  }
  
  toUserProfile(userId: number) {
    console.log(userId)
    this.router.navigate(['user', userId]);

  }
}
