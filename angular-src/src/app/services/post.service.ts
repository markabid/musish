import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  post: any;

  constructor(private http: Http) { }

  savePost(post){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/post', post, {headers: headers})
      .map(res => res.json());
  }
}
