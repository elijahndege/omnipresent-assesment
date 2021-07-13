import { Controller, Get, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService) { }

  @Get(':id/employees')
  companyEmployees(@Param('id') companyId: number) {
    return this.companiesService.companyEmployees(companyId);
  }
}
