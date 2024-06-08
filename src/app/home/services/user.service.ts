import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './global';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  saveUser(user:User): Observable<any>{
    let tokenX = this.checkToken();
    let body = {username: user.username, password:user.password};

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ tokenX }`)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin','*');

    return this._http.post( this.url+'auth/register' , body, {headers} )
      .pipe(
        map( (token ) => this.setAuthentication( token.toString() )),
        catchError( err => throwError( () => err.error.message ))
      );

    //return this._http.post(this.url+'auth/register', body, {headers:headers});

  }

  getUsers(): Observable<any>{
    //let token = this.checkToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin','*');

    return this._http.get(this.url+'user',{headers:headers});
  }

  getUser(id: string):Observable<any>{

    let token = this.checkToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin','*');

    return this._http.get(this.url+'user/'+id,{headers:headers});
  }

  deleteUser(id: string):Observable<any>{
    let token = this.checkToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin','*');

    return this._http.delete(this.url+'user/'+id,{headers:headers});
  }

  updateUser(user: User):Observable<any>{
    let body = {image: user.image, details:"Se modifico el perfil"};
    let token = this.checkToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin','*');

    return this._http.put(this.url+'user/'+user.id, body,{headers:headers});
  }

  checkToken(){
    const token = localStorage.getItem('token');

    if(!token){
      return "";
    }
    return token;
  }

  private setAuthentication(token:string): boolean {
    localStorage.setItem('token', token);
    return true;
  }
}
