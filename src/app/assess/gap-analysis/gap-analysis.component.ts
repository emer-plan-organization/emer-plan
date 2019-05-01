import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-gap-analysis',
  templateUrl: './gap-analysis.component.html',
  styleUrls: ['./gap-analysis.component.css'],
	providers: [HttpClientService]
})
export class GapAnalysisComponent implements OnInit {

  constructor
	(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	
	getEmptyOneChildrenTableData(){
		return {
			itemId:"",
			itemContent:"",
			problem:"",
			checkResultDesc:"",
			have:"",
			id:"",
			needFix:"",
			governPeriod:"",
			projectId:this.id,
			governDate:""
		};
	}
	
	addChildren(index){
		let emptyOneChildrenTableData=this.getEmptyOneChildrenTableData();
		this.tableData[index].childList.push(emptyOneChildrenTableData);
	}
	
	delChildren(index,cIndex){
		let _this=this;
		let itemId=_this.tableData[index].childList[cIndex].itemId;
		if(itemId==null || itemId==""){
			_this.deleteChildren(index,cIndex);
		}else{
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:itemId,type:"emergencyItem"})
			.then(function(data){
				_this.deleteChildren(index,cIndex);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	deleteChildren(index,cIndex){
		this.tableData[index].childList.splice(cIndex, 1);
		if(this.tableData[index].childList.length == 0){
			this.addChildren(index);
		}
	}
	
	onNeedFixChange(cItem,value){
		if(value=="0"){
			cItem.governDate="";
			cItem.governPeriod="/"
		}else{
			cItem.governDate="";
			cItem.governPeriod=""
		}
	}
	
	
  save(){
  	let _this=this;
  	let submitData:any=new Object();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updatePreventionControlInfo",submitData)
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
  		_this.httpClientService.post("ecp","riskAssassment.updatePreventionControlInfo",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/measures/reformImplement/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getPreventionControlInfo", {projectId: _this.id, userId: 1})
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
