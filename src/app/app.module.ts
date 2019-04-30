import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import {HttpErrorHandler} from './core/http-error-handler';

import { SafeHtmlPipe } from './safe-html.pipe';

import {CustomMenuComponent} from './component/custom-menu/custom-menu.component';
import {ImgListViewComponent} from './component/img-list-view/img-list-view.component';

import {SurveyCompanyBaseComponent} from './survey/company-base/company-base.component';
import {SurveyIndexComponent} from './survey/survey-index.component';

import {EmergencyOrgComponent} from './survey/emergency-org/emergency-org.component';
import {EmergencyContactComponent} from './survey/emergency-contact/emergency-contact.component';
import {EmergencyEquipComponent} from './survey/emergency-equip/emergency-equip.component';
import {EmergencyPlaceComponent} from './survey/emergency-place/emergency-place.component';
import {EmergencyResultComponent} from './survey/emergency-result/emergency-result.component';

import {AssessIndexComponent} from './assess/assess-index.component';
import {AssessCompanyBaseComponent} from './assess/company-base/company-base.component';
import {NaturalEnvironmentComponent} from './assess/natural-environment/natural-environment.component';
import {EnvironmentQualityComponent} from './assess/environment-quality/environment-quality.component';
import {ProductCraftComponent} from './assess/product-craft/product-craft.component';
import {CraftStatisticsComponent} from './assess/craft-statistics/craft-statistics.component';
import {LinkAnalysisComponent} from './assess/link-analysis/link-analysis.component';
import {EquipmentListComponent} from './assess/equipment-list/equipment-list.component';
import {ManageSituationComponent} from './assess/manage-situation/manage-situation.component';
import {AcceptorStatisticsComponent} from './assess/acceptor-statistics/acceptor-statistics.component';
import {RiskIdentifyComponent} from './assess/risk-identify/risk-identify.component';
import {EmergencyMeasureComponent} from './assess/emergency-measure/emergency-measure.component';
import {EmergencyStatisticsComponent} from './assess/emergency-statistics/emergency-statistics.component';
import {EmergencySummaryComponent} from './assess/emergency-summary/emergency-summary.component';
import {ScenarioAnalysisComponent} from './assess/scenario-analysis/scenario-analysis.component';
import {SourceAnalysisComponent} from './assess/source-analysis/source-analysis.component';
import {ResourceAnalysisComponent} from './assess/resource-analysis/resource-analysis.component';
import {EnvironmentSummaryComponent} from './assess/environment-summary/environment-summary.component';
import {ConsequenceAnalysisComponent} from './assess/consequence-analysis/consequence-analysis.component';
import {GapAnalysisComponent} from './assess/gap-analysis/gap-analysis.component';
import {ReformImplementComponent} from './assess/reform-implement/reform-implement.component';
import {GasRiskComponent} from './assess/gas-risk/gas-risk.component';
import {WaterRiskComponent} from './assess/water-risk/water-risk.component';
import {CraftProcessComponent} from './assess/craft-process/craft-process.component';
import {GasAssessComponent} from './assess/gas-assess/gas-assess.component';
import {WaterAssessComponent} from './assess/water-assess/water-assess.component';
import {GasDivideComponent} from './assess/gas-divide/gas-divide.component';
import {WaterDivideComponent} from './assess/water-divide/water-divide.component';
import {LevelCalculateComponent} from './assess/level-calculate/level-calculate.component'

import {PlanIndexComponent} from './plan/plan-index.component';
import {PlanCompanyBaseComponent} from './plan/company-base/company-base.component';
import {EventLevelComponent} from './plan/event-level/event-level.component';
import {EmergencyExplainComponent} from './plan/emergency-explain/emergency-explain.component';
import {EmergencyMonitoringComponent} from './plan/emergency-monitoring/emergency-monitoring.component';
import {LinkMeasureComponent} from './plan/link-measure/link-measure.component';
import {EmergencyWarnComponent} from './plan/emergency-warn/emergency-warn.component';
import {ContactWayComponent} from './plan/contact-way/contact-way.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
	SafeHtmlPipe,
    /*********组件 - start*********/
    ImgListViewComponent,
    CustomMenuComponent,
    /*********组件 - end*********/
    /*********应急资源调查 - start*********/
    SurveyIndexComponent,
    SurveyCompanyBaseComponent,
    EmergencyOrgComponent,
    EmergencyContactComponent,
    EmergencyEquipComponent,
    EmergencyPlaceComponent,
    EmergencyResultComponent,
    /*********应急资源调查 - end*********/

    /*********应急预案风险评估 - start*********/
    AssessIndexComponent,
    AssessCompanyBaseComponent,
    NaturalEnvironmentComponent,
    EnvironmentQualityComponent,
    ProductCraftComponent,
    CraftStatisticsComponent,
    LinkAnalysisComponent,
    EquipmentListComponent,
    ManageSituationComponent,
    AcceptorStatisticsComponent,
    RiskIdentifyComponent,
    EmergencyMeasureComponent,
    EmergencyStatisticsComponent,
    EmergencySummaryComponent,
    ScenarioAnalysisComponent,
    SourceAnalysisComponent,
    ResourceAnalysisComponent,
    EnvironmentSummaryComponent,
    ConsequenceAnalysisComponent,
    GapAnalysisComponent,
    ReformImplementComponent,
    GasRiskComponent,
    WaterRiskComponent,
    CraftProcessComponent,
    GasAssessComponent,
    WaterAssessComponent,
    GasDivideComponent,
    WaterDivideComponent,
    LevelCalculateComponent,
    /*********应急预案风险评估 - start*********/

    /*********突发环境事件应急预案 - start*********/
    PlanIndexComponent,
    PlanCompanyBaseComponent,
    EventLevelComponent,
    EmergencyExplainComponent,
    EmergencyMonitoringComponent,
    LinkMeasureComponent,
    EmergencyWarnComponent,
    ContactWayComponent
    /*********突发环境事件应急预案 - start*********/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpErrorHandler,
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
