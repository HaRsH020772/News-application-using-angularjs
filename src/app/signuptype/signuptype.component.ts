import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signuptype',
  templateUrl: './signuptype.component.html',
  styleUrls: ['./signuptype.component.css']
})
export class SignuptypeComponent implements OnInit {
//main branch

  constructor(private toast : NgToastService,private http:HttpClient,private cookieService:CookieService) 
  {

  }

  ngOnInit(): void {
    setInterval(this.trialFunction,2000);
  }

  trialFunction()
  {
    let topics = ['Sports','Entertainment','Science','Technology','General','Health'];
    const tag = <HTMLElement> document.getElementById('companyLine');
    tag.innerHTML = `${topics[Math.floor(Math.random() * 6)]}`;
  }

  saveMyData(userInfoObj:any)
  {
    for (let key in userInfoObj)
      if(userInfoObj[key] == '')
      {
        this.toast.error({detail:"Error-Message",summary:"Fill the details!!",duration:5000});
        return;
      }
    
    if(userInfoObj.password !== userInfoObj.cPassword)
    {
      this.toast.error({detail:"Error-Message",summary:"Password not match!!",duration:5000});
      return;
    }

    const link = 'http://localhost:1771/our-client/user-signup';
    const response:any = this.http.post(link,userInfoObj).subscribe(item => {
      console.log(item);
    });

    // console.log(response['email']);

    // this.cookieService.set("accessToken",response.tokens[0].token);

    // console.log(response);
  }

}
