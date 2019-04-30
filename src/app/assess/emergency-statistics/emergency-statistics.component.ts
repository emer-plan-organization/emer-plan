import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-emergency-statistics',
  templateUrl: './emergency-statistics.component.html',
  styleUrls: ['./emergency-statistics.component.css'],
	providers: [HttpClientService]
})
export class EmergencyStatisticsComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateRiskSubstanceDiscern",submitData)
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
			_this.httpClientService.post("ecp","riskAssassment.updateRiskSubstanceDiscern",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/consequence/summary/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getRiskSubstanceDiscern", {projectId: _this.id, userId: 1})
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
