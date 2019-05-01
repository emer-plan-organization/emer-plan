import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-craft-process',
  templateUrl: './craft-process.component.html',
  styleUrls: ['./craft-process.component.css'],
	providers: [HttpClientService]
})
export class CraftProcessComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	
	id = "";
	isPassValid: boolean = true;
	tableData:any={};
	unitNameList:Array<any>=[];
	
	scoreCalculate(){
		let result=0;
		let pattNum = new RegExp("^(-)?[0-9]{1,}$")
		this.tableData.craftsDetails.forEach(item=>{
			if(pattNum.test(item.setsNumber) && pattNum.test(item.basicScore)){
				result+=(parseFloat(item.setsNumber)*parseFloat(item.basicScore));
			}
		});
		this.tableData.score=result>30?30:result.toFixed(2);
	}

	getUnitNameList(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpCommon.getEnvironmentalRiskUnit",{projectId:_this.id})
		.then(function(data:any){
			_this.unitNameList=data;
		},function(err){});
	}
	
  save(){
  	let _this=this;
  	let submitData:any=new Object();
		_this.restoreTableData();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updateCraftsProcessInfo",submitData)
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
			_this.restoreTableData();
  		let submitData:any=new Object();
  		submitData.projectId=_this.id;
  		submitData.userId=1;
  		submitData.jsonData=_this.tableData;
  		_this.httpClientService.post("ecp","riskAssassment.updateCraftsProcessInfo",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/calculate/gasAssess/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
	
	splitField(value){
		if(value==null || value==""){
			return [];
		}else{
			return value.split(";");
		}
	}
	
	trunTableData(){
	  let _this=this;
	  _this.tableData.craftsDetails.forEach(item=>{
			item.unitNameArray=_this.splitField(item.unitName);
	  });
	}
	
	restoreTableData(){
	  let _this=this;
	  _this.tableData.craftsDetails.forEach(item=>{
			item.unitName=item.unitNameArray.join(";");
	  });
	}
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getCraftsProcessInfo", {projectId: _this.id, userId: 1})
  	  .then(function (data: any) {
  	    _this.tableData = data;
				_this.trunTableData();
  	  }, function (err) {
  	    _this.message.error(err);
  	  });
			
		_this.getUnitNameList();
  }
  
  ngOnInit() {
  	this.id = this.activatedRoute.snapshot.paramMap.get('id');
  	this.initData();
  }

}
