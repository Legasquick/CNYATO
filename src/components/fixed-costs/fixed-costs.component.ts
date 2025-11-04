import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FixedCost {
  id: number;
  item: string;
  quantity: number | string;
  costPerUnit: string;
  total: string;
}

@Component({
  selector: 'app-fixed-costs',
  templateUrl: './fixed-costs.component.html',
  styleUrls: ['./fixed-costs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedCostsComponent {
  costs: FixedCost[] = [
    { id: 1, item: 'Аренда офиса', quantity: 1, costPerUnit: '400 000', total: '400 000' },
    { id: 2, item: 'Фонд оплаты труда (ФОТ), включая налоги (7 чел.)', quantity: 7, costPerUnit: '~268 214', total: '1 877 500' },
    { id: 3, item: 'Коммунальные затраты', quantity: 1, costPerUnit: '50 000', total: '50 000' },
    { id: 4, item: 'Оплата интернета', quantity: 1, costPerUnit: '20 000', total: '20 000' },
    { id: 5, item: 'Реклама и маркетинг', quantity: 1, costPerUnit: '250 000', total: '250 000' },
    { id: 6, item: 'Амортизация оборудования', quantity: 1, costPerUnit: '270 000', total: '270 000' },
    { id: 7, item: 'Подписки на ПО и сервисы (ежемесячно)', quantity: 1, costPerUnit: '50 000', total: '50 000' },
  ];

  totalCost = '2 917 500 ₽';
  amortizationNote = 'Пояснение по амортизации: (Общая стоимость оборудования 9 300 000 ₽ / срок полезного использования 36 месяцев) ≈ 270 000 ₽/мес.';
}
