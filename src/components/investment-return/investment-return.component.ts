import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ScenarioType } from '../financial-forecast/financial-forecast.component';

interface InvestmentReturnRow {
  indicator: string;
  values: string[]; // 6 values for year 0-5
  isBold?: boolean;
}

@Component({
  selector: 'app-investment-return',
  templateUrl: './investment-return.component.html',
  styleUrls: ['./investment-return.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentReturnComponent {
  scenario = input.required<ScenarioType>();

  private allData: Record<ScenarioType, InvestmentReturnRow[]> = {
    'Realistic': [
      { indicator: 'Свободный денежный поток (FCF)', values: ['-24 672 500', '-13 770 000', '5 519 475', '17 142 750', '25 655 692', '29 958 541'] },
      { indicator: 'Накопленный дисконтированный FCF', values: ['-24 672 500', '-36 147 500', '-32 314 599', '-22 365 311', '11 028 923', '-400 376'], isBold: true },
    ],
    'Optimistic': [
      { indicator: 'Свободный денежный поток (FCF)', values: ['-24 672 500', '-11 706 000', '9 650 475', '22 561 688', '32 668 327', '30 035 920'] },
      { indicator: 'Накопленный дисконтированный FCF', values: ['-24 672 500', '-34 427 500', '-27 724 099', '-14 597 109', '1 217 687', '13 397 500'], isBold: true },
    ],
    'Pessimistic': [
      { indicator: 'Свободный денежный поток (FCF)', values: ['-24 672 500', '-18 630 000', '-7 940 700', '-51 000', '3 924 000', '4 957 425'] },
      { indicator: 'Накопленный дисконтированный FCF', values: ['-24 672 500', '-40 197 500', '-45 717 099', '-45 746 511', '-43 862 387', '-41 878 123'], isBold: true },
    ]
  };

  currentData = computed(() => this.allData[this.scenario()]);
}