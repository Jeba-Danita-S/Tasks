import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http.get<any>(this.apiUrl)
    .pipe(map((res: any) => {
      return res
    }))
  }

  addUser(data: any) {
    return this.http.post<any>(this.apiUrl, data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  updateUser(userId: number, user: any) {
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(apiUrl, user)
    .pipe(map((res: any) => {
      return res
    }))
  }

  deleteUser(userId: number) {
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(apiUrl)
    .pipe(map((res: any) => {
      return res
    }))
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ListService {
//   private apiUrl = 'https://gorest.co.in/public/v1/users';

//   constructor(private http: HttpClient) { }

//   fetchUsers() {
//     return this.http.get<any>(this.apiUrl);
//   }

//   addUser(data: any){
//     return this.http.post<any>(this.apiUrl, data);
//   }

//   updateUser(userId: number, user: any) {
//     const apiUrl = `${this.apiUrl}/${userId}`;
//     return this.http.put<any>(apiUrl, user);
//   }

//   deleteUser(userId: number) {
//     const apiUrl = `${this.apiUrl}/${userId}`;
//     return this.http.delete<any>(apiUrl);
//   }

// }
