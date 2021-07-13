import MOCK_COMPANIES from '@data/companies';
import { Injectable } from '@nestjs/common';
import { CountriesService } from '@src/shared/services/countries.service';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employee.entity';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {

  constructor(
    private readonly employeesService: EmployeesService,
    private readonly countriesService: CountriesService
  ) {

  }

  findAll(): Company[] {
    return MOCK_COMPANIES;
  }

  async companyEmployees(companyId: number):Promise<Employee[]> {
    const companies = this.findAll();

    // Filter employee by company
    const companyEmployees: Employee[] = this.employeesService.findAll().filter(employee => {
      return employee.companyId === Number(companyId)
    });

    const resolvedEmployees = [];
    for (const employee of companyEmployees) {
      const obj = companies.find(company => company.id === employee.companyId);
      const countryObj = await this.countriesService.fetchCountryFromCache(employee.countryCode);
      if (countryObj?.region === 'Asia' || countryObj?.region === 'Europe') {
        employee.identifier = `${employee.firstName.toLowerCase()}${employee.lastName.toLowerCase()}${employee.dateOfBirth.split('/').join('')}`;
      }
      const { countryCode, companyId, ...newObj } = employee;
      newObj.company = obj;
      newObj.country = countryObj;
      resolvedEmployees.push(newObj)
    };
    return resolvedEmployees;
  }
}
