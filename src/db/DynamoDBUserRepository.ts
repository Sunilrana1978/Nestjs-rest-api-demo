import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { User } from '../users/entities/user.entity';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class DynamoDBUserRepository implements IUserRepository {
  private readonly dynamoDB: AWS.DynamoDB.DocumentClient;
  private readonly tableName: string = 'users';

  private readonly logger = new Logger(DynamoDBUserRepository.name);

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
  }

  async create(user: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        PK: `USER#${user.userId}`,
        SK: 'USER',
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        type: user.type,
        addresses: user.addresses,
        createdAt: user.createdAt,
      },
    };

    // await this.dynamoDB.put(params).promise();

    await this.dynamoDB
      .put(params)
      .promise()
      .then((data) => {
        this.logger.log('Record created successfully!');
        this.logger.log(user);
      })
      .catch(function (err) {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      });

    this.logger.log(`User created successfully: ${user}`);
  }

  async findAll(): Promise<User[] | null> {
    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDB
      .scan(params)
      .promise()
      .then((result) => {
        return result;
      })
      .catch(function (err) {
        console.log(err);
        throw new InternalServerErrorException(err);
      });
    return result.Items as User[] | null;
  }

  async findById(id: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
    };

    const result = await this.dynamoDB
      .get(params)
      .promise()
      .then((result) => {
        return result;
      })
      .catch(function (err) {
        console.log(err);
        throw new InternalServerErrorException(err);
      });
    return result.Item as User | null;
  }

  async update(id: string, updates: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
      UpdateExpression:
        'SET firstName = :firstName, lastName = :lastName, email = :email, type = :type, addresses = :addresses ,createdAt = :createdAt',
      ExpressionAttributeValues: {
        ':firstName': updates.firstName,
        ':lastName': updates.lastName,
        ':email': updates.email,
        ':type': updates.type,
        ':addresses': updates.addresses,
        ':createdAt': updates.createdAt,
      },
    };
    console.log(params);
    // await this.dynamoDB.update(params).promise();

    await this.dynamoDB
      .update(params)
      .promise()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.logger.log(`User updated successfully: ${id}`);
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
    };
    await this.dynamoDB
      .delete(params)
      .promise()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.logger.log(`User deleted successfully: ${id}`);
  }
}
