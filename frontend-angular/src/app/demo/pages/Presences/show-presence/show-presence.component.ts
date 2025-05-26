import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresenceService } from 'src/app/services/presence.service';
import { UserService } from 'src/app/services/user.service';
import { Presence } from 'src/app/models/presence.model ';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-show-presence',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './show-presence.component.html',
  styleUrls: ['./show-presence.component.scss']
})
export class ShowPresenceComponent implements OnInit {
  attendanceRecords: Presence[] = [];
  filteredRecords: Presence[] = [];
  employees: User[] = [];

  employeeFilter: string = '';
  dateFilter: string = '';
  statusFilter: string = '';

  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendances();
  }

  loadEmployees(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.employees = users.filter(u => u.role?.name === 'employee');
      },
      error: err => console.error('Erreur chargement utilisateurs', err)
    });
  }

  loadAttendances(): void {
    this.presenceService.getAllPresences().subscribe({
      next: records => {
        this.attendanceRecords = records;
        this.applyFilters();
      },
      error: err => console.error('Erreur chargement présences', err)
    });
  }

  applyFilters(): void {
    this.filteredRecords = this.attendanceRecords.filter(record => {
      const employeeMatch = this.employeeFilter ? record.user === this.employeeFilter : true;
      const dateMatch = this.dateFilter ? record.date === this.dateFilter : true;
      const statusMatch = this.statusFilter ? record.status === this.statusFilter : true;
      return employeeMatch && dateMatch && statusMatch;
    });
  }

 getEmployeeName(user: string | User): string {
  const userId = typeof user === 'string' ? user : user._id;
  const foundUser = this.employees.find(e => e._id === userId);
  return foundUser ? foundUser.name : 'Inconnu';
}

  calculateWorkingHours(arrival: string, departure?: string): string {
    if (!arrival || !departure) return 'N/A';
    const start = new Date(`1970-01-01T${arrival}`);
    const end = new Date(`1970-01-01T${departure}`);
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
}
