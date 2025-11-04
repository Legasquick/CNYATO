import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ScenarioType } from '../financial-forecast/financial-forecast.component';

interface EfficiencyIndicator {
  name: string;
  value: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-project-efficiency',
  templateUrl: './project-efficiency.component.html',
  styleUrls: ['./project-efficiency.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEfficiencyComponent {
  scenario = input.required<ScenarioType>();

  private allData: Record<ScenarioType, EfficiencyIndicator[]> = {
    'Realistic': [
      {
        name: 'NPV',
        value: '-400 376 ₽',
        description: 'Проект практически выходит в ноль за 5 лет. Это означает, что он окупает вложения и приносит доходность, близкую к требуемой ставке 20%.',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      },
      {
        name: 'IRR',
        value: '~19.8%',
        description: 'Внутренняя норма доходности почти равна ставке дисконтирования. Проект находится на грани инвестиционной привлекательности.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      },
      {
        name: 'DBP',
        value: '~5 лет',
        description: 'Дисконтированный срок окупаемости составляет чуть более 5 лет.',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        name: 'PI',
        value: '~1.0',
        description: 'Индекс рентабельности близок к единице.',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m6 4v4m-2-2h4M17 3v4m-2-2h4M5 21v-4m-2 2h4m5 0v-4m-2 2h4'
      },
      {
        name: 'ROIC',
        value: 'Год 2: 9.2%, Год 5: 108.3%',
        description: '',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
      },
    ],
    'Optimistic': [
       {
        name: 'NPV',
        value: '13 397 500 ₽',
        description: 'Проект генерирует значительную дополнительную стоимость для инвестора.',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      },
      {
        name: 'IRR',
        value: '~31%',
        description: 'Высокая внутренняя норма доходности, значительно превышающая ставку дисконтирования.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      },
      {
        name: 'DBP',
        value: '~3.9 лет',
        description: 'Привлекательный срок окупаемости инвестиций.',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        name: 'PI',
        value: '~1.54',
        description: 'Высокая эффективность вложений.',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m6 4v4m-2-2h4M17 3v4m-2-2h4M5 21v-4m-2 2h4m5 0v-4m-2 2h4'
      },
      {
        name: 'ROIC',
        value: 'Год 2: 26.0%, Год 5: 108.6%',
        description: '',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
      },
    ],
    'Pessimistic': [
       {
        name: 'NPV',
        value: '-41 878 123 ₽',
        description: 'Проект является убыточным и не возвращает вложенные средства в течение 5 лет.',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      },
      {
        name: 'IRR',
        value: '< 0%',
        description: 'Внутренняя норма доходности отрицательна.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      },
      {
        name: 'DBP',
        value: '> 5 лет',
        description: 'Проект не окупается в прогнозном периоде.',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        name: 'PI',
        value: '< 1',
        description: 'Инвестиции неэффективны.',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m6 4v4m-2-2h4M17 3v4m-2-2h4M5 21v-4m-2 2h4m5 0v-4m-2 2h4'
      },
      {
        name: 'ROIC',
        value: 'Неприменим',
        description: 'Компания выходит на минимальную операционную прибыль только к 4-му году.',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
      },
    ]
  };

  currentData = computed(() => this.allData[this.scenario()]);
}