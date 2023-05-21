import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { User } from '../users/entities/user.entity';
import { IUserRepository } from './IUserRepository';


@Injectable()
export class DynamoDBUserRepository implements IUserRepository {
  private readonly dynamoDB: AWS.DynamoDB.DocumentClient;
  private readonly tableName: string = 'users';

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
        type:user.type,
        addresses: user.addresses,
        createdAt: user.createdAt

      },
    };

    await this.dynamoDB.put(params).promise();
  }

  async findAll(): Promise<User[] | null> {

    const params = {
        TableName: this.tableName,
      };
  
      const result = await this.dynamoDB.scan(params).promise();
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

    const result = await this.dynamoDB.get(params).promise();
    return result.Item as User | null;
  }

  async update(id: string, updates: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
      UpdateExpression: 'SET #firstName = :firstName, #lastName = :lastName, #email = :email, #type = :type, #address = :address ,#createdAt = :createdAt',
      ExpressionAttributeNames: {
        '#firstName': 'firstName',
        '#lastName': 'lastName',
        '#email': 'email',
        "#type": 'type',
        '#addresses': 'addresses',
        "#createdAt": "createdAt",
      },
      ExpressionAttributeValues: {
        ':firstName': updates.firstName,
        ':lastName': updates.lastName,
        ':email': updates.email,
        ":type" : updates.type,
        ':addresses': updates.addresses,
        ":createdAt":updates.createdAt,
      },
    };

    await this.dynamoDB.update(params).promise();
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
    };

    await this.dynamoDB.delete(params).promise();
  }
}
