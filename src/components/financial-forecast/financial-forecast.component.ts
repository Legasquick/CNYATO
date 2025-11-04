import { ChangeDetectionStrategy, Component, output, signal, computed } from '@angular/core';

export type ScenarioType = 'Realistic' | 'Optimistic' | 'Pessimistic';

interface FinancialRow {
  indicator: string;
  values: string[];
  isBold?: boolean;
  isTotal?: boolean;
}

interface Scenario {
  name: string;
  assumptions: string[];
  data: FinancialRow[];
}

@Component({
  selector: 'app-financial-forecast',
  templateUrl: './financial-forecast.component.html',
  styleUrls: ['./financial-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialForecastComponent {
  
  selectedScenario = signal<ScenarioType>('Realistic');
  scenarioChange = output<ScenarioType>();

  scenarios: Record<ScenarioType, Scenario> = {
    'Realistic': {
      name: 'Реалистичный сценарий (Базовый)',
      assumptions: [
        'Темп роста выручки: Умеренный, выход на плато к 5-му году.',
        'Переменные затраты: Составляют 25% от выручки.',
        'Масштабирование команды: Новый продюсер нанимается, когда выручка превышает 70 000 000 ₽ в год.'
      ],
      data: [
        { indicator: 'Выручка', values: ['24 000 000', '54 000 000', '82 800 000', '102 000 000', '114 000 000'] },
        { indicator: 'Переменные расходы (25%)', values: ['6 000 000', '13 500 000', '20 700 000', '25 500 000', '28 500 000'] },
        { indicator: 'Валовая прибыль', values: ['18 000 000', '40 500 000', '62 100 000', '76 500 000', '85 500 000'], isBold: true },
        { indicator: 'Постоянные затраты', values: ['35 010 000', '37 460 700', '43 563 000', '46 612 410', '49 875 279'] },
        { indicator: 'Прибыль до налогообложения (EBT)', values: ['-17 010 000', '3 039 300', '18 537 000', '29 887 590', '35 624 721'], isBold: true },
        { indicator: 'Налог на прибыль (25%)', values: ['0', '759 825', '4 634 250', '7 471 898', '8 906 180'] },
        { indicator: 'Чистая прибыль', values: ['-17 010 000', '2 279 475', '13 902 750', '22 415 692', '26 718 541'], isTotal: true },
      ]
    },
    'Optimistic': {
      name: 'Оптимистичный сценарий',
      assumptions: [
        'Темп роста выручки: Очень быстрый, выход на плато уже на 4-й год.',
        'Переменные затраты: Снижаются до 24% благодаря эффекту масштаба и выгодным условиям с подрядчиками.',
        'Масштабирование команды: Первый продюсер нанимается при достижении выручки 60 млн ₽, второй — при 110 млн ₽.'
      ],
      data: [
        { indicator: 'Выручка', values: ['26 400 000', '64 800 000', '91 200 000', '117 600 000', '117 600 000'] },
        { indicator: 'Переменные расходы (24%)', values: ['6 336 000', '15 552 000', '21 888 000', '28 224 000', '28 224 000'] },
        { indicator: 'Валовая прибыль', values: ['20 064 000', '49 248 000', '69 312 000', '89 376 000', '89 376 000'], isBold: true },
        { indicator: 'Постоянные затраты', values: ['35 010 000', '40 700 700', '43 549 749', '50 138 231', '53 648 107'] },
        { indicator: 'Прибыль до налогообложения (EBT)', values: ['-14 946 000', '8 547 300', '25 762 251', '39 237 769', '35 727 893'], isBold: true },
        { indicator: 'Налог на прибыль', values: ['0', '2 136 825', '6 440 563', '9 809 442', '8 931 973'] },
        { indicator: 'Чистая прибыль', values: ['-14 946 000', '6 410 475', '19 321 688', '29 428 327', '26 795 920'], isTotal: true },
      ]
    },
    'Pessimistic': {
      name: 'Пессимистичный сценарий',
      assumptions: [
        'Темп роста выручки: Медленный, компания с трудом привлекает клиентов.',
        'Переменные затраты: Растут до 27% из-за отсутствия постоянных объемов и скидок.',
        'Масштабирование команды: Порог найма не достигается в рамках 5-летнего периода.'
      ],
      data: [
        { indicator: 'Выручка', values: ['18 000 000', '36 000 000', '50 400 000', '60 000 000', '66 000 000'] },
        { indicator: 'Переменные расходы (27%)', values: ['4 860 000', '9 720 000', '13 608 000', '16 200 000', '17 820 000'] },
        { indicator: 'Валовая прибыль', values: ['13 140 000', '26 280 000', '36 792 000', '43 800 000', '48 180 000'], isBold: true },
        { indicator: 'Постоянные затраты', values: ['35 010 000', '37 460 700', '40 083 000', '42 888 000', '45 890 100'] },
        { indicator: 'Прибыль до налогообложения (EBT)', values: ['-21 870 000', '-11 180 700', '-3 291 000', '912 000', '2 289 900'], isBold: true },
        { indicator: 'Налог на прибыль', values: ['0', '0', '0', '228 000', '572 475'] },
        { indicator: 'Чистая прибыль', values: ['-21 870 000', '-11 180 700', '-3 291 000', '684 000', '1 717 425'], isTotal: true },
      ]
    }
  };

  currentScenario = computed(() => this.scenarios[this.selectedScenario()]);

  selectScenario(scenario: ScenarioType): void {
    this.selectedScenario.set(scenario);
    this.scenarioChange.emit(scenario);
  }
}