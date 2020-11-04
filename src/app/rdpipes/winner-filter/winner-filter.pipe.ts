import { Pipe, PipeTransform } from '@angular/core';
import { DinnerWinner } from 'src/app/home/tabs/dinners/dinners.service';

@Pipe({
  name: 'winnerFilter'
})
export class WinnerFilterPipe implements PipeTransform {

  transform(dinnerWinners: DinnerWinner[], arg: string): unknown {
    const filtered: DinnerWinner[] = [];
    const grouped = [];

    // Filtro i vincitori per tenere solo quelli la cui categorie corrisponde all'argomento passato
    for (let i = 0; i < dinnerWinners.length; i++) {
      if (dinnerWinners[i].category === arg) {
        filtered.push(dinnerWinners[i]);
      }
    }

    // Creo un array di oggetti contenenti le info del gruppo vincitore
    for (let k = 0; k < filtered.length; k++) {
      if (grouped.find(x => x.groupId === filtered[k].groupId) === undefined) {

        const groupWinner = {
          groupId: filtered[k].groupId,
          firstName: filtered[k].name,
          firstImage: filtered[k].profile_photo,
          firstHasVoted: filtered[k].has_voted,
          secondName: null,
          secondImage: null,
          secondHasVoted: null,
          badgePhoto: filtered[k].badge_photo,
          vote: filtered[k].vote
        };

        grouped.push(groupWinner);
      } else {
        const j = grouped.map(e => e.groupId).indexOf(filtered[k].groupId);
        grouped[j].secondName = filtered[k].name;
        grouped[j].secondImage = filtered[k].profile_photo;
        grouped[j].secondHasVoted = filtered[k].has_voted;
      }
    }
    return grouped;
  }

}
