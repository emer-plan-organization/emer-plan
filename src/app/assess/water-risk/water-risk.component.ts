import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-water-risk',
  templateUrl: './water-risk.component.html',
  styleUrls: ['./water-risk.component.css'],
	providers: [HttpClientService]
})
export class WaterRiskComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }

	id = "";
	isPassValid: boolean = true;
	tableData:any={};
	
	ratioCalculate(){
		let calulateData=this.tableData.ratioDetals.filter(item=>{
			return item.criticalAmount==0;
		})
		if(calulateData!=null && calulateData.length>0){
			this.message.error("临界量W不能为0");
		}else{
			let divisor=0,dividend=1;
			for(let i=0;i<this.tableData.ratioDetals.length;i++){
				dividend=dividend*this.tableData.ratioDetals[i].criticalAmount;
				let itemDivisor=this.tableData.ratioDetals[i].yearMaxNumber;
				for(let j=0;j<this.tableData.ratioDetals.length;j++){
					if(i!=j){
						itemDivisor=itemDivisor*this.tableData.ratioDetals[j].criticalAmount;
					}
				}
				divisor=divisor+itemDivisor;
			}
			this.tableData.ratio = (divisor/dividend).toFixed(2);
			if(this.tableData.ratio<1){
				this.tableData.qLevel="Q0";
			}else if(this.tableData.ratio<10){
				this.tableData.qLevel="Q1";
			}else if(this.tableData.ratio<100){
				this.tableData.qLevel="Q2";
			}else{
				this.tableData.qLevel="Q3";
			}
		}
	}
	
  save(){
  	let _this=this;
  	let submitData:any=new Object();
		submitData.waterRadioID=_this.tableData.waterRadioID;
		submitData.ratio=_this.tableData.ratio;
		submitData.qLevel=_this.tableData.qLevel;
		submitData.userId=1;
  	/* submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData; */
  	_this.httpClientService.post("ecp","riskAssassment.updateWaterRatio",submitData)
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
			submitData.waterRadioID=_this.tableData.waterRadioID;
			submitData.ratio=_this.tableData.ratio;
			submitData.qLevel=_this.tableData.qLevel;
			submitData.userId=1;
  		/* submitData.projectId=_this.id;
  		submitData.userId=1;
  		submitData.jsonData=_this.tableData; */
  		_this.httpClientService.post("ecp","riskAssassment.updateWaterRatio",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/calculate/craftProcess/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getWaterRatio", {projectId: _this.id, userId: 1})
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
