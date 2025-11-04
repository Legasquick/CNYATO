import { ChangeDetectionStrategy, Component } from '@angular/core';

interface PayrollRow {
  isHeader?: boolean;
  isFooter?: boolean;
  department: string;
  position?: string;
  count?: number | string;
  net?: string;
  gross?: string;
  insurance?: string;
  totalNoBonus?: string;
  bonus?: string;
  totalWithBonus?: string;
}

@Component({
  selector: 'app-organizational-chart',
  templateUrl: './organizational-chart.component.html',
  styleUrls: ['./organizational-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationalChartComponent {
  payrollData: PayrollRow[] = [
    { isHeader: true, department: 'Управление' },
    { department: 'Управление', position: 'Ген. директор', count: 1, net: '261 000', gross: '300 000', insurance: '90 600', totalNoBonus: '390 600', bonus: '60 000', totalWithBonus: '450 600' },
    
    { isHeader: true, department: 'Менеджмент отделов' },
    { department: 'Менеджмент отделов', position: 'Рук. производства', count: 1, net: '156 600', gross: '180 000', insurance: '54 360', totalNoBonus: '234 360', bonus: '36 000', totalWithBonus: '270 360' },
    { department: 'Менеджмент отделов', position: 'Рук. пост-продакшена', count: 1, net: '156 600', gross: '180 000', insurance: '54 360', totalNoBonus: '234 360', bonus: '36 000', totalWithBonus: '270 360' },

    { isHeader: true, department: 'Продюсерский отдел' },
    { department: 'Продюсерский отдел', position: 'Продюсер', count: 2, net: '261 000', gross: '300 000', insurance: '90 600', totalNoBonus: '390 600', bonus: '60 000', totalWithBonus: '450 600' },

    { isHeader: true, department: 'Креативный отдел' },
    { department: 'Креативный отдел', position: 'Сценарист', count: 1, net: '113 100', gross: '130 000', insurance: '39 260', totalNoBonus: '169 260', bonus: '26 000', totalWithBonus: '195 260' },
    { department: 'Креативный отдел', position: 'Режиссер', count: 1, net: '139 200', gross: '160 000', insurance: '48 320', totalNoBonus: '208 320', bonus: '32 000', totalWithBonus: '240 320' },

    { isFooter: true, department: 'ИТОГО:', count: 7, net: '1 087 500', gross: '1 250 000', insurance: '377 500', totalNoBonus: '1 627 500', bonus: '250 000', totalWithBonus: '1 877 500' },
  ];
}
