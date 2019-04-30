import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-emergency-measure',
  templateUrl: './emergency-measure.component.html',
  styleUrls: ['./emergency-measure.component.css'],
	providers: [HttpClientService]
})
export class EmergencyMeasureComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	
	getRowSpanNum(item){
		let count=0;
		item.childList.forEach(item1=>{
			item1.childList.forEach(item1=>{
				count++;
			});
		});
		count=count==0?1:count;
		return count;
	}
	getTotalNumber(cItem){
		let total=0;
		cItem.childList.forEach(item=>{
			if(item.currentNumber){
				total+=parseFloat(item.currentNumber);
			}
		});
		return total;
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateRiskUnitEmergencyResponse",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	next(){
		let _this=this;
		//_this.showLoading = true;
		
		_this.isPassValid = true;
		if(_this.isPassValid){
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			_this.httpClientService.post("ecp","riskAssassment.updateRiskUnitEmergencyResponse",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/company/emergencyStatistics/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getRiskUnitEmergencyResponse", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data;
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
