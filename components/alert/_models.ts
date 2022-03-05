import { Tenant } from 'models/_models';

export interface DomainAlertProps {
  isSubdomain: boolean;
  tenant: Tenant;
}
