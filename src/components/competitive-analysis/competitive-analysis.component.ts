import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CompetitorData {
  factor: string;
  weight: number;
  snyato: number;
  jenevaPro: number;
  goFrame: number;
  freelancer: number;
}

@Component({
  selector: 'app-competitive-analysis',
  templateUrl: './competitive-analysis.component.html',
  styleUrls: ['./competitive-analysis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitiveAnalysisComponent {
  headers = {
    snyato: 'Снято!',
    jenevaPro: 'JenevaPro',
    goFrame: 'Go Frame',
    freelancer: 'Конкурент 3 (Фрилансер)'
  };

  competitorsData: CompetitorData[] = [
    { factor: '1. Предсказуемость бюджета и затрат', weight: 5, snyato: 5, jenevaPro: 5, goFrame: 5, freelancer: 5 },
    { factor: '2. Экономия времени и управленческих ресурсов', weight: 4, snyato: 4, jenevaPro: 3, goFrame: 3, freelancer: 2 },
    { factor: '3. Стабильный поток и регулярность контента', weight: 3, snyato: 5, jenevaPro: 3, goFrame: 4, freelancer: 3 },
    { factor: '4. Глубокое понимание бренда и стратегии', weight: 4, snyato: 5, jenevaPro: 4, goFrame: 3, freelancer: 2 },
    { factor: '5. Креативность и визуальная составляющая', weight: 5, snyato: 3, jenevaPro: 5, goFrame: 5, freelancer: 5 },
    { factor: '6. Гибкость и скорость реакции', weight: 5, snyato: 5, jenevaPro: 4, goFrame: 4, freelancer: 5 },
    { factor: '7. Стоимость (разовая/для малых проектов)', weight: 3, snyato: 2, jenevaPro: 2, goFrame: 3, freelancer: 5 },
    { factor: '8. Имидж (работа с крупными брендами)', weight: 4, snyato: 0, jenevaPro: 5, goFrame: 4, freelancer: 2 },
  ];

  totals = {
    snyato: '15,375',
    jenevaPro: '16',
    goFrame: '15,5',
    freelancer: '15,125',
  };

  getScoreColor(score: number): string {
    if (score >= 5) return 'text-teal-400';
    if (score >= 4) return 'text-blue-400';
    if (score >= 3) return 'text-yellow-400';
    if (score >= 1) return 'text-orange-400';
    return 'text-red-400';
  }
}
