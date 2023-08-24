import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() : any {
    return this.http.get('https://dummyjson.com/users?select=id,firstName,lastName,gender,age')
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`https://dummyjson.com/users/${id}`)
  }

  getDataById(id: number): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/${id}?select=id,firstName,lastName,gender,age`)
  }

  updateDataById(id: number, user: User): Observable<any> {
    return this.http.put(`https://dummyjson.com/users/${id}`, user)
  }

  addData(user: User): Observable<any> {
    return this.http.post(`https://dummyjson.com/users/add`, {firstName: user.firstName, lastName: user.lastName, gender: user.gender, age: user.age})
  }
}
