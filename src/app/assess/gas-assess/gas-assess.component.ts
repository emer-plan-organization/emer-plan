import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-gas-assess',
  templateUrl: './gas-assess.component.html',
  styleUrls: ['./gas-assess.component.css'],
	providers: [HttpClientService]
})
export class GasAssessComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }

	id = "";
	isPassValid: boolean = true;
	tableData:any={};
	
	//radioChange(item,indexs,index,val)
	onEvaluateResultChange(cItem,index,cIndex,value){
		var _this=this;
        		var evaluateDetail=_this.tableData.evaluateDetails[index];
        		if(index==0){
        			if(cIndex==1&&value=="0"){
        				evaluateDetail.basisList[2].evaluateResult="1";
        			}else if(cIndex==1&&value=="1"){
        				evaluateDetail.basisList[2].evaluateResult="0";
        			}else if(cIndex==2&&value=="1"){
        				evaluateDetail.basisList[1].evaluateResult="0";
        			}else if(cIndex==2&&value=="0"){
        				evaluateDetail.basisList[1].evaluateResult="1";
        			}
							if(evaluateDetail.basisList[2].evaluateResult=="0"){
								evaluateDetail.basisList[1].evaluateResult="1";
							}else if(evaluateDetail.basisList[2].evaluateResult=="1"){
								evaluateDetail.basisList[1].evaluateResult="0";
							}
        			if(evaluateDetail.basisList[0].evaluateResult=="0"&&evaluateDetail.basisList[2].evaluateResult=="1"){
	        			evaluateDetail.basisList[0].actualScore=25;
	        		}else{
	        			evaluateDetail.basisList[0].actualScore=0;
	        		}
        		}else if(index==1){
        			if(cIndex==0&&value=="0"){
        				evaluateDetail.basisList[1].evaluateResult="1";
        			}else if(cIndex==0&&value=="1"){
        				evaluateDetail.basisList[1].evaluateResult="0";
        			}else if(cIndex==1&&value=="1"){
        				evaluateDetail.basisList[0].evaluateResult="0";
        			}else if(cIndex==1&&value=="0"){
        				evaluateDetail.basisList[0].evaluateResult="1";
        			}
        			if(evaluateDetail.basisList[0].evaluateResult=="1"&&evaluateDetail.basisList[1].evaluateResult=="0"){
	        			evaluateDetail.basisList[0].actualScore=0;
	        		}else{
	        			evaluateDetail.basisList[0].actualScore=25;
	        		}
        		}else if(index==2){
							if(cIndex<3&&value=="0"){
								if(
									evaluateDetail.basisList[0].evaluateResult=="0"
									&& evaluateDetail.basisList[1].evaluateResult=="0"
									&& evaluateDetail.basisList[2].evaluateResult=="0"
								){
									evaluateDetail.basisList[3].evaluateResult="1";
								}else{
									evaluateDetail.basisList[3].evaluateResult="0";
								}
							}else if(cIndex<3&&value=="1"){
								evaluateDetail.basisList[3].evaluateResult="0";
								/* if(
									evaluateDetail.basisList[0].evaluateResult=="1"
									&& evaluateDetail.basisList[1].evaluateResult=="1"
									&& evaluateDetail.basisList[2].evaluateResult=="1"
								){
									evaluateDetail.basisList[3].evaluateResult="0";
								} */
							}else if(cIndex=3&&value=="1"){
								evaluateDetail.basisList[0].evaluateResult="0";
								evaluateDetail.basisList[1].evaluateResult="0";
								evaluateDetail.basisList[2].evaluateResult="0";
							}
							
							
							evaluateDetail.basisList.forEach(myItem=>{
								if(myItem.evaluateResult=="1"){
									myItem.actualScore=myItem.score;
								}else{
									myItem.actualScore=0;
								}
							});
        		}
	}
	
	totalScoreSalculate(){
		var _this=this;
        		var num=0;
        		for(var i=0;i<_this.tableData.evaluateDetails.length;i++){
        			let design=_this.tableData.evaluateDetails[i];
        			for(var j=0;j<design.basisList.length;j++){
        				if(i==2&&design.basisList[j].evaluateResult=="1"){
        					num+=Number(design.basisList[j].score);
        				}else{
        					num+=Number(design.basisList[j].actualScore);
        				}
        			}
        		}
        		_this.tableData.totalScore=num>70?'70':num;
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
		
		
        		/* post("hzx", "hzxEvaluate.getCraftsProcessInfo", {
					evaluateID: _this.$route.query.evaluateId
				}).then(function(res) {
					_this.computed();
				   _this.data.levelValue=Number((Number(_this.data.totalScore)+Number(res.score)).toFixed(2).toString().replace(/(\.)?0{1,}$/, ''));
				   if(_this.data.levelValue.toFixed(2)<25){
				    	_this.data.levelType="M1";
				   }else if(25<=_this.data.levelValue.toFixed(2)&&_this.data.levelValue.toFixed(2)<45){
				    	_this.data.levelType="M2";
				   }else if(45<=_this.data.levelValue.toFixed(2)&&_this.data.levelValue.toFixed(2)<65){
				    	_this.data.levelType="M3";
				   }else if(_this.data.levelValue.toFixed(2)>=65){
				    	_this.data.levelType="M4";
				   }
				}); */
	}
	
  save(){
  	let _this=this;
  	let submitData:any=new Object();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updateGasEvaluate",submitData)
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
  		_this.httpClientService.post("ecp","riskAssassment.updateGasEvaluate",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/calculate/waterAssess/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getGasEvaluate", {projectId: _this.id, userId: 1})
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
