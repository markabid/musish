import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service'
import { PostService } from '../../services/post.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  closeResult: String;
  name: String;
  id: String;
  content: String;
  time: String;


  constructor(private postService: PostService, private validateService: ValidateService, private modalService: NgbModal, private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  //for modal popup

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onPostClick(){
    const post = {
      name: this.name,
      id: this.id,
      content: this.content,
      time: this.time
    }
    console.log(this.content);
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('Please enter a post', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    //store post in db
    const user = JSON.parse(localStorage.getItem('user'));
    post.id = user.id;
    post.name = user.name;
    post.time = new Date().toLocaleString();
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

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now logged out', {cssClass:'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}
