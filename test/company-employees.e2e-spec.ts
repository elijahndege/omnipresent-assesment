import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { CompaniesModule } from '@src/modules/companies/companies.module';
import { CompaniesService } from '@src/modules/companies/companies.service';

describe('Company Employees', () => {
  let app: INestApplication;
  const companiesService = {
    companyEmployees: () => [
      {
        firstName: 'Roy',
        lastName: 'Testerton',
        dateOfBirth: '19/02/1990',
        jobTitle: 'Software developer',
        company: {
          id: 1,
          name: 'Test co',
        },
        country: {
          alphaCode: 'US',
          name: 'United States of America',
          region: 'Americas',
          currencies: [
            {
              code: 'USD',
              name: 'United States dollar',
              symbol: '$',
            },
          ],
          languages: [
            {
              iso639_1: 'en',
              iso639_2: 'eng',
              name: 'English',
              nativeName: 'English',
            },
          ],
          timezones: [
            'UTC-12:00',
            'UTC-11:00',
            'UTC-10:00',
            'UTC-09:00',
            'UTC-08:00',
            'UTC-07:00',
            'UTC-06:00',
            'UTC-05:00',
            'UTC-04:00',
            'UTC+10:00',
            'UTC+12:00',
          ],
        },
        identifier: '',
      },
      {
        firstName: 'Lisa',
        lastName: 'Testora',
        dateOfBirth: '11/07/1984',
        jobTitle: 'CTO',
        company: {
          id: 1,
          name: 'Test co',
        },
        country: {
          alphaCode: 'GBR',
          name: 'United Kingdom of Great Britain and Northern Ireland',
          region: 'Europe',
          currencies: [
            {
              code: 'GBP',
              name: 'British pound',
              symbol: '£',
            },
          ],
          languages: [
            {
              iso639_1: 'en',
              iso639_2: 'eng',
              name: 'English',
              nativeName: 'English',
            },
          ],
          timezones: [
            'UTC-08:00',
            'UTC-05:00',
            'UTC-04:00',
            'UTC-03:00',
            'UTC-02:00',
            'UTC',
            'UTC+01:00',
            'UTC+02:00',
            'UTC+06:00',
          ],
        },
        identifier: 'lisatestora11071984',
      },
    ],
  };

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [CompaniesModule],
    })
      .overrideProvider(CompaniesService)
      .useValue(companiesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[GET] /companies/1/employees', () => {
    return request(app.getHttpServer())
      .get('/companies/1/employees')
      .expect(200)
      .expect(companiesService.companyEmployees);
  });

  afterAll(async () => {
    await app.close();
  });
});
