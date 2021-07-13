import { Company } from '@src/modules/companies/entities/company.entity';
import { Country } from '../../../common/interfaces/country.interface';

export class Employee {
  constructor(intialData: Partial<Employee> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  countryCode?: string;
  companyId?: number;
  country?: Country;
  company?: Company;
  identifier?: string;
}
