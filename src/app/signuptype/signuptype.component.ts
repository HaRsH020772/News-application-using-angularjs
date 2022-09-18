import { Component, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuptype',
  templateUrl: './signuptype.component.html',
  styleUrls: ['./signuptype.component.css']
})
export class SignuptypeComponent implements OnInit {
//main branch

  constructor(private toast : NgToastService,private user:AppComponent,private cookieService:CookieService,private router:Router) 
  {}

  ngOnInit(): void {
    setInterval(this.trialFunction,2000);
  }

  trialFunction()
  {
    let topics = ['Sports','Entertainment','Science','Technology','General','Health'];
    const tag = <HTMLElement> document.getElementById('companyLine');
    tag.innerHTML = `${topics[Math.floor(Math.random() * 6)]}`;
  }

  //Saving data to database sign-up data
  async saveMyData(userInfoObj:any)
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

    this.user.saveSignupDetail(userInfoObj).subscribe(item => {
      const myDate = new Date;
      myDate.setHours(myDate.getHours() + 1);
      this.cookieService.set("accessToken",item.tokens[0].token,{expires:myDate});
      this.router.navigate(['/main']);
    }); 
  }

}
