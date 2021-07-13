import MOCK_EMPLOYEES from '@data/employees';
import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  findAll(): Employee[] {
    return MOCK_EMPLOYEES;
  }
}
