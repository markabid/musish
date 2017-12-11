import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { PostService } from '../../services/post.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  name: String;
  id: String;
  content: String;
  time: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  onPostSubmit(){
    const post = {
      name: this.name,
      id: this.id,
      content: this.content,
      time: this.time
    }
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('Please enter a post', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    //register user
    this.postService.savePost(post).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Post Saved!', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessage.show('Sorry, something went wrong. Please try again.', {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
