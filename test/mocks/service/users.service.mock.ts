import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from "../../../src/service/users/users.service";

const usersServiceMock = async (
    mockUsersService: unknown
): Promise<UsersService> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: UsersService,
                useValue: mockUsersService
            }
        ]
    }).compile();
    return module.get<UsersService>(UsersService);
};

export default usersServiceMock;
