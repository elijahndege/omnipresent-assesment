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
    const employees: Employee[] = [];
    const companyEmployees = this.currentCompanyEmployees(companyId);
    for (const companyEmployee of companyEmployees) {
      const employObj = new Employee({
        firstName: companyEmployee.firstName,
        lastName: companyEmployee.lastName,
        dateOfBirth: companyEmployee.dateOfBirth,
        jobTitle: companyEmployee.jobTitle,
        company: this.findOne(companyEmployee.companyId),
        country: companyEmployee.countryCode,
        identifier: '',
      });
      const countryObj = await this.countriesService.fetchCountryFromCache(
        companyEmployee.countryCode,
      );
      employObj.country = countryObj;
      if (countryObj?.region === 'Asia' || countryObj?.region === 'Europe') {
        employObj.identifier = `${companyEmployee.firstName.toLowerCase()}${companyEmployee.lastName.toLowerCase()}${companyEmployee.dateOfBirth
          .split('/')
          .join('')}`;
      }

      employees.push(employObj);
    }

    return employees;
  }

  currentCompanyEmployees(companyId: number) {
    return this.employeesService.findAll().filter((employee) => {
      return employee.companyId === Number(companyId);
    });
  }
}
