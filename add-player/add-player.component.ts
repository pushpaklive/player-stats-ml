import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlphaService } from '../alpha.service';
import { Player } from '../player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  playerName = '';
  playerStamina = '0';
  playerSpeed = '0';
  playerDribble = '0';
  playerAccuracy = '0';
  playerPower = '0';

  constructor(private alphaService: AlphaService) { }

  ngOnInit(): void { }

  addPlayer() {
    const player: Player = {
      name: this.playerName,
      stamina: parseFloat(parseInt(this.playerStamina).toFixed(1)),
      skills: {
        speed: parseFloat(parseInt(this.playerSpeed).toFixed(1)),
        dribble: parseFloat(parseInt(this.playerDribble).toFixed(1)),
        accuracy: parseFloat(parseInt(this.playerAccuracy).toFixed(1)),
        power: parseFloat(parseInt(this.playerPower).toFixed(1))
      }
    };
    console.log('to be added : player : ',player)
    this.alphaService.addPlayer(player).subscribe(resp => {
      console.log('resp: ',resp)
    });
  }

}
