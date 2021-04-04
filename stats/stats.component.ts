import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import { AlphaService } from '../alpha.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {


  highcharts = Highcharts;
  @ViewChild('statsPieChart') public statsPieChart: ElementRef;
  @ViewChild('staminaBubbleChart') public staminaBubbleChart: ElementRef;
  @ViewChild('accuracyBubbleChart') public accuracyBubbleChart: ElementRef;
  @ViewChild('dribbleBubbleChart') public dribbleBubbleChart: ElementRef;
  @ViewChild('powerBubbleChart') public powerBubbleChart: ElementRef;
  @ViewChild('speedBubbleChart') public speedBubbleChart: ElementRef;
  

  public statsPieChartOptions = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: 'Overall'
    },
    accessibility: {
      point: {
        valueSuffix: ''
      }
    },
    credits: {
     enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 85,
        colors: this.generateRandomColor(),
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Overall Skills',
      data: []
    }]
  };

  constructor(private alphaService: AlphaService) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.alphaService.getAllPlayers().subscribe((players) => {
      if (players && players.length) {
        console.log('players : ', players)
        const dataForSeries = [];
        const playerStaminaData = [];
        const playerAccuracyData = [];
        const playerPowerData = [];
        const playerDribbleData = [];
        const playerSpeedData = [];
        players.forEach(player => {
          const total = player.stamina + player.skills.accuracy + player.skills.power + player.skills.speed + player.skills.dribble;
          dataForSeries.push({ name: player.name, color: this.generateRandomColor(), y: total});
          const playerName = player.name;
          playerStaminaData.push({name: playerName, value: player.stamina, color: this.generateRandomColor()});
          playerAccuracyData.push({name: playerName, value: player.skills.accuracy, color: this.generateRandomColor()});
          playerPowerData.push({name: playerName, value: player.skills.power, color: this.generateRandomColor()});
          playerDribbleData.push({name: playerName, value: player.skills.dribble, color: this.generateRandomColor()});
          playerSpeedData.push({name: playerName, value: player.skills.speed, color: this.generateRandomColor()});
        });
        this.statsPieChartOptions.series[0].data = dataForSeries;
        const staminaBubbleChartOptions = this.getBubbleChartOptions('Stamina');
        const accuracyBubbleChartOptions = this.getBubbleChartOptions('Accuracy');
        const powerBubbleChartOptions = this.getBubbleChartOptions('Power');
        const dribbleBubbleChartOptions = this.getBubbleChartOptions('Dribble');
        const speedBubbleChartOptions = this.getBubbleChartOptions('Speed');
        staminaBubbleChartOptions.series.push({name: 'Stamina', data: playerStaminaData})
        accuracyBubbleChartOptions.series.push({name: 'Accuracy', data: playerAccuracyData})
        powerBubbleChartOptions.series.push({name: 'Power', data: playerPowerData})
        dribbleBubbleChartOptions.series.push({name: 'Dribble', data: playerDribbleData})
        speedBubbleChartOptions.series.push({name: 'Speed', data: playerSpeedData})
        console.log('accuracyBubbleChartOptions : ',accuracyBubbleChartOptions)
        setTimeout(() => {
          this.createChart(this.statsPieChart.nativeElement, this.statsPieChartOptions);
          this.createChart(this.staminaBubbleChart.nativeElement, staminaBubbleChartOptions);
          this.createChart(this.accuracyBubbleChart.nativeElement, accuracyBubbleChartOptions);
          this.createChart(this.powerBubbleChart.nativeElement, powerBubbleChartOptions);
          this.createChart(this.dribbleBubbleChart.nativeElement, dribbleBubbleChartOptions);
          this.createChart(this.speedBubbleChart.nativeElement, speedBubbleChartOptions);
        });
      }
    })
  }

  createChart(el, cfg) {
    Highcharts.chart(el, cfg);
  }

  getBubbleChartOptions(title) {
    return {
      chart: {
          type: 'packedbubble'
      },
      title: {
          text: title,
          y: 40
      },
      subTitle: {
        text: ''
      },
      credits: {
        enabled: false
       },
      legend: {
        enabled: false
      },
      tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.y}</sub>'
      },
      plotOptions: {
          packedbubble: {
              dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  style: {
                      color: this.generateRandomColor(),
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              },
              minPointSize: 70
          }
      },
      series: []
  
  };
  }

  generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
}
