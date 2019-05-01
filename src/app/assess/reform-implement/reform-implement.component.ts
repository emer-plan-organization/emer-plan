import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-reform-implement',
  templateUrl: './reform-implement.component.html',
  styleUrls: ['./reform-implement.component.css'],
	providers: [HttpClientService]
})
export class ReformImplementComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	personList:Array<any>=[];
	personList1:Array<any>=[];
	
	environmentalRiskUnitList:Array<any>=[];
	riskSubstancesList:Array<any>=[];
	riskReceptorList:Array<any>=[];
	
	onNameInput(value){
	  if(value!=""){
	    let re=new RegExp("^.{0,}"+value+".{0,}$");
	    this.personList1=this.personList.filter(item=>{
	      return re.test(item.personName);
	    });
	  }
	}
	
	onNameChange(cItem,person){
			cItem.telephone=person.phoneNumber;
		}
	
	getPersonList(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpCommon.getPersonInfo",{projectId:_this.id,contactName:""})
		.then(function(data:any){
			_this.personList=data;
		},function(err){
			//_this.message.error(err);
		});
	}
	
	getEnvironmentalRiskUnitList(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpCommon.getEnvironmentalRiskUnit",{projectId:_this.id})
		.then(function(data:any){
			_this.environmentalRiskUnitList=data;
		},function(err){});
	}
	
	getRiskSubstancesList(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpCommon.getRiskSubstances",{projectId:_this.id})
		.then(function(data:any){
			_this.riskSubstancesList=data;
		},function(err){});
	}
	
	getRiskReceptorList(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpCommon.getEnvironmentalReceptors",{projectId:_this.id,environmentalFactors:-1})
		.then(function(data:any){
			_this.riskReceptorList=data;
		},function(err){});
	}
	
  save(){
  	let _this=this;
		_this.restoreTableData();
  	let submitData:any=new Object();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updateNeedFixPreventionControlInfo",submitData)
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
  		_this.httpClientService.post("ecp","riskAssassment.updateNeedFixPreventionControlInfo",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/calculate/gasRisk/"+_this.id);
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
	  _this.tableData.forEach(item=>{
		  item.childList.forEach(item1=>{
			  item1.environmentalRiskUnitArray=_this.splitField(item1.environmentalRiskUnit);
			  item1.riskSubstancesArray=_this.splitField(item1.riskSubstances);
			  item1.riskReceptorArray=_this.splitField(item1.riskReceptor);
		  });
	  });
	}
	
	restoreTableData(){
	  let _this=this;
	  _this.tableData.forEach(item=>{
		  item.childList.forEach(item1=>{
			  item1.environmentalRiskUnit=item1.environmentalRiskUnitArray.join(";");
			  item1.riskSubstances=item1.riskSubstancesArray.join(";");
			  item1.riskReceptor=item1.riskReceptorArray.join(";");
		  });
	  });
	}
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getNeedFixPreventionControlInfo", {projectId: _this.id, userId: 1})
  	  .then(function (data: any) {
  	    _this.tableData = data;
				_this.trunTableData();
  	  }, function (err) {
  	    _this.message.error(err);
  	  });
			
		_this.getPersonList();
		_this.getEnvironmentalRiskUnitList();
		_this.getRiskSubstancesList();
		_this.getRiskReceptorList();
  }
  
  ngOnInit() {
  	this.id = this.activatedRoute.snapshot.paramMap.get('id');
  	this.initData();
  }

}
