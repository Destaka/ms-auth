import { ContainerModule, interfaces } from 'inversify'

import { IIdentityService, IIdentityServiceToken } from '../../business/services/iIdentityService'
import { IdentityService } from '../services/identityService'

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IIdentityService>(IIdentityServiceToken).to(IdentityService)
})
