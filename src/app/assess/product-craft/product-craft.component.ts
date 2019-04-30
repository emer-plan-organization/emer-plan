import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../service/httpClientService';
import {NzMessageService} from 'ng-zorro-antd';
import * as $ from 'jquery';

@Component({
  selector: 'app-assess-product-craft',
  templateUrl: './product-craft.component.html',
  styleUrls: ['./product-craft.component.css'],
  providers: [HttpClientService]
})
export class ProductCraftComponent implements OnInit {
  validateForm: FormGroup;
  id = "";
  data: any = {};

  constructor(
    private httpClientService: HttpClientService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }


  initData() {
    let _this = this;
    _this.httpClientService.post("ecp", "riskAssassment.getCraftsInfo", {projectId: _this.id, userId: 1})
      .then(function (data: any) {
        _this.data = data;
      }, function (err) {
        _this.message.error(err);
      });
  }

  save() {
    let _this = this;
    let submitData:any = _this.data;
    submitData.userId="1";
    _this.httpClientService.post("ecp", "riskAssassment.updateCraftsInfo", submitData)
      .then(function (data: any) {
        _this.message.success("保存成功");
      }, function (err) {
        _this.message.error(err);
      });
  }

  next() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if(this.validateForm.status=="VALID"){
      let _this = this;
      let submitData:any = _this.data;
      submitData.userId="1";
      _this.httpClientService.post("ecp", "riskAssassment.updateCraftsInfo", submitData)
        .then(function (data: any) {
          _this.router.navigateByUrl("assess/company/craft/"+_this.id);
        }, function (err) {
          _this.message.error(err);
        });
    }
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.validateForm = this.fb.group({
      craftsDesc: [null, [Validators.required]]
    });
    this.initData();
  }

}
