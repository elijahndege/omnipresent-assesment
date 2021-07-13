import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './modules/employees/employees.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [EmployeesModule, CompaniesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
