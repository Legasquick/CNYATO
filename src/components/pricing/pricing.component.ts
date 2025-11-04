import { ChangeDetectionStrategy, Component } from '@angular/core';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  tiers: PricingTier[] = [
    {
      name: 'Старт',
      price: '150 000 ₽',
      description: 'Идеально для старта системной работы с видео-контентом и тестирования гипотез.',
      features: [
        '2 съемочных дня в месяц (до 8 часов)',
        '10-15 коротких видео (Reels/Shorts)',
        '2 экспертных видео (до 15 мин)',
        'Базовая графика и анимация',
        'Персональный продюсер и сценарист',
        'Ежемесячный отчет по результатам'
      ],
      cta: 'Начать со Старта'
    },
    {
      name: 'Рост',
      price: '350 000 ₽',
      description: 'Для компаний, готовых масштабировать производство контента и решать HR-задачи.',
      features: [
        '4 съемочных дня в месяц (до 8 часов)',
        '20-25 коротких видео (Reels/Shorts)',
        '4-5 экспертных/имиджевых видео',
        'Продвинутая 2D анимация и инфографика',
        'Разработка креативной концепции на квартал',
        'Помощь в дистрибуции контента',
        'Выделенная команда'
      ],
      recommended: true,
      cta: 'Выбрать Рост'
    },
    {
      name: 'Стратегия',
      price: '500 000 ₽',
      description: 'Полная интеграция видео-отдела в ваш бизнес для решения стратегических задач.',
      features: [
        '6 съемочных дней в месяц (до 8 часов)',
        'до 40 коротких видео (Reels/Shorts)',
        '1-2 рекламных ролика + до 8 экспертных',
        'Сложная 2D/3D анимация',
        'Разработка годовой видео-стратегии',
        'Полное управление дистрибуцией и аналитикой',
        'Приоритетное обслуживание'
      ],
      cta: 'Стать партнёром'
    }
  ];
}