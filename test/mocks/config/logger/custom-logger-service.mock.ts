import {Test, TestingModule} from '@nestjs/testing';
import {CustomLogger} from "../../../../src/config/logger/custom-logger.service";

const customLoggerMock = async (
    mockCustomLogger: unknown
): Promise<CustomLogger> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: CustomLogger,
                useValue: mockCustomLogger
            }
        ]
    }).compile();
    return module.get<CustomLogger>(CustomLogger);
};

export default customLoggerMock;
