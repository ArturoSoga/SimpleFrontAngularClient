import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { Iemployees } from '../Models/IEmployes';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private GeneralService : GeneralService) { }

  public  ReadEmployee():Observable<any>{
    return this.GeneralService.ApiGet("Employees/ReadEmployee");
  }

  //Como esto pertenece a otro objeto de tipo va con otro servicio con la convencion del mismo nommbre de tipo es decir (DepartmentService) 
  //lo dejare asi por tiempo 
  public ReadDepartment():Observable<any>{
    return this.GeneralService.ApiGet("Catalogs/ReadDepartament");
  }

  public UpdateEmployee(ObjRequest:Iemployees):Observable<any>{
    return this.GeneralService.ApiPost("Employees/UpdateEmployee",ObjRequest);
  }

  public CreateEmployee(ObjRequest:Iemployees):Observable<any>{
    return this.GeneralService.ApiPost("Employees/CreateEmployee",ObjRequest);
  }

}
