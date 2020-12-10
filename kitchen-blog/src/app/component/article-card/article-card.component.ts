import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { FileEntity } from 'src/app/model/file';
import { ArticleService } from 'src/app/service/article/article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-card',
  templateUrl: 
  './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  files: FileEntity[];
  private NOT_FOUND = "../../../assets/image/not-found.png";

  constructor(
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.articleService.getFilesByArticleId(this.article.id)
      .subscribe(result => {
        this.files = result;
      })

  }

  transform() {
    if (this.files && this.files.length > 0) {
      return 'data:image/jpeg;base64,' + this.files[0].image
    }
    return this.NOT_FOUND
  }

  goToArticle() {
    this.router.navigate(['article', this.article.id]);
  }

  toUserProfile(userId: number) {
    console.log(userId)
    this.router.navigate(['user', userId]);
  }
}
