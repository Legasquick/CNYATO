import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Factor {
  name: string;
  threats: string[];
  opportunities: string[];
  rank: string;
  rankValue: number;
}

@Component({
  selector: 'app-microenvironment-factors',
  templateUrl: './microenvironment-factors.component.html',
  styleUrls: ['./microenvironment-factors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicroenvironmentFactorsComponent {
  factors: Factor[] = [
    {
      name: 'Конкуренты',
      threats: ['Рынок насыщен, крупные игроки имеют преимущества.'],
      opportunities: ['Подписочная модель и долгосрочные отношения выделяют компанию среди конкурентов.'],
      rank: 'Высокая (5/5)',
      rankValue: 5,
    },
    {
      name: 'Потребители',
      threats: ['Высокие ожидания к качеству могут привести к потере клиентов в кризис.'],
      opportunities: ['Целевая аудитория ценит предсказуемость и делегирование.'],
      rank: 'Высокая (5/5)',
      rankValue: 5,
    },
    {
      name: 'Поставщики',
      threats: ['Зависимость от поставщиков может быть проблемой в условиях роста цен.'],
      opportunities: ['Наличие альтернативных источников и принцип «задвоения» поставок снижает риски.'],
      rank: 'Средняя (3/5)',
      rankValue: 3,
    },
    {
      name: 'Персонал',
      threats: ['Зависимость от квалификации команды и текучка кадров.'],
      opportunities: ['Построение корпоративной культуры помогает привлечь и удержать талантливых специалистов.'],
      rank: 'Высокая (4/5)',
      rankValue: 4,
    },
    {
      name: 'Ресурсы',
      threats: ['Высокие первоначальные затраты и постоянные расходы.'],
      opportunities: ['Подписочная модель обеспечивает стабильный доход, что позволяет планировать развитие.'],
      rank: 'Высокая (4/5)',
      rankValue: 4,
    },
  ];

  getRankClass(rankValue: number): string {
    if (rankValue >= 5) return 'bg-red-500/20 text-red-300';
    if (rankValue >= 4) return 'bg-orange-500/20 text-orange-300';
    if (rankValue >= 3) return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-gray-500/20 text-gray-300';
  }
}
