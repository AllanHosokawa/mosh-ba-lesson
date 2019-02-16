import { BadRequestError } from './../common/error/bad-request-error';
import { NotFoundError } from './../common/error/not-found-error';
import { AppError } from './../common/error/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: Object[];

  constructor(private service: PostService){
  }

  ngOnInit(){
    this.service.getAll()
      .subscribe(value => this.posts = value);
  }

  createPost(input: HTMLInputElement){
    let post = { title: input.value };
    this.posts.splice(0, 0, post)        

    input.value = '';

    this.service.create(post)
      .subscribe(
      newPost =>{        
        post['id'] = newPost;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if(error instanceof BadRequestError){
          //form.setErrors();
        }
        else throw error;    
      });
  }

  updatePost(post){
    this.service.update(post)
      .subscribe(
      updatedPost => {
        console.log(updatedPost);
      });
  }

  deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
      null,
      (error: AppError) => {
        this.posts.splice(index, 0, post);

        console.log(error);
        if(error instanceof NotFoundError)
          alert('This post has already been deleted');
        else throw error;
      });
  }
}
