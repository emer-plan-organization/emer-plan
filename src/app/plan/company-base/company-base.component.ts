import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClientService } from '../../service/httpClientService';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from 'jquery';

@Component({
  selector: 'app-plan-company-base',
  templateUrl: './company-base.component.html',
  styleUrls: ['./company-base.component.css'],
  providers: [ HttpClientService ]
})
export class PlanCompanyBaseComponent implements OnInit {
	validateForm: FormGroup;
	
	id="";
	company:any={
		CompanyName:null,
		ParentCompanyName:null,
		BuildingDate:null,
		LastRebuildingDate:null,
		LocationProvince:null,
		LocationCity:null,
		LocationArea:null,
		LocationAddress:null,
		BusinessScope:null,
		SocialCreditCode:null,
		IndustryCategory:null,
		IndustrialPark:null,
		DesignProduce:null,
		AgedProduce:null,
		EmployeesNumber:null,
		FactoryArea:null,
		CenterLongitude:null,
		CenterLatitude:null,
		LegalPerson:null,
		ContactPerson:null,
		PostalCode:null,
		ContactNumber:null,
		WastewaterDischarge:null,
		WastewaterGo:null,
		WasteGenerated:null,
		WasteGeneratedName:null,
		//SpecialEmergencyFund:null,
		//MonitoringCapability:null,
		//MonitoringUnit:null,
		//StartEmergencyRescueDrill:null,
		//EmergencyDrillNumber:null,
		//EmergencyDrillTime:null,
		//TheNumberOfEmergencyDrill:null,
		//WindVane:null,
		EnvironmentalAccidents:null,
		Fire:null,
		FireNumber:null,
		Explosion:null,
		ExplosionNumber:null,
		Reveal:null,
		RevealNumber:null,
		PreventionControl:null,
		ApprovalNumber:null
	};
	resourceList={
		imgList1: [],
		imgList2: []
	};
	provinceList:any=[];
	cityList:any=[];
	areaList:any=[];
	categoryModal=false;
	categorySearch:any={
		IndustryCode:"",
		IndustryName:""
	};
	
	category:any={
		list:[{
		categoryCode:"1",
		categoryName:"1"
	},{
		categoryCode:"2",
		categoryName:"2"
	},{
		categoryCode:"3",
		categoryName:"3"
	}],
		total:0,
		curPageIndex:1,
		pageSize:10
	};
	
