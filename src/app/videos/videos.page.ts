import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IonContent } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Video } from '../model/Video';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  private allVideos: Video[] = new Array<Video>();
  private allVideosForFilter: Video[] = new Array<Video>();
  private Categories: String[] = new Array<String>();

  private VideoGroup1: Video[] = new Array<Video>();
  private VideoGroup2: Video[] = new Array<Video>();
  private VideoGroup3: Video[] = new Array<Video>();
  private VideoGroup4: Video[] = new Array<Video>();
  constructor(private storage: AngularFireStorage,
    private database: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private Router: Router) { 

      document.getElementById("header").style.backgroundColor = "white";
      const header_links =Array.from( document.getElementsByClassName("header_link"));
      header_links.forEach(element => {
        element['style'].color = "black";
      });
  
      const logos =Array.from( document.getElementsByClassName("logo"));
      logos.forEach(element => {
        element['style'].visibility = "visible";
      });
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
      this.angularFireDatabase.list('/Videos').valueChanges().subscribe((datas) => {
        this.allVideos = [];
        this.allVideosForFilter = [];
        datas.forEach(elementItem => {

          if (this.Categories.includes(elementItem['Category'])) {

          } else {
            this.Categories.push(elementItem['Category']);
          }

          let t4 = new Video(elementItem['Name'], elementItem['Category']);
          t4.Source = elementItem['Source'].toString();

          this.allVideos.push(t4)
          this.allVideosForFilter.push(t4)
        });
        this.allVideos.forEach((value, index) => {
          let tmp = index % 4;
          switch (tmp) {
            case 0:
              this.VideoGroup1.push(value);
              break;
            case 1:
              this.VideoGroup2.push(value);
              break;
            case 2:
              this.VideoGroup3.push(value);
              break;
            case 3:
              this.VideoGroup4.push(value);
              break;
            default:
              break
          }
        });

      })
      console.log(this.VideoGroup1);
      console.log(this.VideoGroup2);
      console.log(this.VideoGroup3);
      console.log(this.VideoGroup4);

      loading.dismiss();
    })
  }
}
