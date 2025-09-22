import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}