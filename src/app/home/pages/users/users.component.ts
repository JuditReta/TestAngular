import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public users: User[];
  public url: string;

  constructor(
    private _userService: UserService,
    private router: Router
  ){
    this.users = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe({
      next: (response) => {
        if(response){
          this.users =  response;
        }
      },
      error:(error) => {
        console.log(<any>error);
      }
    });
  }

   delete(id: string){
    Swal.fire({
      title: "¿Estas seguro de querer eliminarlo?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro fue eliminado.",
              icon: "success",
            }).then(()=>{
              window.location.reload();
            });

          },
          error:(error)=>{
            Swal.fire({
              title: "¡Hubo un error!",
              text: "Hubo un erro con la solicitud, favor de comunicarse con el administrador.",
              icon: "error"
            });
          }
        });
      }
    });
  }



}
