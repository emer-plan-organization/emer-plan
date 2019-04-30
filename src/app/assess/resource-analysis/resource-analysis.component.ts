import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-resource-analysis',
  templateUrl: './resource-analysis.component.html',
  styleUrls: ['./resource-analysis.component.css'],
	providers: [HttpClientService]
})
export class ResourceAnalysisComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	acceptorList:Array<any>=[];

  save(){
  	let _this=this;
  	_this.restoreTableData();
  	let submitData:any=new Object();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updateGasScenario",submitData)
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
  		_this.httpClientService.post("ecp","riskAssassment.updateGasScenario",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/consequence/environmentSummary/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
  trunTableData(){
    let _this=this;
    _this.tableData.forEach(item=>{
      item.environmentalReceptorsArray=item.environmentalReceptors.split(";")
    });
  }
  
  restoreTableData(){
    let _this=this;
    _this.tableData.forEach(item=>{
      item.environmentalReceptors=item.environmentalReceptorsArray.join(";");
    });
  }
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getGasScenario", {projectId: _this.id, userId: 1})
  	  .then(function (data: any) {
  	    _this.tableData = data;
				_this.trunTableData();
  	  }, function (err) {
  	    _this.message.error(err);
  	  });
			
		_this.httpClientService.post("ecp", "ecpCommon.getEnvironmentalReceptors", {projectId: _this.id,environmentalFactors:"1",userId: 1})
		  .then(function (data: any) {
		    _this.acceptorList = data;
		  }, function (err) {
		    _this.message.error(err);
		  });
  }
  
  ngOnInit() {
  	this.id = this.activatedRoute.snapshot.paramMap.get('id');
  	this.initData();
  }

}
