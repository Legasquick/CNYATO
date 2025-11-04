import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CostItem {
  name: string;
  volume: string;
  unitPrice: string;
  total: string;
}

interface OtherCost {
  id: string;
  name: string;
  volume: string;
  unitPrice: string;
  total: string;
}

interface CostGroup {
  id: string;
  name: string;
  items: CostItem[];
}


@Component({
  selector: 'app-variable-costs',
  templateUrl: './variable-costs.component.html',
  styleUrls: ['./variable-costs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariableCostsComponent {
  costGroups: CostGroup[] = [
    {
      id: '1',
      name: 'Привлечение проектных специалистов:',
      items: [
        { name: 'Оператор', volume: '10 съемочных смен', unitPrice: '25 000 ₽ / смена', total: '250 000' },
        { name: 'Звукорежиссер', volume: '10 съемочных смен', unitPrice: '15 000 ₽ / смена', total: '150 000' },
        { name: 'Монтажер', volume: '20 видеороликов', unitPrice: '10 000 ₽ / ролик', total: '200 000' },
        { name: 'Колорист', volume: '8 видеороликов', unitPrice: '15 000 ₽ / ролик', total: '120 000' },
        { name: 'Моушн-дизайнер', volume: '5 проектов', unitPrice: '30 000 ₽ / проект', total: '150 000' },
        { name: 'Бухгалтер (аутсорс)', volume: '1 месяц', unitPrice: '50 000 ₽ / месяц', total: '50 000' },
      ]
    }
  ];
  otherCosts: OtherCost[] = [
    { id: '2', name: 'Транспортные расходы на съемки (такси, каршеринг)', volume: '10 съемочных дней', unitPrice: '4 000 ₽ / день', total: '40 000' },
    { id: '3', name: 'Привлечение фрилансеров (актеры, дикторы)', volume: '5 проектов', unitPrice: '30 000 ₽ / проект', total: '150 000' },
    { id: '4', name: 'Расходные материалы (реквизит, жесткие диски)', volume: '1 месяц', unitPrice: '30 000 ₽ / месяц', total: '30 000' },
  ];

  totalCost = '1 140 000 ₽';
}
