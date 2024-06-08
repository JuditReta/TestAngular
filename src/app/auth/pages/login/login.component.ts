import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  private fb =  inject(FormBuilder);
  public user: User;

  constructor(
    private _authService: AuthService,
    private router: Router
  ){
    this.user = new User('','','','');
  }

  public myForm: FormGroup =  this.fb.group({
    email: ['prueba@prueba.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]
  });

  login(form:any){
    const {email, password} =  this.myForm.value;
    this._authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/home/users'),
        error: (message) =>{
          Swal.fire('Error', message, 'error');
        }
      })
  }
}
