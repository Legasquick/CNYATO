import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Schedule {
  department: string;
  schedule: string;
  format: string;
  icon: string;
}

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkScheduleComponent {
  schedules: Schedule[] = [
    {
      department: 'Администрация и управление',
      schedule: '5/2, 10:00-19:00',
      format: 'Преимущественно офисный формат.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6'
    },
    {
      department: 'Продюсеры',
      schedule: '5/2, гибкий',
      format: 'Гибридный формат (офис/встречи), ориентированный на коммуникацию с клиентами.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      department: 'Производственный персонал',
      schedule: 'проектный, плавающий',
      format: 'График зависит от съемок (полная занятость) и пре-продакшена (гибкий/удаленный).',
      icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
    },
    {
      department: 'Отдел пост-продакшена',
      schedule: '5/2, гибкий',
      format: 'Гибридный формат, ориентированный на соблюдение дедлайнов.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    }
  ];
}
