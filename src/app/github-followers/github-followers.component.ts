import { BadRequestError } from './../common/error/bad-request-error';
import { AppError } from './../common/error/app-error';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/error/not-found-error';

@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: Object[];
  
  constructor(private service: GithubFollowersService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(value => this.followers = value);
  }

  create(input: HTMLInputElement){
    let follower = { name: input.value }
    this.followers.splice(0, 0, follower);

    input.value = '';

    this.service.create(follower)
      .subscribe(
        newFollower => follower['id'] = newFollower,
        (error: AppError) => {
          this.followers.splice(0, 1);

          if(error instanceof BadRequestError)
            alert('Bad Request');
          else
            throw error;
        }
      );
  }

  update(post){
    this.service.update(post)
      .subscribe(updateFollower => console.log(updateFollower));
  }

  delete(post){
    this.service.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {
          if(error instanceof NotFoundError)
            alert('Follower has already been deleted');
          else
            throw error;
        }
      )
  }
}
