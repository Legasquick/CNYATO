import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CostItem {
  id?: number | string;
  name: string;
  amount: string | null;
  isHeader?: boolean;
  isSubtotal?: boolean;
  isGrandTotal?: boolean;
  isNote?: boolean;
}

@Component({
  selector: 'app-cost-summary',
  templateUrl: './cost-summary.component.html',
  styleUrls: ['./cost-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostSummaryComponent {
  costs: CostItem[] = [
    { isHeader: true, name: 'Постоянные затраты', amount: null },
    { id: 1, name: 'Аренда офиса', amount: '400 000' },
    { id: 2, name: 'Фонд оплаты труда (ФОТ), включая налоги (7 чел.)', amount: '1 877 500' },
    { id: 3, name: 'Коммунальные затраты', amount: '50 000' },
    { id: 4, name: 'Оплата интернета', amount: '20 000' },
    { id: 5, name: 'Реклама и маркетинг', amount: '250 000' },
    { id: 6, name: 'Амортизация оборудования', amount: '270 000' },
    { id: 7, name: 'Подписки на ПО и сервисы (ежемесячно)', amount: '50 000' },
    { isSubtotal: true, name: 'Итого постоянных затрат', amount: '2 917 500' },
    
    { isHeader: true, name: 'Переменные затраты', amount: null },
    { id: 8, name: 'Расходы на реализацию проектов (среднепрогнозно)*', amount: '1 140 000' },
    { isNote: true, name: '*в т.ч. привлечение специалистов, транспорт, материалы, аутсорс-бухгалтерия и пр.', amount: null},
    { isSubtotal: true, name: 'Всего переменных затрат в месяц (среднепрогнозно)', amount: '1 140 000' },
    
    { isGrandTotal: true, name: 'ВСЕГО РАСХОДОВ В МЕСЯЦ (СРЕДНЕПРОГНОЗНО):', amount: '4 057 500 ₽' },
  ];
}
