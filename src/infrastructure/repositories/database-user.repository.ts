import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/model/user.model';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userEntityRepository.findOneBy({ id });
    return plainToInstance(User, user);
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userEntityRepository.save(user);
    return plainToInstance(User, plainToInstance(UserEntity, newUser));
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userEntityRepository.findOneBy({ email });
    return plainToInstance(User, user);
  }
}
