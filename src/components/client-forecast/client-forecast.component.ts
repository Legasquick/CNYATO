import { ChangeDetectionStrategy, Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';

// Declare D3 to avoid TypeScript errors since it's loaded from a script tag.
declare var d3: any;

interface ForecastRow {
  period: string;
  partnership: number;
  packages: number;
  corporate: number;
  quarterLabel: string;
}

@Component({
  selector: 'app-client-forecast',
  templateUrl: './client-forecast.component.html',
  styleUrls: ['./client-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientForecastComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private resizeObserver!: ResizeObserver;

  forecastData: ForecastRow[] = [
    { period: 'Год 1, Квартал 1', quarterLabel: 'Г1 K1', partnership: 1, packages: 3, corporate: 0 },
    { period: 'Год 1, Квартал 2', quarterLabel: 'Г1 K2', partnership: 2, packages: 5, corporate: 0 },
    { period: 'Год 1, Квартал 3', quarterLabel: 'Г1 K3', partnership: 3, packages: 7, corporate: 1 },
    { period: 'Год 1, Квартал 4', quarterLabel: 'Г1 K4', partnership: 4, packages: 9, corporate: 1 },
    { period: 'Год 2, Квартал 1', quarterLabel: 'Г2 K1', partnership: 5, packages: 12, corporate: 1 },
    { period: 'Год 2, Квартал 2', quarterLabel: 'Г2 K2', partnership: 6, packages: 15, corporate: 1 },
    { period: 'Год 2, Квартал 3', quarterLabel: 'Г2 K3', partnership: 7, packages: 18, corporate: 1 },
    { period: 'Год 2, Квартал 4', quarterLabel: 'Г2 K4', partnership: 8, packages: 20, corporate: 1 },
    { period: 'Год 3, Квартал 1', quarterLabel: 'Г3 K1', partnership: 9, packages: 22, corporate: 1 },
    { period: 'Год 3, Квартал 2', quarterLabel: 'Г3 K2', partnership: 10, packages: 25, corporate: 1 },
    { period: 'Год 3, Квартал 3', quarterLabel: 'Г3 K3', partnership: 11, packages: 25, corporate: 1 },
    { period: 'Год 3, Квартал 4', quarterLabel: 'Г3 K4', partnership: 12, packages: 25, corporate: 1 },
  ];

  ngAfterViewInit(): void {
    const chartContainer = this.elementRef.nativeElement.querySelector('#chart-container');
    if(chartContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.createChart();
      });
      this.resizeObserver.observe(chartContainer);
    }
  }

  ngOnDestroy(): void {
    if(this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private createChart(): void {
    const data = this.forecastData;

    const chartContainer = this.elementRef.nativeElement.querySelector('#chart-container');
    d3.select(chartContainer).select('svg').remove();

    if (!chartContainer || chartContainer.offsetWidth === 0) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const width = chartContainer.offsetWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartContainer)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.quarterLabel))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.packages) * 1.1])
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));

    // Add gridlines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(''))
      .selectAll('line')
      .attr('stroke', 'rgba(255, 255, 255, 0.1)');
    d3.select('.grid').select('.domain').remove();

    const line = (key: 'partnership' | 'packages' | 'corporate') => d3.line()
        .x((d: any) => x(d.quarterLabel)! + x.bandwidth() / 2)
        .y((d: any) => y(d[key])!)
        .curve(d3.curveMonotoneX);

    const categories: {key: 'partnership' | 'packages' | 'corporate', color: string}[] = [
      { key: 'partnership', color: '#3b82f6' }, // blue-500
      { key: 'packages', color: '#10b981' }, // emerald-500
      { key: 'corporate', color: '#a855f7' } // purple-500
    ];

    categories.forEach(cat => {
      // Line
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', cat.color)
        .attr('stroke-width', 2.5)
        .attr('d', line(cat.key));
        
      // Points
      svg.selectAll(`.dot-${cat.key}`)
        .data(data)
        .enter().append('circle')
        .attr('class', `dot dot-${cat.key}`)
        .attr('cx', d => x(d.quarterLabel)! + x.bandwidth() / 2)
        .attr('cy', d => y(d[cat.key])!)
        .attr('r', 4)
        .style('fill', cat.color);
    });

    const tooltip = d3.select(this.elementRef.nativeElement.querySelector('#tooltip'));
    const focusLine = svg.append('line')
      .attr('class', 'focus-line')
      .style('display', 'none');

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        tooltip.style('display', 'block');
        focusLine.style('display', 'block');
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
        focusLine.style('display', 'none');
      })
      .on('mousemove', (event: MouseEvent) => {
        const [xPos] = d3.pointer(event, svg.node());
        const eachBand = x.step();
        const index = Math.min(data.length - 1, Math.floor((xPos + eachBand / 2) / eachBand));
        const d = data[index];
        if (!d) return;

        const focusX = x(d.quarterLabel)! + x.bandwidth() / 2;
        focusLine
            .attr('x1', focusX)
            .attr('x2', focusX)
            .attr('y1', 0)
            .attr('y2', height);

        const tooltipHtml = `
            <div class="font-bold text-white mb-2">${d.period}</div>
            <div class="flex items-center"><span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Партнерство: <strong class="ml-auto">${d.partnership}</strong></div>
            <div class="flex items-center"><span class="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>Пакеты: <strong class="ml-auto">${d.packages}</strong></div>
            <div class="flex items-center"><span class="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>Корп. фильм: <strong class="ml-auto">${d.corporate}</strong></div>
        `;
        tooltip.html(tooltipHtml)
          .style('left', (event.pageX + 15) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      });
  }
}
