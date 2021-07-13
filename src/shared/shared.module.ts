import { Module, Global, HttpModule } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { ConfigService } from './services/config.service';
import { BaseConfigService } from './services/base-config.service';
import { CountriesService } from './services/countries.service';



@Global()
@Module({
    imports: [HttpModule],
    providers: [
        BaseConfigService,
        ConfigService,
        RedisService,
        CountriesService,
        {
            provide: 'CONFIG_OPTIONS',
            useFactory: (baseConfigService: BaseConfigService) =>
                baseConfigService.getEnvs(),
            inject: [BaseConfigService],
        },
    ],
    exports: [ConfigService, RedisService, CountriesService]
})
export class SharedModule { }
