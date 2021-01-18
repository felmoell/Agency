import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})


export class StartPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;

  public items = [

  ];
  private isLast: boolean;
  private isFirst: boolean;

  mySlideOptions = {
    pager: true,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1,
    speed: 400
  };
  constructor(private router: Router,) {
    this.items = [
      "https://images.pexels.com/photos/4323320/pexels-photo-4323320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323332/pexels-photo-4323332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323287/pexels-photo-4323287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323320/pexels-photo-4323320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323332/pexels-photo-4323332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323287/pexels-photo-4323287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323320/pexels-photo-4323320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323332/pexels-photo-4323332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4323287/pexels-photo-4323287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ]
    this.isFirst = true;
    this.isLast = false;
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  public navToStart() {
    this.router.navigate(['']);
  }
  ngOnInit() {
  }

  swipeNext() {
    this.slides.slideNext();
  }
  slideChanged() {

    this.slides.isBeginning().then(res => {
      if (res) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
    });
    this.slides.isEnd().then(res => {
      if (res) {
        this.isLast = true;
      } else {
        this.isLast = false;
      }
    });
  }
}
