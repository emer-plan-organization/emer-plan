import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService';

@Component({
  selector: 'app-assess-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
  providers: [ HttpClientService ]
})
export class EquipmentListComponent implements OnInit {
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private httpClientService:HttpClientService,
    private message:NzMessageService
  ) { }

  id="";
  isPassValid:boolean=true;
  tableData:Array<any>=[];

  getOneTableData(){
    return {
      isTimeOut:null,
      equipmentName:null,
      id:"",
      equipmentModel:null,
      equipmentNumber:null
    };
  }

  addParent(){
    let oneTableData=this.getOneTableData();
    this.tableData.push(oneTableData);
  }

  delParent(index){
    let _this=this;
    let id=_this.tableData[index].id;
    if(id==""){
      _this.deleteParent(index);
    }else{
      _this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:id,type:"equipmentInfo"})
        .then(function(data){
          _this.deleteParent(index);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  deleteParent(index){
    this.tableData.splice(index, 1);
    if(this.tableData.length == 0){
      this.addParent();
    }
  }

  save(){
    let _this=this;
    let submitData:any=new Object();
    submitData.projectId=_this.id;
    submitData.userId=1;
    submitData.jsonData=_this.tableData;
    _this.httpClientService.post("ecp","riskAssassment.updateEquipmentInfo",submitData)
      .then(function(data:any){
        _this.message.success("保存成功");
      },function(err){
        _this.message.error(err);
      });
  }

  next(){
    let _this=this;
    if(_this.isPassValid){
      let submitData:any=new Object();
      submitData.projectId=_this.id;
      submitData.userId=1;
      submitData.jsonData=_this.tableData;
      _this.httpClientService.post("ecp","riskAssassment.updateEquipmentInfo",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/manage/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getEquipmentInfo",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.tableData=data;
      },function(err){
        _this.message.error(err);
      });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initData();
  }

}
