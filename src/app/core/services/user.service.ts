import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class UserService {
  serviceApiUrl = environment . apiUrl + '/user' ;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.serviceApiUrl}`);
  }

  getUser(id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}`);
  }

  getUserHeadings (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/heading`);
  }

  getUserHeadingItems (id: string, heaid: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/heading/${heaid}/item`);
  }

  getWarehouse (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/warehouse`);
  }

  getAwaitingNotifNum (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/awaitingNotifNum`);
  }

  getAwaitingNotifs (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/awaitingNotifs`);
  }

  ackNotif (id: string, nid: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/notification/${nid}/acknowledge`);
  }

  putUser(content: string) {
    return this.http.put(`${this.serviceApiUrl}`, `${content}`, httpOptions) ;
  }

  postUser(content: string) {
    return this.http.post(`${this.serviceApiUrl}`, `${content}`, httpOptions) ;
  }

  patchUser(id: string, content: string) {
    return this.http.patch(`${this.serviceApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.serviceApiUrl}/${id}`) ;
  }

  isAdmin (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/isAdmin`);
  }

  getUserStats (id: string) {
    return this.http.get(`${this.serviceApiUrl}/${id}/stat`);
  }
}