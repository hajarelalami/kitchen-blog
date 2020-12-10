import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article/article.service';
import { UserService } from 'src/app/service/user/user.service';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  isLoading: boolean = false;
  etapes = [];
  ingredients = [];
  faPlusCircle = faPlusCircle
  faMinusCircle = faMinusCircle;


  constructor(private articleService: ArticleService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/home'])
    }
  }
  form: FormGroup = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    cockingTime: new FormControl(''),
    difficulty: new FormControl(''),
    preparationTime: new FormControl('')
  });


  selectFile(event) {
    console.log(event.target.files)
    if (event.target.files.length < 3) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles)
    }
    else {
      alert("You are only allowed to upload a maximum of 3 files");
    }
  }

  upload() {
    var article = new Article();

    article.title = this.form.controls.titre.value;
    article.type = this.form.controls.type.value;
    article.cockingTime = this.form.controls.cockingTime.value;
    article.desc = this.form.controls.description.value;
    article.difficulty = this.form.controls.difficulty.value;
    article.preparationTime = this.form.controls.preparationTime.value
    article.ingredients = this.ingredients;
    article.etapes = this.etapes;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.articleService.saveArticle(article)
      .pipe(
        mergeMap(result => forkJoin(this.fillPictureRequest(result.id)))
      )
      .subscribe((event: HttpEvent<{}>[]) => {
        var uploadProgressEvent = event.filter(result => (result.type === HttpEventType.UploadProgress));
        console.log(uploadProgressEvent.length);
        if (uploadProgressEvent.length === 0) {
          console.log('Files is completely uploaded!');
          this.selectedFiles = undefined;
          this.router.navigate(['/home'])
        }
      });

  }
  private fillPictureRequest(articleId: number): any[] {
    console.log(this.selectedFiles);
    var requests = [];
    for (let index = 0; index < this.selectedFiles.length
      ; index++) {
      console.log(index)
      requests.push(this.articleService.saveFiles(
        this.selectedFiles.item(index),
        articleId
      )
      )
    }
    return requests;
  }

  addEtape(newEtape: string) {
    console.log(newEtape)
    if (newEtape) {
      this.etapes.push(newEtape);
    }
  }

  deleteEtape(etapeIndex: number) {
    this.etapes = this.etapes.filter((etape, index) => index !== etapeIndex)
  }

  addIngredient(newIngredient: string) {
    if (newIngredient) {
      this.ingredients.push(newIngredient);
    }
  }

  deleteIngredient(ingredientIndex: number) {
    this.ingredients = this.ingredients.filter((ingredint, index) => index !== ingredientIndex)
  }
}
