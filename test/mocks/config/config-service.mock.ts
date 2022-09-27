import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import * as test from '../../../src/config/test.json';

interface JSONInterface {
    [key: string]:
        | string
        | number
        | boolean
        | JSONInterface
        | string[]
        | number[]
        | boolean[]
        | Record<string, unknown>
        | JSONInterface[];
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
function getElem<T>(obj: T, path: string, defaultValue = undefined) {
    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .reduce((res: any, key: string) => {
                if (res !== null && res !== undefined) {
                    return res[key];
                }
                return res;
            }, obj);

    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

    return result === undefined || result === obj ? defaultValue : result;
}

const createConfigMock = async (): Promise<ConfigService> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: ConfigService,
                useValue: {
                    get: (key: string) => {
                        const value = getElem<JSONInterface>(test, key);
                        if (value === undefined) {
                            throw new Error(
                                `Config-Service Mock: Key "${key}" not found in test.json, add it!`
                            );
                        }
                        return value;
                    }
                }
            }
        ]
    }).compile();

    return module.get<ConfigService>(ConfigService);
};

export default createConfigMock;
