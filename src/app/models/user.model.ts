export class User{
  constructor(
    public username: string,
    public password?:string,
    public password2?:string,
    public details?:string,
    public rol?: string,
    public creationDate?:string,
    public image?:string,
    public id?: string,
  ){

  }
}
