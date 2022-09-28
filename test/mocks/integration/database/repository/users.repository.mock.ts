import {Test, TestingModule} from '@nestjs/testing';
import UsersRepository from "../../../../../src/integration/database/repository/users.repository";

const usersRepositoryMock = async (
    mockUsersRepository: unknown
): Promise<UsersRepository> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: UsersRepository,
                useValue: mockUsersRepository
            }
        ]
    }).compile();
    return module.get<UsersRepository>(UsersRepository);
};

export default usersRepositoryMock;
