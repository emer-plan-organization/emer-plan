import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-risk-identify',
  templateUrl: './risk-identify.component.html',
  styleUrls: ['./risk-identify.component.css'],
	providers: [HttpClientService]
})
export class RiskIdentifyComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:any= {
		id:"",
    type:"",
		environmentalRiskUnit:"",
		list:[]
	};
	riskList:Array<any>=[];
	riskList1:Array<any>=[];
	
	onMainIngredientInput(value,childItem){
		childItem.identification="0";
		childItem.substanceCategory="/";
		if(value!=""){
		  let re=new RegExp("^.{0,}"+value+".{0,}$");
		  this.riskList1=this.riskList.filter(item=>{
		    return re.test(item.evaluationBasis);
		  });
			if(this.riskList1!=null && this.riskList1.length>0){
				let oneRiskList=this.riskList1.filter(item=>{
					return item.evaluationBasis==value;
				});
				if(oneRiskList!=null && oneRiskList.length>0){
					this.onMainIngredientChange(childItem,oneRiskList[0]);
				}
			}
		}else{
			this.riskList1=this.riskList;
		}
	}
	
	
	onMainIngredientChange(childItem,risk){
		childItem.casNumber=risk.casNumber;
		childItem.identification="1";
		childItem.criticalAmount=risk.criticalAmount;
		this.setEnvironmentalRiskUnit();
	}
	
	onStoragePlaceBlur(){
		this.setEnvironmentalRiskUnit();
	}
	
	onSubstanceCategoryChange(){
		this.setEnvironmentalRiskType();
	}
	
	setEnvironmentalRiskUnit(){
		let riskUnitList=[];
		this.tableData.list.forEach(item=>{
			riskUnitList=[
				...riskUnitList,
				...item.childList.filter(cItem=>{
					return (cItem.identification=="1" && cItem.storagePlace!=null && cItem.storagePlace!="");
				})
			]
		});
		if(riskUnitList!=null && riskUnitList.length>0){
			let riskArray=[];
			riskUnitList.forEach(item=>{
				riskArray.push(item.storagePlace);
			});
			this.tableData.environmentalRiskUnit = riskArray.join(";");
		}else{
			this.tableData.environmentalRiskUnit="/"
		}
	}
	
	setEnvironmentalRiskType(){
		this.tableData.type="/";
		let typeList1=[]
		let typeList2=[];
		let typeList3=[];
		
		
		this.tableData.list.forEach(item=>{
			typeList1=[
				...typeList1,
				...item.childList.filter(cItem=>{
					return cItem.substanceCategory=="1";
				})
			];
			typeList2=[
				...typeList2,
				...item.childList.filter(cItem=>{
					return cItem.substanceCategory=="2";
				})
			];
			typeList3=[
				...typeList3,
				...item.childList.filter(cItem=>{
					return cItem.substanceCategory=="3";
				})
			];
			
		});
		
		/* typeList3=this.tableData.list.filter(item=>{
			return (item.substanceCategory=="3");
		}); */
		if(typeList3!=null && typeList3.length>0){
			this.tableData.type="3";
			return;
		}
		
		/* typeList1=this.tableData.list.filter(item=>{
			return (item.substanceCategory=="1");
		}); */
		
		/* typeList2=this.tableData.list.filter(item=>{
			return (item.substanceCategory=="2");
		}); */
		if(typeList1!=null && typeList1.length>0 && typeList2!=null && typeList2.length>0){
			this.tableData.type="3";
			return;
		}
		if(typeList1!=null && typeList1.length>0){
			this.tableData.type="1";
			return;
		}
		if(typeList2!=null && typeList2.length>0){
			this.tableData.type="2";
			return;
		}
	}
	
	getChildrenOneTableData(){
		  return {
			  mainIngredient:null,
				canDel:null,
				identification:null,
				criticalAmount:null,
				substanceID:null,
				substanceName:null,
				storagePlace:null,
				currentNumber:null,
				casNumber:null,
				substanceCategory:null
		  };
	}
	
	addChildren(index){
		let childrenOneTableData=this.getChildrenOneTableData();
		this.tableData.list[index].childList.push(childrenOneTableData);
	}
	
	delChildren(index,cIndex){
		let _this=this;
		let substanceID=_this.tableData.list[index].childList[cIndex].substanceID;
		if(substanceID==null || substanceID==""){
			_this.deleteChildren(index,cIndex);
		}else{
			
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:substanceID,type:"riskSubstanceInfo"})
			.then(function(data){
				_this.deleteChildren(index,cIndex);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	deleteChildren(index,cIndex){
		this.tableData.list[index].childList.splice(cIndex, 1);
		if(this.tableData.list[index].childList.length == 0){
			this.addChildren(index);
		}
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.id=_this.tableData.id;
		submitData.type=_this.tableData.type;
		submitData.environmentalRiskUnit=_this.tableData.environmentalRiskUnit;
		submitData.jsonData=_this.tableData.list;
		_this.httpClientService.post("ecp","riskAssassment.updateRiskSubstanceInfo",submitData)
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
			submitData.id=_this.tableData.id;
			submitData.type=_this.tableData.type;
			submitData.environmentalRiskUnit=_this.tableData.environmentalRiskUnit;
			submitData.jsonData=_this.tableData.list;
			_this.httpClientService.post("ecp","riskAssassment.updateRiskSubstanceInfo",submitData)
			  .then(function(data:any){
			    _this.router.navigateByUrl("assess/company/measure/"+_this.id);
			  },function(err){
			    _this.message.error(err);
			  });
		}
	}

	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getRiskSubstanceInfo", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data;
		    //_this.turnData();
		  }, function (err) {
		    _this.message.error(err);
		  });
			_this.httpClientService.post("ecp", "ecpCommon.getBaseRiskcritical", {evaluationBasis: ""})
			  .then(function (data: any) {
			    _this.riskList = data;
					_this.riskList1=_this.riskList;
			  }, function (err) {
			    _this.message.error(err);
			  });
			
	}

  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }

}
