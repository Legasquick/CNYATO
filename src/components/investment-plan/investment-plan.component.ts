import { ChangeDetectionStrategy, Component } from '@angular/core';

interface InvestmentItem {
  type: 'category' | 'item' | 'total' | 'super-category';
  name: string;
  pricePerUnit?: string;
  quantity?: number;
  total?: string;
  isSubItem?: boolean;
}

@Component({
  selector: 'app-investment-plan',
  templateUrl: './investment-plan.component.html',
  styleUrls: ['./investment-plan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentPlanComponent {
  investmentData: InvestmentItem[] = [
    { type: 'super-category', name: 'I. Капитальные затраты (CAPEX)', total: '11 300 000' },
    { type: 'item', name: '• Приобретение специализированного оборудования', total: '9 300 000' },
    { type: 'item', name: '• Строительно-монтажные работы/ремонтные работы', total: '800 000' },
    { type: 'item', name: '• Оборудование общего назначения (мебель и т.д.)', total: '1 200 000' },

    { type: 'super-category', name: 'II. Первоначальные оборотные средства (Working Capital)', total: '13 372 500' },
    { type: 'item', name: '• Регистрация юр. лица, юр. расходы', pricePerUnit: '100 000', quantity: 1, total: '100 000' },
    { type: 'item', name: '• Арендный депозит (за 2 месяца)', pricePerUnit: '400 000', quantity: 2, total: '800 000' },
    { type: 'item', name: '• Закупка годовых лицензий на ПО', pricePerUnit: '300 000', quantity: 1, total: '300 000' },
    { type: 'item', name: '• Резерв на ПОСТОЯННЫЕ расходы на 3 месяца', pricePerUnit: '2 917 500', quantity: 3, total: '8 752 500' },
    { type: 'item', name: '• Резерв на ПЕРЕМЕННЫЕ расходы на 3 месяца', pricePerUnit: '1 140 000', quantity: 3, total: '3 420 000' },

    { type: 'total', name: 'ИТОГО НЕОБХОДИМЫХ ИНВЕСТИЦИЙ:', total: '24 672 500' }
  ];
}
