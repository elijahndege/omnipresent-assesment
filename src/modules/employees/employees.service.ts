import MOCK_EMPLOYEES from '@data/employees';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  findAll() {
    return MOCK_EMPLOYEES;
  }
}
