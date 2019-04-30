import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';
import * as $ from 'jquery';

@Component({
  selector: 'app-assess-emergency-summary',
  templateUrl: './emergency-summary.component.html',
  styleUrls: ['./emergency-summary.component.css'],
	providers: [HttpClientService]
})
export class EmergencySummaryComponent implements OnInit {

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
	categoryModal:boolean=false;
	categorySearch:any={
		IndustryCode:"",
		IndustryName:""
	};
	
	category:any=
	{
		list:[],
		total:0,
		curPageIndex:1,
		pageSize:10
	};
	
	showCategory(index){
		this.categoryModal=true;
		this.curTableIndex=index;
	}
	
	categorySch(){
		this.categoryPageChange(1);
	}
	
	categorySlct(){
		let _this=this;
		if($("input[type='radio'][name='category']:checked").length > 0) {
			_this.tableData[_this.curTableIndex].IndustryCategories = $("input[type='radio'][name='category']:checked").val();
			_this.categoryModal = false;
			_this.httpClientService.post("ecp","ecpCommon.getEvents",{industryCategory:_this.tableData[_this.curTableIndex].IndustryCategories})
			.then(function(data:any){
				if(data && data.length>0){
					$.extend(_this.tableData[_this.curTableIndex],data[0]);
					_this.tableData[_this.curTableIndex].CanEdit=0;
				}
				
			}, function(err) {
				//_this.message.error(err);
			});
		} else {
			_this.message.error("请选择行业类别");
		}
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
	getEmptyOneTableData(){
		  return {
				ID:null,
				AddTime:null,
				AddUser:null,
				ModifyTime:null,
				ModifyUser:null,
				DelFlag:null,
				IndustryCategories:null,
				HappenTime:null,
				HappenPlace:null,
				DeviceScale:null,
				Causes:null,
				MaterialLeakage:null,
				EmergencyMeasuresTaken:null,
				EventImpact:null,
				ProjectID:null,
				CanEdit:1
		  };
	}
	
	addParent(){
		let oneTableData=this.getEmptyOneTableData();
		this.tableData.push(oneTableData);
	}
	
	delParent(index){
		let _this=this;
		let ID=_this.tableData[index].ID;
		if(ID==null || ID==""){
			_this.deleteParent(index);
		}else{
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:ID,type:"events"})
			.then(function(data){
				_this.deleteParent(index);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	deleteParent(index){
		this.tableData.splice(index, 1);
		if(this.tableData.length==0){
			this.addParent();
		}
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateEmergencyEnvironmentalEvents",submitData)
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
			_this.httpClientService.post("ecp","riskAssassment.updateEmergencyEnvironmentalEvents",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/consequence/scenarioAnalysis/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}

	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getEmergencyEnvironmentalEvents", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data.events;
		    //_this.turnData();
		  }, function (err) {
		    _this.message.error(err);
		  });
			
			//获取行业信息
			_this.categorySch();
	}

  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }

}
