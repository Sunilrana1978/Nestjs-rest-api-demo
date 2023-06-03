import { Injectable, Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { IUserRepository } from './IUserRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBUserRepository implements IUserRepository {
  private readonly tableName: string = 'users';

  docClient = process.env.IS_OFFLINE
    ? DynamoDBDocumentClient.from(
        new DynamoDBClient({
          endpoint: process.env.DYNAMODB_ENDPOINT,
          region: 'localhost',
        }),
      )
    : DynamoDBDocumentClient.from(new DynamoDBClient({}));

  private readonly logger = new Logger(DynamoDBUserRepository.name);

  async create(user: User): Promise<void> {
    const command = new PutCommand({
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
    });
    const response = await this.docClient.send(command);
    console.log(response);
  }

  async findAll(): Promise<User[] | null> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });
    const response = await this.docClient.send(command);
    return response.Items as User[] | null;
  }

  async findById(id: string): Promise<User | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
    });

    const response = await this.docClient.send(command);
    return response.Item as User | null;
  }

  async update(id: string, updates: User): Promise<void> {
    const command = new UpdateCommand({
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
    });

    const response = await this.docClient.send(command);
    console.log(response);
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: 'USER',
      },
    });
    const response = await this.docClient.send(command);
    console.log(response);
  }
}
