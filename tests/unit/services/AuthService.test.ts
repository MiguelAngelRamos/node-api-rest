import { User } from "../../../src/domain/entities/User";
import { IUserRepository } from "../../../src/domain/interfaces/IUserRepository";
import { RegisterDto } from "../../../src/dtos/RegisterDto";
import { AuthService } from "../../../src/services/AuthService";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
jest.mock('bcryptjs');
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

    /**
     * SETUP: El beforeEach se ejecuta antes de cada test
     * Cada test empieza con un estado limpio
     */
    beforeEach(() => {
      mockUserRepository = {
        findByEmail: jest.fn(), // Graba en findByEmail.mocks.calls
        create: jest.fn() // Graba en create.mocks.calls
      }
      /**
       * Los *.mocks.calls son un historial que graba todos los argumentos de cada llamada a la función
       * 1. Verifica que parametros recibio
       * 2. Cuantas veces fue llamado
       * 3. Tambien el orden de llamadas
       */
      authService = new AuthService(mockUserRepository);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    })

    /**TEARDOWN: afeterEach limpia despues de cada test */
    afterEach(() => {
      jest.clearAllMocks(); // Esta función resetea COMPLEMENTAMENTE el estado de todos los mocks
    })

    describe('register()', ()=> {
      it('deberia registar a un nuevo usuario de manera exitosa y retornar el jwt', async () => {
        
        // ARRANGE: Preparar datOs y comportamiento esperado
        // nota: tambien reutilizamos codigo de beforeEach
        const expectedUser = new User(
          expect.any(String),
          validRegisterDto.email,
          hashedPassword,
          validRegisterDto.name          
        );

        // Mock : Usuario no existente en la base de dtos
        // le pasamos null por que simulamos que el usuario no existe
        mockUserRepository.findByEmail.mockResolvedValue(null);

        // Mock: de creacion exitosa
        // Esto quiere decir que cuando se cree un usuario debe devolver el expectedUser
        mockUserRepository.create.mockResolvedValue(expectedUser);

        // ACT: Ejecutar la funcionaidad que deseamos testear "register"

        const result = await authService.register(validRegisterDto);

        expect(result).toHaveProperty('token', mockToken);

        





      })
    })

   

});