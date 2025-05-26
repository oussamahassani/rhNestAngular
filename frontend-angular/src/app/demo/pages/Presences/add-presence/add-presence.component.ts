// presence-add.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PresenceService } from 'src/app/services/presence.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-presence',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './add-presence.component.html',
  styleUrls: ['./add-presence.component.scss']
})

export class PresenceAddComponent implements OnInit {
  attendanceForm!: FormGroup;
  employees: User[] = [];

  constructor(
    private fb: FormBuilder,
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();
  }

  initForm(): void {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: [''],
      status: ['', Validators.required],
      notes: ['']
    });
  }

  loadEmployees(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.employees = users.filter(user => user.role?.name === 'employee');
      },
      error: err => console.error('Erreur chargement utilisateurs', err)
    });
  }

  submitAttendance(): void {
    if (this.attendanceForm.invalid) return;

    this.presenceService.createPresence(this.attendanceForm.value).subscribe({
      next: () => {
        alert('Présence enregistrée avec succès');
        this.attendanceForm.reset();
      },
      error: err => console.error('Erreur enregistrement présence', err)
    });
  }
}
