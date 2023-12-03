import { UserRepository } from '../../src/domain/repositories/user.repository';
import { LoginUsecase } from '../../src/usecases/auth/login.usecase';
import { IBcryptService } from '../../src/domain/adapters/bcrypt.interface';
import { IExceptionService } from '../../src/domain/adapters/exception.interface';
import { IJwtService } from '../../src/domain/adapters/jwt.interface';
import { User } from '../../src/domain/model/user.model';
import { RegisterUsecase } from '../../src/usecases/auth/register.usecase';
import { IsAuthenticatedUsecase } from '../../src/usecases/auth/is-authenticated';

describe('AuthUsecase', () => {
  let userRepository: UserRepository;
  let bcryptService: IBcryptService;
  let jwtService: IJwtService;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    userRepository = {} as UserRepository;
    userRepository.findByEmail = jest.fn();
    userRepository.create = jest.fn();
    userRepository.findById = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.compare = jest.fn();
    bcryptService.hash = jest.fn();

    jwtService = {} as IJwtService;
    jwtService.sign = jest.fn();
    jwtService.verify = jest.fn();

    exceptionService = {} as IExceptionService;
    exceptionService.unauthorizedException = jest.fn();
  });

  describe('LoginUsecase', () => {
    let loginUsecase: LoginUsecase;

    beforeEach(() => {
      loginUsecase = new LoginUsecase(
        userRepository,
        bcryptService,
        jwtService,
        exceptionService,
      );
    });

    it('should return accessToken', async () => {
      // Given
      const email = 'test@domain.com';
      const password = 'mystrongpassword';
      const user = new User();
      user.id = 1;
      user.email = email;
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(bcryptService, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

      // When
      const result = await loginUsecase.exec(email, password);

      // Then
      expect(result).toStrictEqual({
        token_type: 'Bearer',
        expiresIn: '1h',
        accessToken: 'token',
        refreshToken: 'token',
      });
    });

    it('should throw an error cause user is not found', async () => {
      // Given
      const unauthorizedExceptionSpy = jest.spyOn(
        exceptionService,
        'unauthorizedException',
      );
      const email = 'test@domain.com';
      const password = 'mystrongpassword';
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockImplementation(() => Promise.resolve(null));

      // When
      await loginUsecase.exec(email, password);

      // Then
      expect(unauthorizedExceptionSpy).toHaveBeenCalled();
    });

    it('should throw an error cause password is incorrect', async () => {
      // Given
      const unauthorizedExceptionSpy = jest.spyOn(
        exceptionService,
        'unauthorizedException',
      );
      const email = 'test@domain.com';
      const password = 'mystrongpassword';
      const user = new User();
      user.id = 1;
      user.email = email;
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(bcryptService, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      // When
      await loginUsecase.exec(email, password);

      // Then
      expect(unauthorizedExceptionSpy).toHaveBeenCalled();
    });
  });

  describe('RegisterUsecase', () => {
    let registerUsecase: RegisterUsecase;

    beforeEach(() => {
      registerUsecase = new RegisterUsecase(userRepository, bcryptService);
    });

    it('should return user with password hashed', async () => {
      // Given
      const user = new User();
      user.id = 1;
      user.email = 'test@domain.com';
      user.password = 'mystrongpassword';
      jest
        .spyOn(bcryptService, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));
      jest
        .spyOn(userRepository, 'create')
        .mockImplementation(() => Promise.resolve(user));

      // When
      const result = await registerUsecase.exec(user);

      // Then
      expect(result.id).toBe(1);
      expect(result.email).toBe(user.email);
      expect(result.password).toBe('hashedPassword');
    });
  });

  describe('IsAuthenticatedUsecase', () => {
    let isAuthenticatedUsecase: IsAuthenticatedUsecase;

    beforeEach(() => {
      isAuthenticatedUsecase = new IsAuthenticatedUsecase(
        userRepository,
        jwtService,
      );
    });

    it('should authenticate user', async () => {
      // Given
      const token = 'token';
      const user = new User();
      user.id = 1;
      jest
        .spyOn(jwtService, 'verify')
        .mockImplementation(() => Promise.resolve({ sub: user.id }));
      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(() => Promise.resolve(user));

      // When
      const result = await isAuthenticatedUsecase.exec(token);

      // Then
      expect(result).toBeTruthy();
    });

    it('should not authenticate user', async () => {
      // Given
      const token = 'token';
      const user = new User();
      user.id = 1;
      jest
        .spyOn(jwtService, 'verify')
        .mockImplementation(() => Promise.resolve({ sub: user.id }));
      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(() => Promise.resolve(null));

      // When
      const result = await isAuthenticatedUsecase.exec(token);

      // Then
      expect(result).toBeFalsy();
    });
  });
});
