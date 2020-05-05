import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { patients } from '../patients';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  dataSource = new MatTableDataSource(patients);
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog() {
    console.log('open add dialog');
  }
  startEdit(
    i: number,
    id: number,
    title: string,
    state: string,
    url: string,
    created_at: string,
    updated_at: string
  ) {
    console.log('start edit');
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    console.log('delete item');
  }
}
