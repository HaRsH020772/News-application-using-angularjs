import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-mainnews',
  templateUrl: './mainnews.component.html',
  styleUrls: ['./mainnews.component.css']
})
export class MainnewsComponent implements OnInit
 {
  data: any = [];
  switcher: string = "general";
  recognitionSvc = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition; 
  recognition = new this.recognitionSvc();

  constructor(private user: AppComponent) 
  {}

  ngOnInit(): void {
    this.user.getDataFromLink(this.switcher).subscribe(item => {
      this.data = item.articles;
    });
  }
//toggle menu for hamburger menu
  toggleMenu() {

    let element: HTMLElement | null = document.getElementById('navList');

    if (element != undefined) {
      if (element.style.display === "none")
        element.style.display = 'block';
      else
        element.style.display = "none";
    }
  }
//get data from navbar clicks
  getDataFromClick(e: any) {
    this.switcher = e.target.innerText;
    this.user.getDataFromLink(this.switcher).subscribe(item => {
      this.data = item.articles;
    });

    let links = document.querySelectorAll('.links');
    links.forEach(element => {
      element.classList.remove('bg-purple-700');
    });

    e.target.classList.add('bg-purple-700');
  }
//get data from searh field
  getDataFromSearch(e: any)
  {
    let links = document.querySelectorAll('.links');
    links.forEach(element => {
      element.classList.remove('bg-purple-700');
    });

    const getSearchValue = (<HTMLInputElement>document.getElementById('voice-search'));
    this.user.getDataFromLinkUsingQuery(getSearchValue.value).subscribe(item => {
      this.data = item.articles;
    });

    getSearchValue.value = '';

  }
//Share the news via social media
  shareNews(e: any) 
  {
    const shareData = {
      url: e.target.parentNode.previousSibling.href,
      title: e.target.parentNode.parentNode.previousSibling.innerText,
      text: e.target.parentNode.parentNode.previousSibling.previousSibling.innerText
    }

    if (shareData !== undefined)
      if (navigator.share) {
        navigator.share(shareData).then(() => console.log('Working'))
          .catch((err) => console.log(err));
      }
  }

  getMyWords()
  {
    const getSearchValue = (<HTMLInputElement>document.getElementById('voice-search'));
    const searchBtn = document.querySelector('#voiceSearch');

    this.recognition.lang = 'en-IN';
    this.recognition.continuous = true;

    this.recognition.onresult = (event:any) => {
      const accumulatedResult = [];
      for(const result of event.results)
        accumulatedResult.push(`${result[0].transcript}`);

      getSearchValue.value = accumulatedResult[0];
    };

    if(searchBtn?.classList.contains('listening'))
      this.recognition.stop();
    else
      this.recognition.start();
    
    searchBtn?.classList.toggle('listening');
  }

}
