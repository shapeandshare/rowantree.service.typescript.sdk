import { RetryOptions } from './types/RetryOptions'
import { RowanTreeAuthServiceClient } from 'rowantree.auth.typescript.sdk'
import { UserCreateCommand } from './commands/UserCreateCommand'
import { UserWorld } from './types/UserWorld'
import { UserDeleteCommand } from './commands/UserDeleteCommand'
import { UserActiveSetCommand } from './commands/UserActiveSetCommand'
import { UserActiveStatus } from './types/UserActiveStatus'
import { UserActiveSetRequest } from './types/UserActiveSetRequest'
import { StoreType } from './types/StoreType'
import { UserIncomeSetRequest } from './types/UserIncomeSetRequest'
import { UserIncomeSetCommand } from './commands/UserIncomeSetCommand'
import { FeatureType } from './types/FeatureType'
import { UserTransportRequest } from './types/UserTransportRequest'
import { UserTransportCommand } from './commands/UserTransportCommand'
import { FeatureDetailsType } from './types/FeatureDetailsType'
import { UserState } from './types/UserState'
import { UserStateGetCommand } from './commands/UserStateGetCommand'

export class RowanTreeServiceClient {
  readonly #userCreateCommand: UserCreateCommand
  readonly #userDeleteCommand: UserDeleteCommand
  readonly #userActiveSetCommand: UserActiveSetCommand
  readonly #userIncomeSetCommand: UserIncomeSetCommand
  readonly #userTransportCommand: UserTransportCommand
  readonly #userStateGetCommand: UserStateGetCommand

  public constructor (authClient?: RowanTreeAuthServiceClient, retryOptions?: RetryOptions) {
    authClient = (authClient != null) ? authClient : new RowanTreeAuthServiceClient(retryOptions)

    this.#userCreateCommand = new UserCreateCommand(authClient, retryOptions)
    this.#userDeleteCommand = new UserDeleteCommand(authClient, retryOptions)
    this.#userActiveSetCommand = new UserActiveSetCommand(authClient, retryOptions)
    this.#userIncomeSetCommand = new UserIncomeSetCommand(authClient, retryOptions)
    this.#userTransportCommand = new UserTransportCommand(authClient, retryOptions)
    this.#userStateGetCommand = new UserStateGetCommand(authClient, retryOptions)
  }

  public async userCreate (userGuid?: string): Promise<UserWorld> {
    return await this.#userCreateCommand.execute(userGuid)
  }

  public async userDelete (userGuid?: string): Promise<void> {
    await this.#userDeleteCommand.execute(userGuid)
  }

  public async userActiveSet (active: boolean, userGuid?: string): Promise<UserActiveStatus> {
    const request: UserActiveSetRequest = { active, userGuid }
    return await this.#userActiveSetCommand.execute(request)
  }

  public async userIncomeSet (incomeSourceName: StoreType, amount: number, userGuid?: string): Promise<void> {
    const request: UserIncomeSetRequest = { incomeSourceName, amount, userGuid }
    await this.#userIncomeSetCommand.execute(request)
  }

  public async userTransport (location: FeatureType, userGuild?: string): Promise<FeatureDetailsType> {
    const request: UserTransportRequest = { location, userGuid: userGuild }
    return await this.#userTransportCommand.execute(request)
  }

  public async userStateGet (userGuild?: string): Promise<UserState> {
    return await this.#userStateGetCommand.execute(userGuild)
  }
}
