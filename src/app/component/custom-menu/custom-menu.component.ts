import { Component,OnChanges,OnInit,OnDestroy,Input } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import {Observable} from 'rxjs';
import { filter,map ,mergeMap} from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.css']
})
export class CustomMenuComponent implements OnChanges,OnInit,OnDestroy {
	@Input() id:String;
	
	@Input() menuList : Array<any>;
	
	//@Input() curMenuArray:Array<any>;
	
	@Input() nzInlineCollapsed :Boolean;
	
	curMenuArray:Array<any>=[];
	
	//navigationEnd:Observable<NavigationEnd>;
	navigationEnd=null;
	
	
	getCurRouter(index:number,url:any,routeArray:Array<ActivatedRoute>):any{
		let _this=this;
		url=$.trim(url);
		for(let i=0;i<routeArray.length;i++){
			let item=routeArray[i];
			let childPath=$.trim(item.routeConfig.path).replace(/^\//,"").replace(/\/$/,"");
			if(url==childPath){
				//return item.routeConfig;
				_this.curMenuArray.push({index:index,key:item.routeConfig.data.key});
			}else{
				if(!/\/:/.test(childPath)){//如果没有参数
					let regExp1=new RegExp("^"+childPath+"/");
					if(regExp1.test(url)){
						let newUrl=url.replace(regExp1,"");
						if(item.children && item.children!=null && item.children.length>0){
							_this.getCurRouter(index+1,newUrl,item.children);
							//return _this.getCurRouter(++index,newUrl,item.children);
						}else{
							//return null;
							break;
						}
					}
				}else{//如果有参数(参数一定是最后一位的)
					childPath=childPath.replace(/\/:.{1,}$/,"");
					let regExp2=new RegExp("^"+childPath+"/");
					if(regExp2.test(url)){
						//return item.routeConfig;
						_this.curMenuArray.push({index:index,key:item.routeConfig.data.key});
					}
				}
			}
			
		}
	}
	
	
	//test="test;"
	getIsOpen(isOpen:boolean,key:any){
		if(isOpen==true){
			return true;
		}else{
			let menu = this.curMenuArray.filter(item=>{
				return item.key.toString()==key.toString();
			});
			if(menu && menu!=null && menu.length>0){
				return true;
			}
		}
		return false;
	}
	
	toUrl(path){
	let _this=this;
  	//替换冒号后的参数
  	//path=path.replace(/\/:(.{1,})$/,'/$1');
  	//path=path.replace(/\/:(.{1,})$/,"/"+eval(""));
  	let pathArr=path.split("/");
  	pathArr=pathArr.filter(item=>{
  		return /^:/.test(item);
  	});
  	if(pathArr && pathArr.length>0){
  		pathArr.forEach(item=>{
  			let param=item.replace(/^:/,"");
  			let value=eval("_this."+param);
  			if(value && value!=null){
  				var patt=new RegExp("\/:"+param);
  				path=path.replace(patt,"/"+value)
  			}
  		});
  	}
  	this.router.navigateByUrl("/"+path); 
  }
  
  menuOpenChange(index){
	  let myMenuList:Array<any>=this.menuList;
	  myMenuList.forEach(item=>{
		  item.data.isOpen=false;
	  });
	  myMenuList[index].data.isOpen=true;
	  this.menuList=myMenuList;
  }

  constructor(
  	private router: Router,
  	private activatedRoute: ActivatedRoute
  ) { }
	
	ngOnChanges(){
		let url=this.router.url.replace(/^\//,"").replace(/\/$/,"");
		let index=0;
		this.curMenuArray=[];
		this.curMenuArray.push({index:index,key:this.activatedRoute.routeConfig.data.key});
		this.getCurRouter(index,url,[this.activatedRoute]);
	}
	
  ngOnInit() {
  	
	let _this=this;
  	//this.id = this.route.snapshot.paramMap.get('id');
  	_this.nzInlineCollapsed=false;
	
	_this.navigationEnd=_this.router.events.pipe(
		filter(event=> event instanceof NavigationEnd),
		  map(event => _this.activatedRoute)/*,
		  map(route => {
		    while (route.firstChild) {route = route.firstChild};
		    return route;
		  }),
		  filter(route => route.outlet == 'primary'), 
		  mergeMap(route => route.data)*/
	).subscribe(data => {
		let url=_this.router.url.replace(/^\//,"").replace(/\/$/,"");
		let index=0;
		_this.curMenuArray=[];
		_this.curMenuArray.push({index:index,key:_this.activatedRoute.routeConfig.data.key});
		_this.getCurRouter(index,url,[_this.activatedRoute]);
		console.log(JSON.stringify(_this.curMenuArray));	
	});
	
  }
  
  ngOnDestroy(){
	  if(this.navigationEnd){
	  	this.navigationEnd.unsubscribe();
	  }
  }

}
