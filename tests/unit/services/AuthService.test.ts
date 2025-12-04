import { IUserRepository } from "../../../src/domain/interfaces/IUserRepository";
import { RegisterDto } from "../../../src/dtos/RegisterDto";
import { AuthService } from "../../../src/services/AuthService";

jest.mock('bycryptjs');
jest.mock('jsonwebtoken');

describe('AuthService - Unit test', () => {
    // ARRANGE
    let authService: AuthService;
    let mockUserRepository: jest.Mocked<IUserRepository>;
  
    const validRegisterDto: RegisterDto = {
      email: 'sofia@testing.com',
      password: 'academynode',
      name: 'Sofia Testing'
    }

    const hashedPassword = 'hashed_academynode_123'
});