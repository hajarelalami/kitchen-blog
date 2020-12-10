import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  articles: Article[] = [];
  userId: number;
  constructor(private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    console.log(this.userId)
    if (this.userId) {
      this.articleService.getArticlesByUserId(this.userId).subscribe(result => {
        this.articles = result;
      })
    } else {
      this.articleService.getAllArticles().subscribe(result => {
        this.articles = result;
      })
    }

  }

}
