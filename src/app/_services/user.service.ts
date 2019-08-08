import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    verify(user: User) {
        return this.http.post(`${environment.apiUrl}/users/verify`, user);
        console.log(User);
    }

    grantor(user: User) {
        return this.http.post(`${environment.apiUrl}/users/grantor`, user);
        console.log(User);
    }

    administrator(user: User) {
        return this.http.post(`${environment.apiUrl}/users/administrator`, user);
        console.log(User);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
