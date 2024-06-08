import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit {

  public url: string;
  public user: User;
  public confirm: boolean;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute,
  ){
    this.url = Global.url;
    this.user = new User('','','','', '','', '');
    this.confirm= false;
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


}
