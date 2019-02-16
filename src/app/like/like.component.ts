import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input('isLiked') isLiked: boolean;
  @Input('likesCount') likesCount: number;

  constructor() { }

  ngOnInit() {
  }

  onLike(){
    this.isLiked = !this.isLiked;

    this.likesCount += this.isLiked ?  1 : -1;
  }
}
