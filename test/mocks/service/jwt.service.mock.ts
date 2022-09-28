import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from "@nestjs/jwt";

const jwtServiceMock = async (
    mockJwtService: unknown
): Promise<JwtService> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: JwtService,
                useValue: mockJwtService
            }
        ]
    }).compile();
    return module.get<JwtService>(JwtService);
};

export default jwtServiceMock;
