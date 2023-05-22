import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OktaJwtVerifier from '@okta/jwt-verifier';

import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  private oktaVerifier: any;
  private audience: string;
  private scope: string;

  constructor(private readonly config: ConfigService) {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: config.get('OKTA_ISSUER'),
      clientId: config.get('OKTA_CLIENTID'),
    });

    this.audience = config.get('OKTA_AUDIENCE');
    this.scope = config.get('SCOPE');

    console.log(config.get('ENV'));
  }

  async validateToken(token: string): Promise<any> {
    try {
      var jwt = await this.oktaVerifier.verifyAccessToken(token, this.audience);
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }

    if (!jwt.claims.scp.includes(this.scope)) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return jwt;
  }
}
