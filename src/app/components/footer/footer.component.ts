import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {     
        var cookiePair = cookieArr[i].split("=");
        if("acceted_cookie_schmolles_agency" == cookiePair[0].trim()) {    
            if(decodeURIComponent(cookiePair[1]) == "True"){
              document.getElementById('footer').style.visibility ="hidden";
            }           
        }
    }
  }
  acceptCookies(){
    document.getElementById('footer').style.visibility ="hidden";
    document.cookie = "acceted_cookie_schmolles_agency=True";
  }
}
