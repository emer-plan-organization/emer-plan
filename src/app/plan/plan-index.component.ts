import { Component, OnInit ,OnDestroy} from '@angular/core';
import {planRoutes} from '../router'

import { Router,ActivatedRoute ,NavigationEnd } from '@angular/router';

import {Observable} from 'rxjs';
import { filter,map ,mergeMap} from 'rxjs/operators';


@Component({
  selector: 'app-plan-index',
  templateUrl: './plan-index.component.html',
  styleUrls: ['./plan-index.component.css']
})

export class PlanIndexComponent implements OnInit,OnDestroy {
	//id = 'abc';
	id="";
  isCollapsed = false;
  
  menuList=planRoutes;
  
  navEnd:Observable<NavigationEnd>;
  
  navEndSubscribe=null;
  
  constructor(
  	private router: Router,
  	private activatedRoute: ActivatedRoute
  ) { 
  	/*this.navEnd=this.router.events.pipe(
  		filter(event=> event instanceof NavigationEnd),
		  map(event => this.activatedRoute),
		  map(route => {
		    while (route.firstChild) {route = route.firstChild};
		    return route;
		  }),
		  filter(route => route.outlet == 'prmary'), 
		  mergeMap(route => route.data)
  	) as Observable<NavigationEnd>*/
  	
  }
	ngOnInit() : void{
  	//this.id = this.activatedRoute.snapshot.paramMap.get('id');
		let urlValues = this.router.url.split("/");
		if(urlValues && urlValues!=null && urlValues.length>0){
			this.id=urlValues[urlValues.length-1];
		}
  	//订阅放在onInit中执行是获取本次路由信息
  	/*
  	this.navEndSubscribe=this.router.events.pipe(
  		filter(event=> event instanceof NavigationEnd),
		  map(event => this.activatedRoute),
		  map(route => {
		    while (route.firstChild) {route = route.firstChild};
		    return route;
		  }),
		  filter(route => route.outlet == 'primary'), 
		  mergeMap(route => route.data)
  	).subscribe(data => {
  		
  		console.log(data);	
  	});
  	*/
  }
  
  ngOnDestroy(){
  	
  	//把最后一个订阅删了
  	/*if(this.router.events.observers && this.router.events.observers.length>3){
  		//this.router.events.observers.splice(this.router.events.observers.length-1,1);
  		this.router.events.observers[this.router.events.observers.length-1].unsubscribe();
  	}
  	//订阅放在destroy中执行是获取上次路由信息
  	this.navEndSubscribe=this.router.events.pipe(
  		filter(event=> event instanceof NavigationEnd),
		  map(event => this.activatedRoute),
		  map(route => {
		    while (route.firstChild) {route = route.firstChild};
		    return route;
		  }),
		  filter(route => route.outlet == 'primary'), 
		  mergeMap(route => route.data)
  	).subscribe(data => {
  		
  		console.log(data);	
  	});*/
  	
  	/*if(this.navEndSubscribe){
  		this.navEndSubscribe.unsubscribe();
  	}*/
  }

}
