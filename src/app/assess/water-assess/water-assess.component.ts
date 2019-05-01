import { Component, OnInit } from '@angular/core';
import {NzMessageService,NzModalService } from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-water-assess',
  templateUrl: './water-assess.component.html',
  styleUrls: ['./water-assess.component.css'],
	providers: [HttpClientService]
})
export class WaterAssessComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService,
	private modal:NzModalService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:any={};
	
	totalScoreSalculate(){
		let num=0;
		let _this=this;
		for(let i=0;i<this.tableData.evaluateDetails.length;i++){
			let design=this.tableData.evaluateDetails[i].basisList;
			for(let j=0;j<design.length;j++){
				num+=Number(design[j].actualScore)
			}
		}
		_this.tableData.totalScore=num>70?70:num;
	}
	
	levelValueCalculate(){
		let _this=this;
		_this.httpClientService.post("ecp","riskAssassment.getCraftsProcessInfo", {projectId: _this.id, userId: 1})
		.then(function(data:any){
			_this.totalScoreSalculate();
			 _this.tableData.levelValue=Number((Number(_this.tableData.totalScore)+Number(data.score)).toFixed(2).toString().replace(/(\.)?0{1,}$/, ''));
			 if(_this.tableData.levelValue.toFixed(2)<25){
			  	_this.tableData.levelType="M1";
			 }else if(25<=_this.tableData.levelValue.toFixed(2)&&_this.tableData.levelValue.toFixed(2)<45){
			  	_this.tableData.levelType="M2";
			 }else if(45<=_this.tableData.levelValue.toFixed(2)&&_this.tableData.levelValue.toFixed(2)<65){
			  	_this.tableData.levelType="M3";
			 }else if(_this.tableData.levelValue.toFixed(2)>=65){
			  	_this.tableData.levelType="M4";
			 }
		},function(err){
		});
	}
	
	onEvaluateResultChange(item,index,cIndex,value){
		let _this=this;
		//let evaluate=_this.tableData.evaluateDetails[i];
		if(index==0){
			if(item.basisList.filter(myItem=>{return myItem.evaluateResult=="0" || myItem.evaluateResult=="1"}).length+1==item.basisList.length){
				if(item.basisList.filter(myItem=>{return myItem.evaluateResult=="0"}).length>0){
					item.basisList[1].actualScore=8;
				}else{
					item.basisList[1].actualScore=0;
				}
			}
		}else if(index==1){
			if(item.basisList.filter(myItem=>{return myItem.evaluateResult=="0" || myItem.evaluateResult=="1"}).length==item.basisList.length){
				if(item.basisList.filter(myItem=>{return myItem.evaluateResult=="0"}).length>0){
					item.basisList[0].actualScore=8;
				}else{
					item.basisList[0].actualScore=0;
				}
			}
		}else if(index==2){
			if(cIndex==0){
				if(item.basisList[cIndex].evaluateResult=="1"){
					item.basisList = item.basisList.map((myItem,myIndex) => {
						if(myIndex>0){
							return {
								...myItem,
								evaluateResult: "0"
							};
						}else{
							return myItem;
						}
					});
				}
			}
			if(item.basisList.filter((myItem)=>{return myItem.evaluateResult=="0" || myItem.evaluateResult=="1"}).length==item.basisList.length){
				if(item.basisList.filter((myItem,myIndex)=>{return myIndex>0 && myItem.evaluateResult=="0"}).length>0){
					item.basisList[0].actualScore=8;
				}else{
					item.basisList[0].actualScore=0;
				}
			}
		} else if(index==3){
			if(item.basisList.filter((myItem)=>{return myItem.evaluateResult=="0" || myItem.evaluateResult=="1"}).length==item.basisList.length){
				if(
					item.basisList.filter((myItem,myIndex)=>{return myIndex<item.basisList.length-1 && myItem.evaluateResult=="0"}).length>0
					||item.basisList[item.basisList.length-1].evaluateResult=="1"
				){
					item.basisList[0].actualScore=8;
				}else{
					item.basisList[0].actualScore=0;
				}
			}
		}else if(index==4){
			if(cIndex==0){
				if(item.basisList[cIndex].evaluateResult=="1"){
					item.basisList = item.basisList.map((myItem,myIndex) => {
						if(myIndex>1){
							return {
								...myItem,
								evaluateResult: "0"
							};
						}else{
							return myItem;
						}
					});
				}
			}
			if(item.basisList[0].evaluateResult=="1" ){
				item.basisList[0].actualScore=0;
			}else if (item.basisList[0].evaluateResult=="0"){
				if(item.basisList[item.basisList.length-1].evaluateResult=="0" && item.basisList.filter((myItem,myIndex)=>{return myIndex>1 && myIndex!=item.basisList.length-1 &&myItem.evaluateResult=="1" }).length==item.basisList.length-3){
					item.basisList[0].actualScore=0;
				}else{
					item.basisList[0].actualScore=8;
				}
			}
			
		} else if(index==5){
			if(cIndex==0){
				if(item.basisList[cIndex].evaluateResult=="1"){
					item.basisList.forEach((myItem,myIndex)=>{
						if(myIndex!=0){
							myItem.evaluateResult="0";
						}
					});
				}
			}else{
				if(item.basisList[cIndex].evaluateResult=="1"){
					if(item.basisList.filter((myItem,myIndex)=>{return myIndex!=0 && myItem.evaluateResult=="1"}).length>1){
						_this.modal.confirm({
							nzTitle: '提示！',
							nzContent: '废水不能有多个排放去向',
							nzOnOk: () =>{
								item.basisList[cIndex].evaluateResult="0";
							}
						});
					}
				}else if(item.basisList[cIndex].evaluateResult="0"){
					if(item.basisList.filter((myItem,myIndex)=>{return myIndex!=0 && myItem.evaluateResult=="0"}).length==item.basisList.length-1){
						_this.modal.confirm({
							nzTitle: '提示！',
							nzContent: '请选择一个废水排放去向',
							nzOnOk: () =>{
								item.basisList[cIndex].evaluateResult="1";
							}
						});
					}
				}
			}
			if(item.basisList[0].evaluateResult=="1"){
				item.basisList[0].actualScore=0;
			}else if(item.basisList[0].evaluateResult=="0"){
				if(item.basisList[1].evaluateResult=="1"||item.basisList[2].evaluateResult=="1"||item.basisList[3].evaluateResult=="1"){
					item.basisList[0].actualScore=6;
				}else if(item.basisList[4].evaluateResult=="1"
						||item.basisList[5].evaluateResult=="1"
						||item.basisList[6].evaluateResult=="1"
						||item.basisList[7].evaluateResult=="1"
					){
					item.basisList[0].actualScore=12;
				}else{
					item.basisList[0].actualScore=0;
				}
			}
			
		}else if(index==6){
			if(cIndex==0){
				if(item.basisList[cIndex].evaluateResult=="1"){
					item.basisList = item.basisList.map((myItem,myIndex) => {
						if(myIndex>0){
							return {
								...myItem,
								evaluateResult: "0"
							};
						}else{
							return myItem;
						}
					});
				}
			}
			if(item.basisList.filter((myItem)=>{return myItem.evaluateResult=="0" || myItem.evaluateResult=="1"}).length==item.basisList.length){
				if(item.basisList[0].evaluateResult=="1"){
					item.basisList[0].actualScore=0;
				}else if(item.basisList[0].evaluateResult=="0"){
					if(item.basisList.filter((myItem,myIndex)=>{return myIndex>1 && myItem.evaluateResult=="1"}).length>0){
						item.basisList[0].actualScore=10;
					}else{
						item.basisList[0].actualScore=0;
					}
				}
			}
		}else if(index==7){
			
			if(cIndex<3){
				if(item.basisList[cIndex].evaluateResult=="1"){
					item.basisList[3].evaluateResult="0";
				}else if(item.basisList[cIndex].evaluateResult=="0"){
					if(
					item.basisList[0].evaluateResult=="0"
					&& item.basisList[1].evaluateResult=="0"
					&& item.basisList[2].evaluateResult=="0"
					){
						item.basisList[3].evaluateResult="1";
					}
				}
			}
			item.basisList = item.basisList.map((myItem,myIndex) => {
				if(myItem.evaluateResult==null){
					return myItem;
				}else if(myItem.evaluateResult=="0"){
					return {
						...myItem,
						actualScore: 0
					}
				}else if(myItem.evaluateResult=="1"){
					return {
						...myItem,
						actualScore: myItem.score
					}
				}else{
					return myItem;
				}
			});
		}
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateWaterEvaluate",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	next(){
		let _this=this;
		_this.isPassValid = true;
		if(_this.isPassValid){
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			_this.httpClientService.post("ecp","riskAssassment.updateWaterEvaluate",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/calculate/gasDivide/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getWaterEvaluate", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data;
		  }, function (err) {
		    _this.message.error(err);
		  });
			
	}
	
	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
	}
}
