import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { FileEntity } from 'src/app/model/file';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }


  saveArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'article', article);
  }

  saveFiles(file: File, artcleId: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('articleId', '' + artcleId);


    return this.http.post(this.url + 'file/add', formdata, {
      responseType: "blob", reportProgress: true, observe: "events"
    });
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + 'public/article');
  }

  getArticlesByUserId(userId: number): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + 'public/articles/user/' + userId);
  }

  getFilesByArticleId(articleId: number) {
    return this.http.get<FileEntity[]>(this.url + 'public/files/article/' + articleId);
  }

  getArticleById(articleId: number) {
    return this.http.get<Article>(this.url + 'public/article/' + articleId);

  }
}
