import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService';


@Component({
  selector: 'app-survey-emergency-org',
  templateUrl: './emergency-org.component.html',
  styleUrls: ['./emergency-org.component.css'],
  providers: [ HttpClientService ]
})




export class EmergencyOrgComponent implements OnInit {
	id="";
	isPassValid:boolean=true;
	tableData=[];

  constructor(
	private router:Router,
	private activatedRoute: ActivatedRoute,
  	private httpClientService:HttpClientService,
  	private message:NzMessageService
  ) { }
 
  getEmptyOneTableData(){
	  return {
		  organizationName: '',
		  organizationID: '',
		  personList: [{
			  position: '',
			  personID: '',
			  companyPost: '',
			  personName: '',
			  phoneNumber: '',
			  canDel:1
		  }],
		  serviceNumber: '',
		  canDel:1
	  };
  }
  
  addChildren(index){
	  let emptyOneTableData=this.getEmptyOneTableData();
  	this.tableData[index].personList.push(emptyOneTableData.personList[0]);
  }
	
	delChildren(index,cIndex){
		let _this=this;
		let personID=_this.tableData[index].personList[cIndex].personID;
		if(personID==""){
			_this.deleteChildren(index,cIndex);
		}else{
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:personID,type:"organizationPerson"})
			.then(function(data){
				_this.deleteChildren(index,cIndex);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	deleteChildren(index,cIndex){
		this.tableData[index].personList.splice(cIndex, 1);
		if(this.tableData[index].personList.length == 0){
			this.addChildren(index);
		}
	}
	
	
	addParent(){
		let emptyOneTableData=this.getEmptyOneTableData();
		this.tableData.push(emptyOneTableData);
	}
	
	delParent(index){
		let _this=this;
		let organizationID=_this.tableData[index].organizationID;
		if(organizationID==""){
			_this.deleteParent(index);
		}else{
			_this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:organizationID,type:"emergencyOrganization"}).then(function(data){
				//返回成功
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
		_this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencyOrganizationInfo",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	initData(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpContingencyResource.getEmergencyOrganizationInfo",{projectId:_this.id,userId:1})
		.then(function(data:any){
			_this.tableData=data;
		},function(err){
			_this.message.error(err);
		});
		
	}
	next(){
		let _this=this;
		//_this.showLoading = true;
		
		this.isPassValid = true;
		
		outer:
		for (let i = 0; i < this.tableData.length; i++) {
		    let item = this.tableData[i]
		    for (let key in item) {
				if(key=="serviceNumber"){
					//TODO	电话号验证
				}
		        if (key != 'organizationID') {
		            if (key != 'personList') {
		                if (!item[key]) {
		                    this.isPassValid = false;
							break outer;
		                }
		            } else {
		                for (let j = 0; j < item[key].length; j++) {
		                    for (let key_one in item[key][j]) {
								if(key_one=="phoneNumber"){
									//TODO	手机号验证
								}
		                        if (key_one!= 'canDel' && key_one!='personID') {
		                            if (!item[key][j][key_one]) {
		                                this.isPassValid = false;
										break outer;
		                            }
		                        }
		                    }
		                }
		            }
		        }
		    }
		}
		if (_this.isPassValid) {
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			
		    _this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencyOrganizationInfo",submitData)
		    .then(function(data:any){
		    	_this.router.navigateByUrl("survey/emergency/contact/"+_this.id);
		    },function(err){
		    	_this.message.error(err);
		    });
		}else{
			//_this.showLoading = false;
		}
	}
	
  ngOnInit() {
	  this.id = this.activatedRoute.snapshot.paramMap.get('id');
	  this.initData();
  }

}
