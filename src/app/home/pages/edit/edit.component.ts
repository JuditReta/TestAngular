import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  public url: string;
  public user: User;
  public confirm: boolean;
  public status: string;
  public base64String: string;
  public file: File;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;
    this.user = new User('','','','', '','', '');
    this.confirm= false;
    this.status = "";
    this.base64String = "";
    this.file = new File([""], "filename");
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id =  params['id'];
      this.getUser(id);
    });
  }

  getUser(id:string):void{

    this._userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response;
      },
      error:(error) => {
        console.log(<any>error);
      }
    });
  }

  async update(form:any){
    this.user.image = this.base64String;
    this._userService.updateUser(this.user).subscribe({
      next: (response) => {
        if(response){
          this.status =  'success';
          this._router.navigateByUrl('/home/users');
        }
        else{
          this.status =  'failed';
        }
      },
      error:(error) => {
        console.log(<any>error);
      }
    });
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
    this.convertToBase64();
  }

  convertToBase64() {
    if (!this.file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64String = reader.result as string;
    };
  }
}
