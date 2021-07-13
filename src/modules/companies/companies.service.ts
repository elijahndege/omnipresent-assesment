import MOCK_COMPANIES from '@data/companies';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CountriesService } from '@src/shared/services/countries.service';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employee.entity';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly countriesService: CountriesService,
  ) {}

  findAll(): Company[] {
    return MOCK_COMPANIES;
  }

  findOne(companyId: number): Company {
    return this.findAll().find((company) => company.id === companyId);
  }

  async companyEmployees(companyId: number): Promise<Employee[]> {
    if (![1, 2].includes(Number(companyId))) {
      throw new NotFoundException('Invalid company id');
    }
    const resolvedEmployees: Employee[] = [];
    const employees = this.currentCompanyEmployees(companyId);
    for (const employee of employees) {
      const countryObj = await this.countriesService.fetchCountryFromCache(
        employee.countryCode,
      );
      if (countryObj?.region === 'Asia' || countryObj?.region === 'Europe') {
        employee.identifier = `${employee.firstName.toLowerCase()}${employee.lastName.toLowerCase()}${employee.dateOfBirth
          .split('/')
          .join('')}`;
      }
      const { countryCode, companyId, ...newObj } = employee;
      newObj.company = this.findOne(employee.companyId);
      newObj.country = countryObj;
      resolvedEmployees.push(newObj);
    }

    return resolvedEmployees;
  }

  currentCompanyEmployees(companyId: number): Employee[] {
    return this.employeesService.findAll().filter((employee) => {
      return employee.companyId === Number(companyId);
    });
  }
}
