import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(private Router: Router,) {
    document.getElementById("header").style.backgroundColor = "white";
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
