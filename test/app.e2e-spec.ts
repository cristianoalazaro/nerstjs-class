import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterDto } from '../src/testing/auth-register-dto.mock';
import datasource from '../typeorm/data-source';
import { Role } from '../src/enums/role.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  //let accessToken: string;
  //let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('register new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDto);

    expect(response.statusCode).toEqual(201);
    //expect(typeof response.body.accesToken).toEqual('string');
  });

  it('try to login with new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDto.email,
        password: authRegisterDto.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('try to get users list without permission', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('changing user handling to admin', async () => {
    const ds = await datasource.initialize();

    const queryRunner = ds.createQueryRunner();

    /*userId = await queryRunner.query(`
      SELECT MAX(id) AS id FROM users
    `);*/

    await queryRunner.query(`
      UPDATE users SET role = ${Role.Admin.toString()}
      WHERE id = 1;
    `);

    const rows = await queryRunner.query(`
      SELECT * FROM users;
    `);

    ds.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('trying get users with permission', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).not.toEqual(0);
  });
});
