import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/api/controllers/users.controller';
import { UsersService } from '../../src/service/users/users.service';

describe('AppController', () => {
  let appController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.ping()).toBe('UP & RUNNING');
    });
  });
});
