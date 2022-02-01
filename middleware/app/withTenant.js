import { dbConnect } from 'utils';
import Tenant from 'models/tenantModel';

dbConnect();

export const withTenant = async ({ req, res }) => {
  try {
    const host = req.headers.host;

    let tenantDomain;
    let tenant;

    tenantDomain = host.split('.')[0];

    // Check if tenant exists in MongoDB
    tenant = await Tenant.findOne({
      subdomain: tenantDomain,
    });

    return JSON.stringify(tenant);
  } catch (error) {
    console.log(error);
    return false;
  }
};
