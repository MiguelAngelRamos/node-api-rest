import { User } from "../../../src/domain/entities/User";
import { IUserRepository } from "../../../src/domain/interfaces/IUserRepository";
import { RegisterDto } from "../../../src/dtos/RegisterDto";
import { AuthService } from "../../../src/services/AuthService";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

    const hashedPassword = 'hashed_academynode_123';
    const mockToken = 'mock_jwt_token_123';

    beforeEach(() => {
      mockUserRepository = {
        findByEmail: jest.fn(),
        create: jest.fn()
      }
      authService = new AuthService(mockUserRepository);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    describe('register()', ()=> {
      it('deberia registar a un nuevo usuario de manera exitosa y retornar el jwt', async () => {
        
        const expectedUser = new User(
          expect.any(String),
          validRegisterDto.email,
          hashedPassword,
          validRegisterDto.name          
        );

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.create.mockResolvedValue(expectedUser);

      })
    })

   

});