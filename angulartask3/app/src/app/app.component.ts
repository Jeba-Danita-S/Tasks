import { Component } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    // Create root and chart
    let root = am5.Root.new("chartdiv");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    // Define data
    let data = [
      { year: "2020", sales: 100000 },
      { year: "2021", sales: 160000 },
      { year: "2022", sales: 80000 },
      { year: "2023", sales: 90000 }
    ];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "year"
      })
    );
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
    }));

    legend.data.setAll(series.dataItems);
  }
}




