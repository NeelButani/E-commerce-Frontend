import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{

  selectedImage : string;

  @Input() images : string[];


  ngOnInit(): void {
    if(this.images.length){
      this.selectedImage = this.images[0]
    }
      console.log(this.images);
  }
 

  changeSelectedImage(image){
    this.selectedImage = image
  }

  get hasImages(){
    return this.images?.length > 0
  }
}
