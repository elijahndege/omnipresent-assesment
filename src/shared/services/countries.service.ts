import { BadRequestException, HttpService, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RedisContext } from "@src/common/enums/redis-context";
import { Country } from "@src/common/interfaces/country.interface";
import { ConfigService } from "./config.service";
import { RedisService } from "./redis.service";

@Injectable()
export class CountriesService {

    constructor(
        private readonly _configs: ConfigService,
        private readonly httpService: HttpService,
        private readonly redisService: RedisService
    ) { }

    async getCountry(countryCode: string) {
        const url = `${this._configs.countriesBaseUrl}/alpha/${countryCode}`;
        const response = await this.httpService.get(url).toPromise();
        return response.data;
    }

    async cacheCountryCode(countryCode: string) {
        if (!countryCode) {
            throw new BadRequestException('Invalid country code')
        }
        const country = await this.getCountry(countryCode);

        if (country) {
            const countryDetails: Country = {
                alphaCode: countryCode,
                name: country.name,
                region: country.region,
                currencies: country.currencies,
                languages: country.languages,
                timezones: country.timezones,

            }
            const savedCountry = await this.redisService.setEx(
                `${RedisContext.COUNTRIES}:${countryCode}`,
                3600,
                JSON.stringify(countryDetails),
            );

            if (!savedCountry) {
                throw new InternalServerErrorException(
                    'Error occured while processing request',
                );
            }
        }
    }

    async fetchCountryFromCache(countryCode: string): Promise<Country> {
        let countryFromCache: Country;
        const stringifiedPayload = await this.redisService.get(
            `${RedisContext.COUNTRIES}:${countryCode}`,
        );
        if (!stringifiedPayload) {
            await this.cacheCountryCode(countryCode);
            const stringifiedProviderObj = await this.redisService.get(
                `${RedisContext.COUNTRIES}:${countryCode}`,
            );
            countryFromCache = JSON.parse(stringifiedProviderObj);
        } else {
            countryFromCache = JSON.parse(stringifiedPayload);
        }
        return countryFromCache;
    }
}

