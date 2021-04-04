import { Component, OnInit } from '@angular/core';
import { AlphaService } from '../alpha.service';
import { Player } from '../player';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  public allPlayers: Player[];
  displayedColumns: string[] = ['name', 'stamina', 'speed', 'dribble', 'accuracy', 'power', 'delete'];
  dataSource = new MatTableDataSource([]);

  constructor(private alphaService: AlphaService) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.alphaService.getAllPlayers().subscribe((players) => {
     if (players && players.length) {
       console.log('players : ',players)
       this.dataSource = new MatTableDataSource(players);
     }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removePlayer(player) {
    this.alphaService.deletePlayer(player).subscribe(isRemoved => {
      if (isRemoved) {
        console.log('Player removed successfully!!');
        this.getAllPlayers();
      }
    })
  }

  deleteAllPlayers(){
    this.alphaService.deleteAllPlayers().subscribe((players) => {
      if (players && players.length === 0) {
        console.log('no players : ',players)
        // this.dataSource = new MatTableDataSource(players);
      }
     })
  }

}
