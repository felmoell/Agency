import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { element } from 'protractor';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('slides') slides: IonSlides;
  @ViewChild('CustomerSlides') CustomerSlides: IonSlides;
  private isLast;
  private isFirst;
  private isLastCustomer;
  private isFirstCustomer;
  private allCustomers: String[] = new Array<String>();
  constructor(
    private platform: Platform,
    private Router: Router,
    private animationCtrl: AnimationController,
    private loadingController: LoadingController,) {
    this.allCustomers = [
      "../../assets/customers/logo-25.svg",
      "../../assets/customers/logo-26.svg",
      "../../assets/customers/logo-8.svg",
      "../../assets/customers/logo-9.svg",
      "../../assets/customers/logo-10.svg",
      "../../assets/customers/logo-12.svg",
      "../../assets/customers/logo-19.svg",
      "../../assets/customers/logo-20.svg",
      "../../assets/customers/logo-23.svg",
      "../../assets/customers/logo-24.svg",
    ];
    
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  slideOptsCustomer = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 5,
  };

  ngOnInit() {
    let loading: HTMLIonLoadingElement;
    this.loadingController.create({}).then(res => {
      loading = res;
      loading.present();
      loading.dismiss();
    })
  }

  getScrollPosition(){   
   
    document.getElementById("header").style.backgroundColor = "white";
    document.getElementById("header").style.boxShadow = "0 0 1px";
    const header_links =Array.from( document.getElementsByClassName("header_link"));
    header_links.forEach(element => {
      element['style'].color = "black";
    });

    const logos =Array.from( document.getElementsByClassName("logo"));
    logos.forEach(element => {
      element['style'].visibility = "visible";
    });
  }

  startPage() {
    let t = window.outerHeight;
    this.content.scrollToPoint(0, t - document.getElementById("header").offsetHeight +30 , 1100);
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


  slideChangedCustomer() {
    this.CustomerSlides.isBeginning().then(res => {
      if (res) {
        this.isFirstCustomer = true;
      } else {
        this.isFirstCustomer = false;
      }
    });
    this.CustomerSlides.isEnd().then(res => {
      if (res) {
        this.isLastCustomer = true;
      } else {
        this.isLastCustomer = false;
      }
    });
  }
}
