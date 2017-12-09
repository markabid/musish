import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.validateService.validateRegistration(user)){
      this.flashMessage.show('Please enter all information', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please enter a valid email address', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You have sucessfully signed up!', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/login']);
      }
      else{
        this.flashMessage.show('Sorry, something went wrong. Please try again.', {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/register']);
      }
    });
  }
}
