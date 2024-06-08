import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Global } from 'src/app/home/services/global';
import { LoginResponse } from 'src/app/interfaces/login-response.interface';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }


  login(email: string, password: string): Observable<any>{
    const url  = `${ this.url }auth/login`;

    const headers = new HttpHeaders()
      .set('Content-Type', `application/json`)
      .set('Access-Control-Allow-Origin', `*`);

    let body = {username: email, password};

    return this._http.post<LoginResponse>( url, body, {headers} )
      .pipe(
        map( ({ token }) => this.setAuthentication( token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  private setAuthentication(token:string): boolean {
    localStorage.setItem('token', token);
    return true;
  }
}
