import {Test, TestingModule} from '@nestjs/testing';
import AuthService from "../../../src/service/auth/auth.service";

const authServiceMock = async (
    mockAuthService: unknown
): Promise<AuthService> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: AuthService,
                useValue: mockAuthService
            }
        ]
    }).compile();
    return module.get<AuthService>(AuthService);
};

export default authServiceMock;
