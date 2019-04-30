import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient,HttpParams } from '@angular/common/http';
//import { HttpErrorHandler, HandleError } from '../core/http-error-handler';

const httpOptions={
	headers: new HttpHeaders({
		'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
		'x-requested-with':'XMLHttpRequest',
		'Access-Control-Allow-Origin':"*",
		/*'Accept':'application/json'*/
	})
};

const httpOptions1={
	headers: new HttpHeaders({
		'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
	})
};

/*const Section = {
    anhuanjia: {
        url: 'http://wangqiuyi.ahj.com/cms/',
        desc: '安环家主要接口'
    },
    rdhy: {
        url: 'http://chengxingwei.ahj.com/sub-contract/execute',
        desc: '人单合一接口'
    },
    account: {
        url: 'http://account.ahj.com/',
        desc: '账号服务'
    },
    ecp:{
    	url:'http://192.168.1.23/',
    	desc:'环责险后台接口'

    },
    ecpNginx:{
    	url:'http://192.168.7.28/ecp/',
    	desc:'环责险后台接口(nginx反向代理)'

    },
    ahj:{
    	url:'https://api.anhuanjia.com/',
    	desc:'安环家'

    }
};*/

@Injectable()
export class HttpClientService{
	constructor(
    	private http: HttpClient
	) {}
	
	post (section, method, params) {
		let dc = new HttpParams().set("_METHOD",method).set("_DATA",JSON.stringify(params));
		//let dc = { _METHOD: method, _DATA: JSON.stringify(params) };
		return new Promise((resolve, reject) => {
			//this.http.post(Section[section]['url'] + "execute",dc,httpOptions)
			this.http.post("/"+section + "/execute",dc,httpOptions)
			.subscribe(
				(res:any)=>{
					if(res.code==2000){
						resolve(res.data);
					}else if(res.code==4000|| res.code==5000){
		        		reject(res.message);
		        	}else if(res.code==6000){
		        		//未登陆，跳转登陆界面
		        		reject(res.message);
		        	}else{
		        		reject("未知错误")
		        	}
					
				},error=>{
					reject("系统错误");
				}
			)
		});
	}
	
	nomalPost (section, method, params) {
		//let dc = { _METHOD: method, _DATA: JSON.stringify(params) };
		let dc = new HttpParams().set("_METHOD",method).set("_DATA",JSON.stringify(params));
		return new Promise((resolve, reject) => {
			//this.http.post(Section[section]['url'] + "execute",dc,httpOptions)
			this.http.post("/"+section + "/execute",dc,httpOptions)
			.subscribe(
				(res:any)=>{
					/*let jsonRes=eval("("+JSON.stringify(res)+")");
					if(jsonRes.data._SCRIPT){
						eval(jsonRes.data._SCRIPT);
					}
					resolve(jsonRes.data.data);*/
					/*if(res.data._SCRIPT){
						eval(res.data._SCRIPT);
					}*/
					if(res==null){
						reject("系统错误");
					}else{
						resolve(res.data);
					}
					
				},error=>{
					reject("系统错误");
				}
			)
		});
	}
	
	testPost () {
		return new Promise((resolve, reject) => {
			let dc = new HttpParams().set("_METHOD","CodeSourceExecutor.fetch").set("_DATA",JSON.stringify({CodeType: "District",ConditionField: "TreeLevel",ConditionValue: "1"}));
			this.http.post('https://api.anhuanjia.com/execute',dc,httpOptions)
			.subscribe(
				(res:any)=>{
					if(res==null){
						reject("系统错误");
					}else{
						resolve(res.data.data);
					}
					
				},error=>{
					reject("系统错误");
				}
			)
		});
	}
	testPost1 () {
		//let data=serializeData({name:'admin'});//serializeData
		let params = new HttpParams().set("name","admin");
		return new Promise((resolve, reject) => {
			this.http.post('/assets/mytest/test',params,httpOptions1)
			.subscribe(
				(res:any)=>{
					if(res==null){
						reject("系统错误");
					}else{
						resolve(res);
					}
					
				},error=>{
					reject("系统错误");
				}
			)
		});
	}
}