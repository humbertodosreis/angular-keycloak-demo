import { Component, OnInit } from '@angular/core';
import { patients } from '../patients';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  patients = patients;

  constructor() {}

  ngOnInit(): void {}
}
