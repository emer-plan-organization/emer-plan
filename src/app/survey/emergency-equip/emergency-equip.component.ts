import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService';

@Component({
  selector: 'app-survey-emergency-equip',
  templateUrl: './emergency-equip.component.html',
  styleUrls: ['./emergency-equip.component.css'],
  providers: [ HttpClientService ]
})
export class EmergencyEquipComponent implements OnInit {
  constructor(
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private httpClientService:HttpClientService,
		private message:NzMessageService
	) { }
		
	id="";
	isPassValid:boolean=true;
	
	
	tableData:Array<any>=[];
	personList:Array<any>=[];
	personList1:Array<any>=[];

	getOneTableData(){
		return {
      contactName:"",
			scrappedDate:"",
      contactNumber:"",
			suppliesModel:"",
			suppliesUse:"",
			remark:"",
			id:"",
      emergencyType:"",
			suppliesName:"",
			suppliesNumber:""
			};
	}

	
	addChildren(index){
		let oneTableData=this.getOneTableData();
		this.tableData[index].childList.push(oneTableData)
	}
	
	delChildren(index,cIndex){
		let _this=this;
		let cId=_this.tableData[index].childList[cIndex].id;
		if(cId==""){
			_this.deleteChildren(index,cIndex);
		}else{
			 _this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:cId,type:"emergencyInfo"})
			.then(function(data){
				_this.deleteChildren(index,cIndex);
			},function(err){
				_this.message.error(err);
			}); 
		}
	}
	
	deleteChildren(index,cIndex){
		this.tableData[index].childList.splice(cIndex, 1);
		if(this.tableData[index].childList.length == 0){
			this.addChildren(index);
		}
	}
  onContactNameInput(value){
    if(value!=""){
      let re=new RegExp("^.{0,}"+value+".{0,}$");
      this.personList1=this.personList.filter(item=>{
        return re.test(item.personName);
      });
    }
	}

  onContactNameChange(equipItem,person){
		equipItem.contactNumber=person.phoneNumber;
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
		_this.httpClientService.post("ecp","ecpContingencyResource.getEmergencyInfo",{projectId:_this.id,userId:1})
		.then(function(data:any){
			_this.tableData=data;
		},function(err){
			_this.message.error(err);
		});
		_this.getPersonList();
		/*_this.personList1=[
			{
				id:"1",
				personName:"name1",
				phoneNumber:"phone1"
			},
			{
				id:"2",
				personName:"name2",
				phoneNumber:"phone2"
			},
			{
				id:"3",
				personName:"name3",
				phoneNumber:"phone3"
			},
			{
				id:"4",
				personName:"name4",
				phoneNumber:"phone4"
			}
		];*/
	}
	
	save(){
		let _this=this;
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencyInfo",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	next(){
		let _this=this;
		_this.router.navigateByUrl("survey/emergency/place/"+_this.id);
		/* if (_this.isPassValid) {
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			_this.httpClientService.post("ecp","ecpContingencyResource.updateEmergencyInfo",submitData)
			.then(function(data:any){
				_this.message.success("保存成功");
			},function(err){
				_this.message.error(err);
			});
		} */
	}

  ngOnInit() {	
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }

}
