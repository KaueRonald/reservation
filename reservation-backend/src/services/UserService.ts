import HttpStatusCode from '../utils/enum/HttpStatusCode';
import { UserRepository } from '../database/User.repository';
import { generateToken } from '../utils/GenerateToken';
import bcrypt from 'bcrypt';

export default class UserServices {
    public repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public verifyUserCredentials = async (email: string, password: string) => {
        const user = await this.repository.getCredencialsLogin(email);
        if (!user) {
            throw {
                status: HttpStatusCode.NOT_FOUND,
                message: { error: 'User NOT FOUND' },
            };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw {
                status: HttpStatusCode.BAD_REQUEST,
                message: { error: 'Invalid password' },
            };
        }
        const token = generateToken(user.id, user.role);
        
        return { token };
    }
}