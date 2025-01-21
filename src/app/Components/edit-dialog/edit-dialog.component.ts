import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Service/employee.service';
import { IDepartment } from 'src/app/Models/IDepartment';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit{
  data = inject(DIALOG_DATA)
  myForm: FormGroup
  public DepartmentList : Array<IDepartment> = [];

  constructor(private formBuilder: FormBuilder,
    private EmployeeService: EmployeeService,
    private MatDialogRef:MatDialogRef<EditDialogComponent>
  ){
    this.myForm = this.formBuilder.group({
      EmplName: [this.data.title == "Nuevo Empleado" ? '' : this.data.employee.emplName, Validators.required],
      emplId:[this.data.title == "Nuevo Empleado" ? 0 : this.data.employee.emplId, Validators.required],
      EmplSecondName: [this.data.title == "Nuevo Empleado" ? '' : this.data.employee.emplSecondName, Validators.required],
      EmplLastName: [this.data.title == "Nuevo Empleado" ? '' : this.data.employee.emplLastName, Validators.required],
      EmplHireDate: [this.data.title == "Nuevo Empleado" ? '' : this.data.employee.emplHireDate, [Validators.required]],
      EmplBirthDate: [this.data.title == "Nuevo Empleado" ? '' : this.data.employee.emplBirthDate, [Validators.required]],
      DepaId:[this.data.title == "Nuevo Empleado" ? 0 : this.data.employee.emplId, [Validators.required]],
      EmplActive:[this.data.title == "Nuevo Empleado" ? false : this.data.employee.emplActive, [Validators.required]]
    });
  }

  public LoadDepartments(){
    this.EmployeeService.ReadDepartment().subscribe(
      response => {
        console.log(response)
        this.DepartmentList=response;
      },
      error => {
        console.log(error);
      }
    )

  }

  ngOnInit(): void {
    if(this.data.title == "Nuevo Empleado" || this.data.title == "Editar Empleado"){
      this.LoadDepartments()
    }
  }

    onSubmit(): void {
      if (this.myForm.valid) {
        console.log(this.myForm.value);
        if(this.data.title == "Nuevo Empleado" ){
          console.log("submit",this.myForm.value)
          this.EmployeeService.CreateEmployee(this.myForm.value).subscribe(
            Resp => {
              console.log(Resp)
              this.MatDialogRef.close()
            },
            error => {
              console.log(error);
              alert("Error!")
            }
          )
        }else if(this.data.title == "Editar Empleado"){
          console.log("submit",this.myForm.value)
          this.EmployeeService.UpdateEmployee(this.myForm.value).subscribe(
            Resp => {
              console.log(Resp)
              this.MatDialogRef.close()
            },
            error => {
              console.log(error);
              alert("Error!")
            }
          )
          
        }
      } else {
        console.log('Formulario no válido');
      }
    }

}
