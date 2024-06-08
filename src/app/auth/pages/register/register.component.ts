import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  public user: User;
  public status: string;
  public statusP: string;

  constructor(
    private _userService: UserService,
    private router: Router
  ){
    this.user = new User('','','','');
    this.status =  '';
    this.statusP = '';
  }


  async onSubmit(form:any){
    if(this.user.password === this.user.password2){
      this._userService.saveUser(this.user).subscribe({
        next: (response) => {
          if(response){
            this.status =  'success';
            this.router.navigateByUrl('/home/users');
          }
          else{
            this.status =  'failed';
          }
        },
        error:(error) => {
          console.log(<any>error);
        }
      });
    }else {
      this.statusP =  'failed';
      await delay(4000);
      this.statusP =  '';
    }

    function delay(delay: number) {
      return new Promise(r => {
          setTimeout(r, delay);
      })
    }

  }
}
