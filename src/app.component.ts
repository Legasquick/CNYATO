import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { InfographicsComponent } from './components/infographics/infographics.component';
import { AudienceComponent } from './components/audience/audience.component';
import { GameComponent } from './components/game/game.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowreelComponent } from './components/showreel/showreel.component';
import { SalesChannelsComponent } from './components/sales-channels/sales-channels.component';
import { AdvertisingAnalysisComponent } from './components/advertising-analysis/advertising-analysis.component';
import { MarketingMixComponent } from './components/marketing-mix/marketing-mix.component';
import { MediaPlanComponent } from './components/media-plan/media-plan.component';
import { OrganizationalChartComponent } from './components/organizational-chart/organizational-chart.component';
import { WorkScheduleComponent } from './components/work-schedule/work-schedule.component';
import { RiskMapComponent } from './components/risk-map/risk-map.component';
import { RiskMitigationComponent } from './components/risk-mitigation/risk-mitigation.component';
import { FixedCostsComponent } from './components/fixed-costs/fixed-costs.component';
import { VariableCostsComponent } from './components/variable-costs/variable-costs.component';
import { InvestmentPlanComponent } from './components/investment-plan/investment-plan.component';
import { CostSummaryComponent } from './components/cost-summary/cost-summary.component';
import { FinancialForecastComponent, ScenarioType } from './components/financial-forecast/financial-forecast.component';
import { InvestmentReturnComponent } from './components/investment-return/investment-return.component';
import { ProjectEfficiencyComponent } from './components/project-efficiency/project-efficiency.component';
import { ClientForecastComponent } from './components/client-forecast/client-forecast.component';
import { CompetitiveAnalysisComponent } from './components/competitive-analysis/competitive-analysis.component';
import { MarketPositioningComponent } from './components/market-positioning/market-positioning.component';
import { MicroenvironmentFactorsComponent } from './components/microenvironment-factors/microenvironment-factors.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    InfographicsComponent,
    AudienceComponent,
    GameComponent,
    FooterComponent,
    ShowreelComponent,
    SalesChannelsComponent,
    AdvertisingAnalysisComponent,
    MarketingMixComponent,
    MediaPlanComponent,
    OrganizationalChartComponent,
    WorkScheduleComponent,
    RiskMapComponent,
    RiskMitigationComponent,
    FixedCostsComponent,
    VariableCostsComponent,
    InvestmentPlanComponent,
    CostSummaryComponent,
    ClientForecastComponent,
    FinancialForecastComponent,
    InvestmentReturnComponent,
    ProjectEfficiencyComponent,
    CompetitiveAnalysisComponent,
    MarketPositioningComponent,
    MicroenvironmentFactorsComponent
  ]
})
export class AppComponent {
  selectedFinancialScenario = signal<ScenarioType>('Realistic');

  onScenarioChange(scenario: ScenarioType): void {
    this.selectedFinancialScenario.set(scenario);
  }
}