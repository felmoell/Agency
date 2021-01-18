import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor() {
    document.getElementById("header").style.backgroundColor = "white";
    document.getElementById("header").style.boxShadow = "0 0 1px";
    const header_links = Array.from(document.getElementsByClassName("header_link"));
    header_links.forEach(element => {
      element['style'].color = "black";
    });
    
    const logos = Array.from(document.getElementsByClassName("logo"));
    logos.forEach(element => {
      element['style'].visibility = "visible";
    });
   }

  ngOnInit() {

  }

}
