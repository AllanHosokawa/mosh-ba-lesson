import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mosh-ba-lesson';

  //Objeto para testar o component API Like
  tweet = {
    body: 'Here is the body of a tweet',
    isLiked: false,
    likesCount: 0
  }
}
