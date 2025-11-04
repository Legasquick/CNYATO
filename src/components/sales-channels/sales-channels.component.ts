import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SalesChannel {
  name: string;
  degree: 'Не применяется' | 'Низкая' | 'Средняя' | 'Высокая';
  advantages: string;
  disadvantages: string;
}

@Component({
  selector: 'app-sales-channels',
  templateUrl: './sales-channels.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsComponent {
  channels: SalesChannel[] = [
    {
      name: 'Со складов фирмы',
      degree: 'Не применяется',
      advantages: '',
      disadvantages: 'Продукция цифровая, физического склада не требуется.',
    },
    {
      name: 'Через посредников',
      degree: 'Низкая',
      advantages: 'Возможность охвата новых сегментов через партнерские маркетинговые агентства.',
      disadvantages: 'Высокая комиссия, риск потери контроля над качеством коммуникации с клиентом.',
    },
    {
      name: 'Заказы по телефону',
      degree: 'Средняя',
      advantages: 'Прямой контакт, высокая конверсия для "теплых" лидов.',
      disadvantages: 'Требует выделенного сотрудника, не масштабируется как основной канал.',
    },
    {
      name: 'Заказы через сайт/приложение',
      degree: 'Высокая',
      advantages: 'Круглосуточная доступность, автоматизация, основная площадка для оформления подписки и обмена материалами.',
      disadvantages: 'Требует инвестиций в разработку и поддержку.',
    },
    {
      name: 'Заказы в соц. сетях',
      degree: 'Высокая',
      advantages: 'Прямое взаимодействие с ЦА, быстрота реакции, неформальное общение.',
      disadvantages: 'Может быть неудобно для ведения длительных переговоров по сложной услуге.',
    },
    {
      name: 'Продажа фирмам-заказчикам (B2B)',
      degree: 'Высокая',
      advantages: 'Прямые продажи через менеджеров, высокий средний чек, долгосрочные контракты.',
      disadvantages: 'Длинный цикл продаж, требуются высококвалифицированные менеджеры.',
    },
    {
      name: 'Личные контакты / Сарафанное радио',
      degree: 'Высокая',
      advantages: 'Максимальное доверие, высочайшая конверсия, нулевые затраты на привлечение.',
      disadvantages: 'Сложно контролировать и масштабировать.',
    },
  ];

  degreeStyles = {
    'Не применяется': 'bg-gray-600 text-gray-200',
    'Низкая': 'bg-yellow-600 text-yellow-200',
    'Средняя': 'bg-blue-600 text-blue-200',
    'Высокая': 'bg-teal-600 text-teal-200',
  };
}