import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  readData:any = [];
  dataColumns:any = [];
  x : any = [];
  y : any = [];
  allData : any = [];

  ngOnInit(): void {

  //var str = "query/SELECT YEAR(date) as ano ,count(*) as total FROM posts GROUP BY YEAR(date)";
  //get from my table username and currency
  /*
  var str = "query/ ";
    this.service.getAllData(str).subscribe(data => {
      data.forEach((element:any) => {
        if(this.dataColumns.length < 1){
          this.dataColumns.push(Object.keys(element));
          console.log(this.dataColumns);
        }
        this.readData.push(Object.values(element));
      });
      this.readData.forEach((element:any) => {
        this.x.push(element[0]);
        var aux : any = element[1];
        //replace all the spaces from
        console.log(aux);
        //if(aux == String){
          aux = aux.toString();
          //replace all the " " from aux
          aux = aux.replace(/[^0-9]/g, '');
        //}
        console.log(aux);
        this.y.push(aux);
      });
    });
  }
  ngAfterViewInit() {
    this.chart?.update();
    this.update();

    */
  }


  //get info from querysearchid and send to service
  public getInfo(query: string): void { 
    //clear the data from the table
    this.dataColumns = [];
    this.readData = [];
    this.x = [];
    this.y = [];
    this.allData = [];
    //console.log(query); 
    this.service.getAllData("query/"+query).subscribe(data => {
      this.allData = data;
      data.forEach((element:any) => {
        if(this.dataColumns.length < 1){
          this.dataColumns.push(Object.keys(element));
          //console.log(this.dataColumns);
        }
        this.readData.push(Object.values(element));
      });
      this.readData.forEach((element:any) => {
        this.x.push(element[0]);
        var aux : any = element[1];
        //replace all the spaces from
        //console.log(aux);
        //if(aux == String){
          aux = aux.toString();
          //replace all the " " from aux
          aux = aux.replace(/[^0-9]/g, '');
        //}
        //console.log(aux);
        this.y.push(aux);
      });
    });
    this.chart?.update();
    this.update();
  }


  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.y,
        label: 'Query',
        fill: 'origin',
      }
    ],
    labels: this.x,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
        },
        ticks: {
          color: 'red'
        }
      }
    },
  };

  //multiple charttypes
  public lineChartTypes: ChartType[] = [ 'line', 'bar', 'radar', 'doughnut','pie', 'polarArea', 'bubble','scatter'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }


  public update(): void {
    this.lineChartData = {
      datasets: [
        {
          data: this.y,
          label: 'Query',
          fill: 'origin',
        }
      ],
      labels: this.x,
    };
    this.chart?.update();
  }


  public readbutton(): void {
  this.update();
  }


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
}
