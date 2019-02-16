import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  getAuthors(){
    return ["Author A", "Author B", "Author C"];
  }
}
