import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PresenceService } from 'src/app/services/presence.service';
import { User } from 'src/app/models/user.model';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { NewPresence, Presence } from 'src/app/models/presence.model ';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-presence',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './add-presence.component.html',
  styleUrls: ['./add-presence.component.scss']
})

export class UserPresenceComponent implements OnInit {
  attendanceForm: FormGroup;
  employees: User[] = [];
  attendanceRecords: Presence[] = [];
  filteredRecords: Presence[] = [];
  currentDate: Date = new Date();
  isGeneratingReport: boolean = false;
  reportData: any;

  // Filters
  employeeFilter: string = '';
  dateFilter: Date | null = null;
  statusFilter: string = '';

  constructor(
    private fb: FormBuilder,
    private attendanceService: PresenceService,
    private userService: UserService
    //notification service
  ) {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date(), Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: [''],
      status: ['present', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendanceRecords();
  }

  loadEmployees(): void {
    //this.attendanceService.getAllEmployees() => add getAllEmp from presence
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.employees = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  loadAttendanceRecords(): void {
    
    this.attendanceService.getAllPresences().subscribe({
      next: (records) => {
        this.attendanceRecords = records;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
    /* this.attendanceService.getAllPresences().subscribe(
      next: (records) => {
        this.attendanceRecords = records;
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading attendance records:', error);
      }
    ); */
  }

  submitAttendance(): void {
    if (this.attendanceForm.valid) {
      const formData = this.attendanceForm.value;
      
      this.attendanceService.createPresence(formData).subscribe(
        (response) => {
          //this.notificationService.showSuccess('Attendance record saved successfully');
          this.loadAttendanceRecords();
          this.attendanceForm.reset({
            date: new Date(),
            status: 'present'
          });
          
          // Check for late arrivals or unusual patterns
          this.checkForAttendanceIssues(formData);
        },
        (error) => {
          //this.notificationService.showError('Error saving attendance record');
        }
      );
    }
  }

  checkForAttendanceIssues(record: any): void {
    /*const employee = this.employees.find(e => e.id === record.employeeId);
    if (!employee) return;

    // Check for late arrival
    if (record.status === 'present' && record.arrivalTime) {
      const arrival = new Date(`${record.date} ${record.arrivalTime}`);
      const expectedArrival = new Date(`${record.date} ${employee.expectedArrivalTime}`);
      
      if (arrival > expectedArrival) {
        const minutesLate = Math.floor((arrival.getTime() - expectedArrival.getTime()) / (1000 * 60));
        this.notificationService.sendLateNotification(employee, minutesLate);
      }
    }

    // Check for absence
    if (record.status === 'absent') {
      //this.notificationService.sendAbsenceNotification(employee);
    }

    // Check for overtime
    if (record.departureTime) {
      const departure = new Date(`${record.date} ${record.departureTime}`);
      const expectedDeparture = new Date(`${record.date} ${employee.expectedDepartureTime}`);
      
      if (departure > expectedDeparture) {
        const minutesOvertime = Math.floor((departure.getTime() - expectedDeparture.getTime()) / (1000 * 60));
        if (minutesOvertime > 30) { // Only notify for significant overtime
          //this.notificationService.sendOvertimeNotification(employee, minutesOvertime);
        }
      }
    }*/
  }

  applyFilters(): void {
    /*this.filteredRecords = this.attendanceRecords.filter(record => {
      const employeeMatch = this.employeeFilter ? 
        record.employeeId === this.employeeFilter : true;
      
      const dateMatch = this.dateFilter ?
        new Date(record.date).toDateString() === this.dateFilter.toDateString() : true;
      
      const statusMatch = this.statusFilter ?
        record.status === this.statusFilter : true;
      
      return employeeMatch && dateMatch && statusMatch;
    });*/
  }

  generateReport(): void {
    this.isGeneratingReport = true;
    /*this.attendanceService.generateAttendanceReport({
      employeeFilter: this.employeeFilter,
      dateFilter: this.dateFilter,
      statusFilter: this.statusFilter
    }).subscribe(
      (report) => {
        this.reportData = report;
        this.isGeneratingReport = false;
        //this.notificationService.showSuccess('Report generated successfully');
      },
      (error) => {
        this.isGeneratingReport = false;
        //this.notificationService.showError('Error generating report');
      }
    );*/
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
