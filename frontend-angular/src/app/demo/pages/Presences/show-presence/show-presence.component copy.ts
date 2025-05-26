import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresenceService } from 'src/app/services/presence.service';
import { UserService } from 'src/app/services/user.service';
import { Presence } from 'src/app/models/presence.model ';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-presence-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.scss']
})
export class PresenceListComponent implements OnInit {
  attendanceRecords: Presence[] = [];
  filteredRecords: Presence[] = [];
  employees: User[] = [];

  employeeFilter: string = '';
  dateFilter: Date | null = null;
  statusFilter: string = '';

  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendanceRecords();
  }

  loadEmployees(): void {
    this.userService.getAllUsers().subscribe({
      next: users => this.employees = users,
      error: err => console.error('Erreur chargement utilisateurs', err)
    });
  }

  loadAttendanceRecords(): void {
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
      const dateMatch = this.dateFilter ? new Date(record.date).toDateString() === new Date(this.dateFilter).toDateString() : true;
      const statusMatch = this.statusFilter ? record.status === this.statusFilter : true;

      return employeeMatch && dateMatch && statusMatch;
    });
  }

  getEmployeeName(id: string): string {
    const employee = this.employees.find(e => e._id === id);
    return employee ? employee.name : 'Inconnu';
  }

  calculateWorkingHours(arrival: string, departure: string): string {
    if (!arrival || !departure) return 'N/A';
    
    const arrivalTime = new Date(`1970-01-01T${arrival}`);
    const departureTime = new Date(`1970-01-01T${departure}`);
    
    const diffMs = departureTime.getTime() - arrivalTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
}
