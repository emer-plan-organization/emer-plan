import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService'

@Component({
  selector: 'app-survey-emergency-place',
  templateUrl: './emergency-place.component.html',
  styleUrls: ['./emergency-place.component.css'],
	providers: [ HttpClientService ]
})
export class EmergencyPlaceComponent implements OnInit {

  constructor(
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private httpClientService:HttpClientService,
		private message:NzMessageService
	) { }
	
	id="";
	isPassValid:boolean=true;
	tableData=[];
  personList:Array<any>=[];
  personList1:Array<any>=[];

  onContactNameInput(value){
    if(value!=""){
      let re=new RegExp("^.{0,}"+value+".{0,}$");
      this.personList1=this.personList.filter(item=>{
        return re.test(item.personName);
      });
    }
  }

  onContactNameChange(item,person){
    item.phoneNumber=person.phoneNumber;
  }
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencySite",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	next(){
		let _this=this;
		_this.router.navigateByUrl("survey/result/emergency/"+_this.id);
		/* if(_this.isPassValid){
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			_this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencySite",submitData)
			.then(function(data:any){
				
			},function(err){
				_this.message.error(err);
			});
		} */
	}

  getPersonList(){
    let _this =this;
    _this.httpClientService.post("ecp","ecpCommon.getPersonInfo",{projectId:_this.id,contactName:""})
      .then(function(data:any){
        _this.personList=data;
      },function(err){
        //_this.message.error(err);
      });
  }
	
	initData(){
		let _this =this;
		_this.httpClientService.post("ecp","ecpContingencyResource.getEmergencySite",{projectId:_this.id,userId:1})
		.then(function(data:any){
			_this.tableData=data;
		},function(err){
			_this.message.error(err);
		});
		_this.getPersonList();
	}

  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }

}
