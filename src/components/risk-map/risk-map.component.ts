import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Risk {
  title: string;
  examples: string;
}

interface RiskCell {
  risks: Risk[];
}

interface RiskRow {
  damage: 'Высокий' | 'Средний' | 'Низкий';
  cells: RiskCell[];
}


@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskMapComponent {
  riskMap: RiskRow[] = [
    {
      damage: 'Высокий',
      cells: [
        { // Низкая вероятность
          risks: [
            { title: 'Форс-мажор', examples: '(Пандемия, пожар)' },
            { title: 'Стратегические', examples: '(Неверный выбор ниши)' },
            { title: 'Юридические', examples: '(Нарушение прав)' }
          ]
        },
        { // Средняя вероятность
          risks: [
            { title: 'Кадровые', examples: '(Уход сотрудника)' },
            { title: 'Финансовые', examples: '(Кассовый разрыв)' },
            { title: 'Технологические', examples: '(Сбой оборудования)' },
            { title: 'Политические', examples: '(Блокировка ПО)' }
          ]
        },
        { // Высокая вероятность
          risks: [
            { title: 'Маркетинговые', examples: '(Демпинг конкурентов)' },
            { title: 'Специфические', examples: '(Творческое выгорание)' }
          ]
        }
      ]
    },
    {
      damage: 'Средний',
      cells: [
        { // Низкая вероятность
          risks: [
            { title: 'Строительные', examples: '(Проблемы с арендой)' }
          ]
        },
        { // Средняя вероятность
          risks: []
        },
        { // Высокая вероятность
          risks: [
            { title: 'Операционные', examples: '(Снижение качества из-за нагрузки)' }
          ]
        }
      ]
    },
    {
      damage: 'Низкий',
      cells: [
        { // Низкая вероятность
          risks: [
            { title: 'Экологические', examples: '(Погодные условия)' }
          ]
        },
        { // Средняя вероятность
          risks: []
        },
        { // Высокая вероятность
          risks: []
        }
      ]
    }
  ];

  cellColors = [
    // Высокий ущерб
    ['bg-yellow-900/50 border-yellow-500/30', 'bg-orange-900/50 border-orange-500/30', 'bg-red-900/50 border-red-500/30'],
    // Средний ущерб
    ['bg-green-900/50 border-green-500/30', 'bg-yellow-900/50 border-yellow-500/30', 'bg-orange-900/50 border-orange-500/30'],
    // Низкий ущерб
    ['bg-blue-900/50 border-blue-500/30', 'bg-green-900/50 border-green-500/30', 'bg-yellow-900/50 border-yellow-500/30']
  ];
}
