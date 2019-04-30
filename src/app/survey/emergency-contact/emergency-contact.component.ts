import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService'

@Component({
  selector: 'app-survey-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css'],
  providers: [HttpClientService]
})
export class EmergencyContactComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClientService: HttpClientService,
    private message: NzMessageService
  ) {
  }

  id = "";
  isPassValid: boolean = true;
  tableData1: Array<any> = [];
  tableData2: Array<any> = [];
  tableData3: Array<any> = [];
  tableData4: Array<any> = [];

  isHaveChange(index, value) {
    if (value == 0 || value == "0") {
      this.tableData3[index].agencyName = "";
      this.tableData3[index].resourceList = [];
    }
  }

  getOneTableData() {
    return {
      "isHave": "0",
      "address": "",
      "distance": "",
      "contactNumber": "",
      "branchName": "",
      "agencyID": "",
      "type": "un",
      "sortFlag": "",
      "agencyName": "",
      "content": "",
      "resourceList": []
    };
  }

  addOneTableData() {
    let oneTableData = this.getOneTableData();
    this.tableData2.push(oneTableData);
  }

  delOneTableData(index) {
    let _this = this;
    let agencyID = _this.tableData2[index].agencyID;
    if (agencyID == "") {
      _this.tableData2.splice(index, 1);
    } else {
      //TODO	删除的后台接口
      _this.httpClientService.post("ecp", "ecpCommon.deleteRow", {id: agencyID, type: "emergencyAgency"})
        .then(function (data) {
          _this.tableData2.splice(index, 1);
        }, function (err) {
          _this.message.error(err);
        });
    }
  }

  branchNameChange(index, value) {
    this.tableData2[index].type = "2";
  }

  save() {
    let _this = this;
    let submitData: any = new Object();
    submitData.projectId = _this.id;
    submitData.userId = 1;
    submitData.jsonData = [..._this.tableData1,..._this.tableData2.filter(item => {
      return item.type != "un"
    }), ..._this.tableData3,..._this.tableData4];
    _this.httpClientService.post("ecp", "ecpContingencyResource.updateEmergencyAgencyInfo", submitData)
      .then(function (data: any) {
        _this.message.success("保存成功");
      }, function (err) {
        _this.message.error(err);
      });
  }

  next() {
    this.isPassValid = true;
    /*let table1 = this.tableData1.filter(item => {
      return item.type == "1"
    });*/

    outer1:
      for (let i = 0; i < this.tableData1.length; i++) {
        let item = this.tableData1[i]
        for (let key in item) {
          if (key == "contactNumber") {
            //TODO	电话号验证
          }
          if (key != 'agencyID' && key != "sortFlag" && key != "branchName" && key != "type" && key != "isHave" && key != "address" && key != "distance" && key != "content" && key != "resourceList") {
            if (!item[key]) {
              this.isPassValid = false;
              break outer1;
            }
          }
        }
      }

    if (this.isPassValid) {
      /*let table2 = this.tableData1.filter(item => {
        return (item.type == "2" || item.type == "un")
      });*/
      outer2:
        for (let i = 0; i < this.tableData2.length; i++) {
          let item = this.tableData2[i]
          for (let key in item) {
            if (key == "contactNumber") {
              //TODO	电话号验证
            }
            if (key != 'agencyID' && key != "sortFlag" && key != "type" && key != "isHave" && key != "contactNumber" && key != "content" && key != "address" && key != "distance" && key != "resourceList") {
              if (!item[key]) {
                this.isPassValid = false;
                break outer2;
              }
            }
          }
        }
    }
    if (this.isPassValid) {
      outer3:
        for (let i = 0; i < this.tableData3.length; i++) {
          let item = this.tableData3[i]
          for (let key in item) {
            if (key != 'agencyID' && key != "contactNumber" && key != "sortFlag" && key != "branchName" && key != "type" && key != "contactNumber" && key != "address" && key != "distance" && key != "content" && key != "resourceList") {
              if (item["isHave"] != "0" || item["isHave"] != 0) {
                if (key != "resourceList") {
                  if (!item[key]) {
                    this.isPassValid = false;
                    break outer3;
                  }
                } else {
                  //TODO 附件验证
                }
              } else {
                if (key != "agencyName" && key != "resourceList") {
                  if (!item[key]) {
                    this.isPassValid = false;
                    break outer3;
                  }
                }
              }
            }
          }
        }
    }
    if (this.isPassValid) {
      outer4:
        for (let i = 0; i < this.tableData4.length; i++) {
          let item = this.tableData4[i]
          for (let key in item) {
            if (key == "contactNumber") {
              //TODO	电话号验证
            }
            if (key != 'agencyID' && key != "sortFlag" && key != "branchName" && key != "type" && key != "isHave" && key != "content" && key != "resourceList") {
              if (!item[key]) {
                this.isPassValid = false;
                break outer4;
              }
            }
          }
        }
    }


    if (this.isPassValid) {
      let _this = this;
      let submitData: any = new Object();
      submitData.projectId = _this.id;
      submitData.userId = 1;
      submitData.jsonData = [..._this.tableData1,..._this.tableData2.filter(item => {
        return item.type != "un"
      }), ..._this.tableData3,..._this.tableData4];
      _this.httpClientService.post("ecp", "ecpContingencyResource.updateEmergencyAgencyInfo", submitData)
        .then(function (data: any) {
          _this.router.navigateByUrl("survey/emergency/equip/" + _this.id);
        }, function (err) {
          _this.message.error(err);
        });
    }

  }

  initData() {
    let _this = this;
    _this.httpClientService.post("ecp", "ecpContingencyResource.getEmergencyAgencyInfo", {
      projectId: _this.id,
      userId: 1
    })
      .then(function (data: any) {
        data.sort((a, b) => {
          return parseInt(a.type) - parseInt(b.type);
        });
        /*  _this.tableData1 = data.filter(item => {
            return (item.type == "1" || item.type == "2");
          });

          _this.tableData2 = data.filter(item => {
            return (item.type == "3");
          });*/

        _this.tableData1 = data.filter(item => {
          return (item.type == "1");
        });

        _this.tableData2 = data.filter(item => {
          return (item.type == "2");
        });

        _this.tableData3 = data.filter(item => {
          return (item.type == "3");
        });
        _this.tableData4 = data.filter(item => {
          return (item.type == "4");
        });
        /* let myData=data;
              myData.sort((a,b)=>{
                  return a.type<b.type;
              }); */
        //_this.tableData=myData;
      }, function (err) {
        _this.message.error(err);
      });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initData();
  }

}
