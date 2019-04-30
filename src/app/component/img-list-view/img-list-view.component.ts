import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-img-list-view',
  templateUrl: './img-list-view.component.html',
  styleUrls: ['./img-list-view.component.css']
})
export class ImgListViewComponent implements OnInit {
	//private _imgList=[];

	@Input() imgList : Array<Object>;
	/*@Input()
	set imgList(imgList : Array<Object>){
		this.imgList=name||null;
	}*/
	
	@Output() delImgCallbackFuc=new EventEmitter<Object>();
	
	curImg=null;
	
	showImg(img:Object){
		this.curImg=img;
	}
	
	delImgFuc(img:boolean){
		this.delImgCallbackFuc.emit(img);
	}
	
  constructor() { }

  ngOnInit() {
  	this.curImg=null;
  }

}
