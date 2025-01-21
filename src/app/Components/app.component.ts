import { Component } from '@angular/core';
import { EmployeeService } from '../Service/employee.service';
import {Iemployees} from '../Models/IEmployes';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GN3-FrontEnd';

  public EmployeesList : Array<Iemployees> = [];

  constructor(private EmployeeService:EmployeeService,
    public dialog: MatDialog
  ){}

  public LoadData(){
    this.EmployeeService.ReadEmployee().subscribe(
      response => {
        console.log(response)
        this.EmployeesList=response;
      },
      error => {
        console.log(error);
      }
    )

  }
  ngOnInit(): void {
    this.LoadData();
  }

  public add(Title:string,employee?:Iemployees){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '80%',
      height: '80%',
      panelClass: 'custom-dialog-container',
      data: { employee , title:Title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.LoadData();
    });
  }
}
