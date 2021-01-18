import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactForm;
  constructor(private formBuilder: FormBuilder,) {   
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
     /**/
  }


  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      request: ''
    });


  }

}
