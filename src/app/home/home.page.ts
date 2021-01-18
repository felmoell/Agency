import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ImageGroup } from '../model/ImageGroup'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IonContent } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  private allImageGroups: ImageGroup[] = new Array<ImageGroup>();
  private allImageGroupsForFilter: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup1: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup2: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup3: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup4: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup5: ImageGroup[] = new Array<ImageGroup>();
  private ImageGroup6: ImageGroup[] = new Array<ImageGroup>();
  private Categories: String[] = new Array<String>();
  private PosOfSelectedImageGroup: number;

  private isLast: boolean;
  private isFirst: boolean;
  private myMap = new Map();
  public items = [];
  mySlideOptions = {
    pager: true,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1
  };

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private Router: Router,
    private platform: Platform
  ) {
    this.isFirst = true;
    this.isLast = false;
  }


  swipeNext() {
    this.slides.slideNext();
  }

  ngOnInit() {
    let loading: HTMLIonLoadingElement;
    this.loadingController.create({
      spinner: null,
      message: '<ion-img src="../../assets/1.gif"></ion-img>',
      cssClass: 'loader',

    }).then(res => {
      loading = res;
      loading.present();
      this.angularFireDatabase.list('/Pictures').valueChanges().subscribe((datas) => {
        // console.log(datas);
        this.allImageGroups = [];
        this.allImageGroupsForFilter = [];
        datas.forEach(elementItem => {
          if (this.Categories.includes(elementItem['Category'])) {

          } else {
            this.Categories.push(elementItem['Category']);
          }

          let t4 = new ImageGroup(elementItem['Name'], elementItem['Category']);
          t4.thumbnail = elementItem['Thumbnail'].toString();
          elementItem['Images'].forEach(element => {
            t4.links.push(element.toString());
          });
          this.allImageGroups.push(t4)
          this.allImageGroupsForFilter.push(t4)

        });

        this.allImageGroups.forEach((value, index) => {
          let tmp = index % 6;
          switch (tmp) {
            case 0:
              this.ImageGroup1.push(value);
              break;
            case 1:
              this.ImageGroup2.push(value);
              break;
            case 2:
              this.ImageGroup3.push(value);
              break;
            case 3:
              this.ImageGroup4.push(value);
              break;
            case 4:
              this.ImageGroup5.push(value);
              break;
            case 5:
              this.ImageGroup6.push(value);
              break;
            default:
              break
          }
        });
        this.Categories.forEach(element => {
          if (element == "All") {
            this.myMap.set("All", this.allImageGroups.length)
          } else {
            if (element.trim() !== '') {
              let t = this.allImageGroups.filter(term => {
                return term['Category'].toLowerCase().indexOf(element.trim().toLowerCase()) > -1;
              });
              this.myMap.set(element, t.length)
            }
          }
        });
        loading.dismiss();
        const obj = document.getElementById("count_Sport");
        //   this.animateValue(obj, 100, 0, 50000);
        //   console.log(this.myMap);
      }, (err) => {
        console.log("problem : ", err)
      })
      this.Categories = [
        "All",
      ]

    })


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
  closeMenu() {
    document.getElementById('header').style.zIndex = "1"
    let menu = document.getElementById('menu');
    menu.classList.remove('menu_visible');
    document.getElementById('menu-left').style.visibility = "hidden"
    document.getElementById('menu-right').style.visibility = "hidden"
    document.getElementById('close-btn-mobile').style.visibility = "hidden";
  }


  closeMenuMobile() {
    document.getElementById('header').style.zIndex = "1"
    let menu = document.getElementById('menu');
    menu.classList.remove('menu_visible');
    document.getElementById('menu-left').style.visibility = "hidden"
    document.getElementById('menu-right').style.visibility = "hidden"
    document.getElementById('close-btn-mobile').style.visibility = "hidden"

  }



  showCaru(ImageGroupItem: ImageGroup) {
    this.items = [];
    this.items = ImageGroupItem.links;
    document.getElementById('caru').style.visibility = "visible"
    document.getElementById('header').style.zIndex = "0"
    var eleme = document.getElementById('body');
    eleme.classList.add("content");
    this.content.scrollToTop(1100);
    let pos = document.getElementById('caru').getBoundingClientRect();
    this.PosOfSelectedImageGroup = pos.y;
    if (ImageGroupItem.links.length == 1) {
      this.isLast = true;
    }

  }
  closeCarusell() {
    let pos = document.getElementById('caru').getBoundingClientRect();
    document.getElementById('caru').style.visibility = "hidden"
    var eleme = document.getElementById('body');
    eleme.classList.remove("content");
    this.content.scrollToPoint(0, (this.PosOfSelectedImageGroup * -1), 1100);
    document.getElementById('header').style.zIndex = "01"
  }

  transition() {
    const button = document.getElementById("top");
    var id = button.getAttribute("id");
    var layerClass = "." + id + "-layer";
    var layers = document.querySelectorAll(layerClass);
    layers.forEach(element => {
      element.classList.toggle("active");
    });
  }


  setCatActive(item) {
    this.allImageGroups = this.allImageGroupsForFilter;
    if (item == "All") {
      this.allImageGroups = this.allImageGroupsForFilter;
      const frameZones = Array.from(document.getElementsByClassName("category_item"));
      frameZones.forEach(element => {
        element.classList.remove("category_item_active");
        element.classList.remove("category_item_inactive");
      });
    } else {
      if (item.trim() !== '') {
        this.allImageGroups = this.allImageGroups.filter(term => {
          return term['Category'].toLowerCase().indexOf(item.trim().toLowerCase()) > -1;
        });
      }
      const frameZones = Array.from(document.getElementsByClassName("category_item"));
      frameZones.forEach(element => {
        element.classList.remove("category_item_active");
        element.classList.remove("category_item_inactive");
      });

      frameZones.forEach(element => {
        if (element.id == 'category_item_' + item) {
          console.log("IS");
          element.classList.add("category_item_active");
        } else {
          element.classList.add("category_item_inactive");
        }
      });
    }
    this.ImageGroup1 = [];
    this.ImageGroup2 = [];
    this.ImageGroup3 = [];
    this.ImageGroup4 = [];
    this.ImageGroup5 = [];
    this.ImageGroup6 = [];

    this.allImageGroups.forEach((value, index) => {
      let tmp = index % 6;
      switch (tmp) {
        case 0:
          this.ImageGroup1.push(value);
          break;
        case 1:
          this.ImageGroup2.push(value);
          break;
        case 2:
          this.ImageGroup3.push(value);
          break;
        case 3:
          this.ImageGroup4.push(value);
          break;
        case 4:
          this.ImageGroup5.push(value);
          break;
        case 5:
          this.ImageGroup6.push(value);
          break;
        default:
          break
      }
    });
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


  animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }








  navToFotos() {
    this.Router.navigate(['fotos']);
  }
  navToVideos() {
    this.Router.navigate(['videos']);
  }
  navToHome() {
    this.Router.navigate(['/contact']);
  }

}
