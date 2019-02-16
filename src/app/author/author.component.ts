import { Component, OnInit } from '@angular/core';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors: string[];

  constructor(service: AuthorService) { 
    this.authors = service.getAuthors();
  }

  ngOnInit() {
  }

}
