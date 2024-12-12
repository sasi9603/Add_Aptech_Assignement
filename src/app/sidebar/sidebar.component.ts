import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface TableData {
  option: string;
  radar: number;
  falcon: number;
  sinLimit: number;
  sinRisk: number;
  sinBet: number;
  data: {
    category: string;
    radar: number;
    falcon: number;
    sinLimit: number;
    sinRisk: number;
    sinBet: number;
  }[];
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  editedCells: Set<string> = new Set();
  tournaments = [
    {
      name: 'Argentina - Copa de la Liga, Reserves',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
    {
      name: 'Bahrain - Premier League',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
    {
      name: 'Brazil - Carioca',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
    {
      name: 'india - Carioca',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
    {
      name: 'chicago - Carioca',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
    {
      name: 'Brazil - Carioca',
      teams: ['Team A vs Team B', 'Team C vs Team D', 'Team E vs Team F'],
    },
  ];
  tableData: TableData[] = [];
 
  currentDate: string = '';
  currentTime: string = '';

  expandedTournaments: boolean[] = [];
  selectedTeam: string | null = null;

  isSoccerExpanded = true;
  isSidebarVisible = true;

  constructor(private http: HttpClient) {
    this.expandedTournaments = Array(this.tournaments.length).fill(false);
  }
  ngOnInit(): void {
    this.updateDateTime();

    setInterval(() => {
      this.updateDateTime();
    }, 1000);

    const defaultTournamentIndex = 0;
    const defaultTeamIndex = 0;
    const defaultTeam = this.tournaments[defaultTournamentIndex].teams[defaultTeamIndex];
    this.selectTeam(defaultTeam);
    this.expandedTournaments[defaultTournamentIndex] = true;
  }

  toggleSoccer(): void {
    this.isSoccerExpanded = !this.isSoccerExpanded;
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
  }

  toggleTournament(index: number): void {
    this.expandedTournaments[index] = !this.expandedTournaments[index];
  }

  selectTeam(team: string): void {
    this.selectedTeam = team;
    this.tableData = [
      {
        option: '1X2',
        radar: 108.15,
        falcon: 87.78,
        sinLimit: 587,
        sinRisk: 3,
        sinBet: 307,
        data: [
          { category: 'Home', radar: 108.15, falcon: 87.78, sinLimit: 587, sinRisk: 3, sinBet: 307 },
          { category: 'Draw', radar: 3.60, falcon: 3.60, sinLimit: 50000, sinRisk: 1, sinBet: 88 },
          { category: 'Away', radar: 3.80, falcon: 5.00, sinLimit: 50000, sinRisk: 167, sinBet: 44 }
        ]
      },
      {
        option: 'Under +1.5',
        radar: 119.95,
        falcon: 119.95,
        sinLimit: 588,
        sinRisk: 0,
        sinBet: 0,
        data: [
          { category: 'Under', radar: 119.95, falcon: 119.95, sinLimit: 588, sinRisk: 0, sinBet: 0 },
          { category: 'Over', radar: 1.17, falcon: 1.17, sinLimit: 50000, sinRisk: 0, sinBet: 0 }
        ]
      },
      {
        option: 'Under +2.5',
        radar: 119.64,
        falcon: 119.64,
        sinLimit: 589,
        sinRisk: 0,
        sinBet: 0,
        data: [
          { category: 'Under', radar: 119.64, falcon: 119.64, sinLimit: 589, sinRisk: 0, sinBet: 0 },
          { category: 'Over', radar: 1.60, falcon: 1.60, sinLimit: 50000, sinRisk: 0, sinBet: 0 }
        ]
      },
      {
        option: 'Under +3.5',
        radar: 119.64,
        falcon: 119.64,
        sinLimit: 589,
        sinRisk: 0,
        sinBet: 0,
        data: [
          { category: 'Under', radar: 119.64, falcon: 119.64, sinLimit: 589, sinRisk: 0, sinBet: 0 },
          { category: 'Over', radar: 1.60, falcon: 1.60, sinLimit: 50000, sinRisk: 0, sinBet: 0 }
        ]
      },
      {
        option: 'Both Team To Score ',
        radar: 119.64,
        falcon: 119.64,
        sinLimit: 589,
        sinRisk: 0,
        sinBet: 0,
        data: [
          { category: 'Yes', radar: 119.64, falcon: 119.64, sinLimit: 589, sinRisk: 0, sinBet: 0 },
          { category: 'No', radar: 1.60, falcon: 1.60, sinLimit: 50000, sinRisk: 0, sinBet: 0 }
        ]
      }
    ];
  }

updateValue(field: string, row: any, event: Event): void {
    const inputValue = (event.target as HTMLElement).innerText.trim();
    const numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue)) {
      this.checkInputValidity(field, numericValue).subscribe(
        (response) => {
          if (response.isValid) {
            row[field] = null;
            row.error = false;
          } else {
            alert(response.message || 'Invalid value');
            row.error = true;
            (event.target as HTMLElement).innerText = row[field];
          }
        },
        (error) => {
          console.error('API error:', error);
          //alert('Error validating value. Please try again.');
          row.error = true;
          (event.target as HTMLElement).innerText = row[field];
        }
      );
    } else {
      alert('Please enter a valid number');
      (event.target as HTMLElement).innerText = row[field];
      row.error = true;
     
    }
  }

  checkInputValidity(field: string, value: number) {
    // we can update our end point here
    const apiUrl = 'https://your-api-endpoint/validate'; 
    const payload = { field, value };

    return this.http.post<{ isValid: boolean; message?: string }>(apiUrl, payload);
  }

  handleCellKeydown(
    event: KeyboardEvent,
    optionIndex: number,
    rowIndex: number,
    cellIndex: number
  ): void {
    const numCols = 20;
    let nextOptionIndex = optionIndex;
    let nextRowIndex = rowIndex;
    let nextColIndex = cellIndex;

    const currentGroup = this.tableData[optionIndex];
    const numRowsInGroup = currentGroup.data.length;

    if (event.key === 'ArrowDown') {
      if (rowIndex + 1 < numRowsInGroup) {
        nextRowIndex = rowIndex + 1;
      } else if (optionIndex + 1 < this.tableData.length) {
        nextOptionIndex = optionIndex + 1;
        nextRowIndex = 0;
      }
    } else if (event.key === 'ArrowUp') {
      if (rowIndex - 1 >= 0) {
        nextRowIndex = rowIndex - 1;
      } else if (optionIndex - 1 >= 0) {
        nextOptionIndex = optionIndex - 1;
        nextRowIndex = this.tableData[nextOptionIndex].data.length - 1;
      }
    } else if (event.key === 'ArrowRight') {
      if (cellIndex + 1 < numCols) {
        nextColIndex = cellIndex + 1;
      }
    } else if (event.key === 'ArrowLeft') {
      if (cellIndex - 1 >= 0) {
        nextColIndex = cellIndex - 1;
      }
    }

    const nextCell = document.querySelector(
      `[tabindex="${this.getCellTabIndex(nextOptionIndex, nextRowIndex, nextColIndex)}"]`
    ) as HTMLElement;

    if (nextCell) {
      event.preventDefault();
      nextCell.focus();
    }
  }

getCellTabIndex(optionIndex: number, rowIndex: number, cellIndex: number): number {
  return optionIndex * 1000 + rowIndex * 10 + cellIndex;
}

onEditComplete(event: any): void {
  console.log('Edit Complete:', event);
}
}
