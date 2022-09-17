import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//app component
export class AppComponent 
{
  title = 'newsnation';
  private readonly apiKey = 'bf50514169eb4f8686afc94ffbc929ec';
  constructor(private http:HttpClient)
  {}

  getDataFromLink(fav:string):Observable<any>
  {
    const link = `https://newsapi.org/v2/top-headlines?country=in&category=${fav}&apiKey=${this.apiKey}`;
    const response = this.http.get(link);
    return response;
  }

  getDataFromLinkUsingQuery(fav:string):Observable<any>
  {
    const link = `https://newsapi.org/v2/everything?q=${fav}&apiKey=${this.apiKey}`;
    const response = this.http.get(link);
    return response;
  }

}