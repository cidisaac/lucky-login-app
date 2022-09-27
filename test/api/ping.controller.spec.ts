import {Test, TestingModule} from '@nestjs/testing';
import {PingController} from "../../src/api/controllers/ping.controller";

describe('PingController', () => {
    let appController: PingController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PingController],
        }).compile();

        appController = app.get<PingController>(PingController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.ping()).toBe('UP & RUNNING');
        });
    });
});