	//大于0的整数验证
	moreZeroIntValidator = (control: FormControl): { [ s: string ]: boolean } => {
		if (control.value && control.value.toString()!="" && !/^[1-9][0-9]{0,}$/.test(control.value)) {
		  return { confirm: true, error: true };
		}
	 };
	 //邮编验证
	 postcodeValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if (control.value && control.value.toString()!="" && !/^[0-9]{6}$/.test(control.value)) {
		  return { confirm: true, error: true };
		}
	 };
	//手机号验证
	mobileValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if (control.value && control.value.toString()!="" && !/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(control.value)) {
		  return { confirm: true, error: true };
		}
	};
	//正数（包括正整数和正小数）验证
	moreZeroValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if (control.value && control.value.toString()!="" && !/^[1-9]{1,}[0-9]{0,}(\.[0-9]{1,})?$/.test(control.value)) {
		  return { confirm: true, error: true };
		}
	};
	//危废名称验证
	wasteNameValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if(this.validateForm && this.validateForm.controls){
			if(!this.validateForm.controls.WasteGenerated.value||this.validateForm.controls.WasteGenerated.value==null){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}else if(this.validateForm.controls.WasteGenerated.value.toString()!="0"){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}
		}
	};
	//监测执行单位
	/*monitoringUnitValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if(this.validateForm && this.validateForm.controls){
			if(!this.validateForm.controls.MonitoringCapability.value||this.validateForm.controls.MonitoringCapability.value==null){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}else if(this.validateForm.controls.MonitoringCapability.value.toString()=="0"){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}
		}
	};*/
	//应急演练必填验证
	/*emergencyRequiredValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if(this.validateForm && this.validateForm.controls){
			if(!this.validateForm.controls.StartEmergencyRescueDrill.value||this.validateForm.controls.StartEmergencyRescueDrill.value==null){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}else if(this.validateForm.controls.StartEmergencyRescueDrill.value.toString()=="1"){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}
		}
	};*/
	//历史环境事故发生情况必填验证
	environmentalRequiredValidator=(control: FormControl): { [ s: string ]: boolean } => {
		if(this.validateForm && this.validateForm.controls){
			if(!this.validateForm.controls.EnvironmentalAccidents.value||this.validateForm.controls.EnvironmentalAccidents.value==null){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}else if(this.validateForm.controls.EnvironmentalAccidents.value.toString()=="1"){
				if(!control.value || control.value==null || control.value.toString()==""){
					return { confirm: true, error: true };
				}
			}
		}
		
		/*if ((this.company.EnvironmentalAccidents && this.company.EnvironmentalAccidents.toString()=="1") && (!control.value || control.value.toString()=="")) {
		  return { confirm: true, error: true };
		}*/
	};
	constructor(
		private httpClientService:HttpClientService,
		private message:NzMessageService,
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder
	 ) {}
	 
	ngOnInit() : void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
  	
		this.validateForm=this.fb.group({
			CompanyName:[null,[Validators.required]],
			ParentCompanyName:[null,[Validators.required]],
			BuildingDate:[null,[Validators.required]],
			LastRebuildingDate:[null,[]],
			LocationProvince:[null,[Validators.required]],
			LocationCity:[null,[Validators.required]],
			LocationArea:[null,[Validators.required]],
			LocationAddress:[null,[Validators.required]],
			BusinessScope:[null,[Validators.required]],
			SocialCreditCode:[null,[Validators.required]],
			IndustryCategory:[null,[Validators.required]],
			IndustrialPark:[null,[Validators.required]],
			DesignProduce:[null,[Validators.required]],
			AgedProduce:[null,[Validators.required]],
			EmployeesNumber:[null,[Validators.required,this.moreZeroIntValidator]],
			FactoryArea:[null,[Validators.required,this.moreZeroIntValidator]],
			CenterLongitude:[null,[Validators.required]],
			CenterLatitude:[null,[Validators.required]],
			LegalPerson:[null,[Validators.required]],
			ContactPerson:[null,[Validators.required]],
			PostalCode:[null,[Validators.required,this.postcodeValidator]],
			ContactNumber:[null,[Validators.required,this.mobileValidator]],
			WastewaterDischarge:[null,[Validators.required,this.moreZeroValidator]],
			WastewaterGo:[null,[Validators.required]],
			WasteGenerated:[null,[Validators.required]],
			WasteGeneratedName:[null,[this.wasteNameValidator]],
			//SpecialEmergencyFund:[null,[Validators.required,this.moreZeroValidator]],
			MonitoringCapability:[null,[Validators.required]],
			//MonitoringUnit:[null,[this.monitoringUnitValidator]],
			//StartEmergencyRescueDrill:[null,[Validators.required]],
			//EmergencyDrillNumber:[null,[this.emergencyRequiredValidator,this.moreZeroIntValidator]],
			//EmergencyDrillTime:[null,[this.emergencyRequiredValidator]],
			//TheNumberOfEmergencyDrill:[null,[this.emergencyRequiredValidator,this.moreZeroIntValidator]],
			//WindVane:[null,[Validators.required]],
			EnvironmentalAccidents:[null,[Validators.required]],
			Fire:[null,[this.environmentalRequiredValidator]],
			FireNumber:[null,[this.environmentalRequiredValidator,this.moreZeroIntValidator]],
			Explosion:[null,[this.environmentalRequiredValidator]],
			ExplosionNumber:[null,[this.environmentalRequiredValidator,this.moreZeroIntValidator]],
			Reveal:[null,[this.environmentalRequiredValidator]],
			RevealNumber:[null,[this.environmentalRequiredValidator,this.moreZeroIntValidator]],
			PreventionControl:[null,[Validators.required]],
			ApprovalNumber:[null,[Validators.required]]
		});
		this.initData();
	}
	
	save():void{
		let _this=this;
		let submitData:any = _this.company;
		let imgList = [];
		imgList = imgList.concat(_this.resourceList.imgList1, _this.resourceList.imgList2);
		submitData.resourceList = imgList;
		
	}
  
	next():void{
		for (const i in this.validateForm.controls) {
		  this.validateForm.controls[ i ].markAsDirty();
		  this.validateForm.controls[ i ].updateValueAndValidity();
		}
		if(this.validateForm.status=="VALID"){
			
		}
		//console.log(this.validateForm.status);//"INVALID"
	}
	//跳转侧四
	/*test():void{
		this.router.navigateByUrl("survey/environmen/org/"+this.id);
	}*/
	
	initData(){
		let _this =this;
		_this.getProvinceList();
		_this.httpClientService.post("ecp","ecpContingencyPlan.getCompanyBasicInfo",{projectId:_this.id,userId:1})
		.then(function(data:any){
			_this.company=data.companyBasicInfo;
			if(_this.company.LocationProvince!=null && _this.company.LocationProvince!=""){
				let provinceCode=_this.company.LocationProvince.split("_")[0];
				if(provinceCode!=""){
					_this.getCityList(provinceCode);
				}
			}
			if(_this.company.LocationCity!=null && _this.company.LocationCity!=""){
				let cityCode = _this.company.LocationCity.split("_")[0];
				if(cityCode!=""){
					_this.getAreaList(cityCode);
				}
			}
		},function(err){
			_this.message.error(err);
		});
		
		//获取行业信息
		_this.categorySch();
	}
	
	getProvinceList(){
		let _this=this;
		_this.httpClientService.nomalPost("ahj","CodeSourceExecutor.fetch",{
			CodeType: "District",
			ConditionField: "TreeLevel",
			ConditionValue: "1"
		})
		.then(function(data:any){
			_this.provinceList = data;
		},function(err){
			//_this.message.error(err);
		});
	}
	getCityList(provinceCode){
		let _this=this;
		_this.httpClientService.nomalPost("ahj", "CodeSourceExecutor.fetch", {
			CodeType: "District",
			ConditionField: "1",
			ConditionValue: "1",
			ParentCode: provinceCode
		}).then(function(data:any) {
			_this.cityList = data;
		}, function(err) {
			//_this.$Message.error(err);
		});
	}
	getAreaList(cityCode){
		let _this=this;
		_this.httpClientService.nomalPost("ahj", "CodeSourceExecutor.fetch", {
			CodeType: "District",
			ConditionField: "TreeLevel",
			ConditionValue: "3",
			ParentCode: cityCode
		}).then(function(data:any) {
			_this.areaList = data;
		}, function(err) {
			//_this.$Message.error(err);
		});
	}
	provinceChange(value: string): void{
		if(value!=null){
			let code = value.split("_")[0];
			if(code!=""){
				this.getCityList(code);
			}
		}
	}
	cityChange(value: string): void{
		if(value!=null){
			let code = value.split("_")[0];
			if(code!=""){
				this.getAreaList(code);
			}
		}
	}
	
	showCategory(){
		this.categoryModal=true;
	}
	
	categoryCheckAll(value){
		alert(value);
	}
	
	categorySch(){
		this.categoryPageChange(1);
	}
	
	categorySlct(){
		if($("input[type='radio'][name='category']:checked").length > 0) {
			this.company.IndustryCategory = $("input[type='radio'][name='category']:checked").val();
			this.categoryModal = false;
		} else {
			this.message.error("请选择行业类别");
		}
	}
	
	getCategoryList(){
		
	}
	
	categoryPageChange(value){
		let _this=this;
		let searchParam=_this.categorySearch;
		_this.category.curPageIndex=value;
		searchParam.pageIndex = (_this.category.curPageIndex).toString();
		searchParam.pageSize = (_this.category.pageSize).toString();
		_this.httpClientService.post("ecp","ecpCommon.getIndustryCategoryInfo",searchParam)
		.then(function(data:any){
			if(data!=null && data.total && data.data){
				_this.category.list = data.data;
				_this.category.total = data.total;
			}else{
				_this.category.total = 0;
				_this.category.list = [];
			}
		}, function(err) {
			_this.message.error(err);
		});
	}
	
	/*formatterPeople=value=>`${value}人`;
	parserPeople=value=>value.replace('人$','');
	
	formatterMSquare=value=>`${value}㎡`;
	parserMSquare=value=>value.replace('㎡$','');*/
}
