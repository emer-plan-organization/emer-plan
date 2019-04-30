import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService';

@Component({
  selector: 'app-survey-emergency-result',
  templateUrl: './emergency-result.component.html',
  styleUrls: ['./emergency-result.component.css'],
	providers: [ HttpClientService ]
})
export class EmergencyResultComponent implements OnInit {

  constructor
	(
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private httpClientService:HttpClientService,
		private message:NzMessageService
	) { }

	id="";
	isPassValid:boolean=true;
	resultId="";
	result="";
	isFirstTime:boolean=false;
	
	resultFocus(){
		if(this.isFirstTime){
			this.isFirstTime=false;
		}
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.id=_this.resultId;
		submitData.userId=1;
		submitData.result=_this.result;
		_this.httpClientService.post("ecp","ecpContingencyResource.updateResourceResult",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	submit(){
		let _this=this;
		if(_this.isPassValid){
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.result=_this.result;
			//submitData.jsonData={result:_this.result};
			_this.httpClientService.post("ecp","ecpContingencyResource.updateResourceResult",submitData)
			.then(function(data:any){
				//_this.message.success("保存成功");
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	initData(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpContingencyResource.getResourceResult",{projectId:_this.id,userId:1})
		.then(function(data:any){
			_this.result=data.result;
			_this.resultId=data.id;
			if(_this.result==null || _this.result==""){
				_this.isFirstTime=true;
				_this.result="按照本企业目前的应急物资、装备、救援队伍和应急保障等应急资源情况，基本可以满足处置突发环境污染事件的需要。本企业下一步还将进一步完善应急救援体系，补充部分应急物资及装备，加强救援队伍和应急保障体系的建设，确保能够快速、有效处置突发环境污染事件，使损失降到最低，保障人民群众的生命财产安全。";
			}
		},function(err){
			_this.message.error(err);
		});
	}
	
  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
	}

}
