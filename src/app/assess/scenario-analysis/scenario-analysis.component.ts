import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-scenario-analysis',
  templateUrl: './scenario-analysis.component.html',
  styleUrls: ['./scenario-analysis.component.css'],
	providers: [HttpClientService]
})
export class ScenarioAnalysisComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }

	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	riskList:Array<any>=[];
	
	getEmptyOneChildrenTableData(){
		return {
			riskSubstanceName:null,
			scenarioAnalysis:null,
			id:null,
			accidentLocation:null
		};
	}
	
	addChildren(index){
		let emptyOneChildrenTableData=this.getEmptyOneChildrenTableData();
		this.tableData[index].childList.push(emptyOneChildrenTableData);
	}
	
	delChildren(index,cIndex){
		let _this=this;
		let id=_this.tableData[index].childList[cIndex].id;
		if(id==null || id==""){
			_this.deleteChildren(index,cIndex);
		}else{
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:id,type:"scenario"})
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
	
	onHaveChange(item,value){
		let v=value=="0"?"/":null;
		if(item.childList && item.childList.length>0){
			item.childList.forEach(item1=>{
				item1.riskSubstanceName=v;
				item1.accidentLocation=v;
				item1.scenarioAnalysis=v;
			});
		}
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateSuddenEnvironmentalScenario",submitData)
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
			_this.httpClientService.post("ecp","riskAssassment.updateSuddenEnvironmentalScenario",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/consequence/sourceAnalysis/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getSuddenEnvironmentalScenario", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data.list;
		    //_this.turnData();
		  }, function (err) {
		    _this.message.error(err);
		  });
		_this.httpClientService.post("ecp", "ecpCommon.getRiskSubstances", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.riskList = data;
		    //_this.turnData();
		  }, function (err) {
		    _this.message.error(err);
		  });
	}
	
  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }

}
