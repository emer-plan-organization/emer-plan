import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';


@Component({
  selector: 'app-assess-consequence-analysis',
  templateUrl: './consequence-analysis.component.html',
  styleUrls: ['./consequence-analysis.component.css'],
	providers: [HttpClientService]
})
export class ConsequenceAnalysisComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	curTableIndex:any=-1;
	levelModal:boolean=false;
	levelList:Array<any>=[];
	
	getEmptyLevelList(){
		return [
			{
				isCheck:false,
				key:"1",
				name:"特别重大突发环境事件",
				detail:"凡符合下列情形之一的，为特别重大突发环境事件：<br/>1.因环境污染直接导致30人以上死亡或100人以上中毒或重伤的；<br/>2.因环境污染疏散、转移人员5万人以上的；<br/>3.因环境污染造成直接经济损失1亿元以上的；<br/>4.因环境污染造成区域生态功能丧失或该区域国家重点保护物种灭绝的；<br/>5.因环境污染造成设区的市级以上城市集中式饮用水水源地取水中断的；<br/>6.Ⅰ、Ⅱ类放射源丢失、被盗、失控并造成大范围严重辐射污染后果的；放射性同位素和射线装置失控导致3人以上急性死亡的；放射性物质泄漏，造成大范围辐射污染后果的；<br/>7.造成重大跨国境影响的境内突发环境事件。"
			},
			{
				isCheck:false,
				key:"2",
				name:"重大突发环境事件",
				detail:"凡符合下列情形之一的，为重大突发环境事件：<br/>1.因环境污染直接导致10人以上30人以下死亡或50人以上100人以下中毒或重伤的；<br/>2.因环境污染疏散、转移人员1万人以上5万人以下的；<br/>3.因环境污染造成直接经济损失2000万元以上1亿元以下的；<br/>4.因环境污染造成区域生态功能部分丧失或该区域国家重点保护野生动植物种群大批死亡的；<br/>5.因环境污染造成县级城市集中式饮用水水源地取水中断的；<br/>6.Ⅰ、Ⅱ类放射源丢失、被盗的；放射性同位素和射线装置失控导致3人以下急性死亡或者10人以上急性重度放射病、局部器官残疾的；放射性物质泄漏，造成较大范围辐射污染后果的；<br/>7.造成跨省级行政区域影响的突发环境事件。"
			},
			{
				isCheck:false,
				key:"3",
				name:"较大突发环境事件",
				detail:"凡符合下列情形之一的，为较大突发环境事件：<br/>1.因环境污染直接导致3人以上10人以下死亡或10人以上50人以下中毒或重伤的；<br/>2.因环境污染疏散、转移人员5000人以上1万人以下的；<br/>3.因环境污染造成直接经济损失500万元以上2000万元以下的；<br/>4.因环境污染造成国家重点保护的动植物物种受到破坏的；<br/>5.因环境污染造成乡镇集中式饮用水水源地取水中断的；<br/>6. Ⅲ类放射源丢失、被盗的；放射性同位素和射线装置失控导致10人以下急性重度放射病、局部器官残疾的；放射性物质泄漏，造成小范围辐射污染后果的；<br/>7.造成跨设区的市级行政区域影响的突发环境事件。"
			},
			{
				isCheck:false,
				key:"4",
				name:"一般突发环境事件",
				detail:"凡符合下列情形之一的，为一般突发环境事件：<br/>1.因环境污染直接导致3人以下死亡或10人以下中毒或重伤的；<br/>2.因环境污染疏散、转移人员5000人以下的；<br/>3.因环境污染造成直接经济损失500万元以下的；<br/>4.因环境污染造成跨县级行政区域纠纷，引起一般性群体影响的；<br/>5.Ⅳ、Ⅴ类放射源丢失、被盗的；放射性同位素和射线装置失控导致人员受到超过年剂量限值的照射的；放射性物质泄漏，造成厂区内或设施内局部辐射污染后果的；铀矿冶、伴生矿超标排放，造成环境辐射污染后果的；<br/>6.对环境造成一定影响，尚未达到较大突发环境事件级别的。"
			}
		];
	}
	
	slctLevel(index){
		this.curTableIndex=index;
		this.levelList=this.getEmptyLevelList();
		this.levelModal=true;
	}
	
	chooseLevel(level){
		level.isCheck=true;
		this.tableData[this.curTableIndex].level=level.key;
		this.levelModal=false;
	}
	
	getLevelName(level){
		 if(level && level!=null){
			 if(level=="1" || level==1){
				 return "特别重大突发环境事件";
			 }else if(level=="2" || level==2){
				 return "重大突发环境事件";
			 }else if(level=="3" || level==3){
				 return "较大突发环境事件";
			 }else if(level=="4" || level==4){
				 return "一般突发环境事件";
			 }else{
				 return "";
			 }
		 }else{
			 return "";
		 }
	}

  save(){
  	let _this=this;
  	let submitData:any=new Object();
  	submitData.projectId=_this.id;
  	submitData.userId=1;
  	submitData.jsonData=_this.tableData;
  	_this.httpClientService.post("ecp","riskAssassment.updateScenarioResult",submitData)
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
  		_this.httpClientService.post("ecp","riskAssassment.updateScenarioResult",submitData)
  		.then(function(data:any){
  			_this.router.navigateByUrl("assess/measures/gapAnalysis/"+_this.id);
  		},function(err){
  			_this.message.error(err);
  		});
  	}
  }
  
  initData(){
  	let _this = this;
  	_this.httpClientService.post("ecp", "riskAssassment.getScenarioResult", {projectId: _this.id, userId: 1})
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
