import { dbConnect } from 'utils';
import Tenant from 'models/tenantModel';

dbConnect();

export const withTenant = async ({ req, res }) => {
  try {
    let host = req.headers.host;
    let tenantDomain;
    let tenant;

    // Get Tenant based on subdomain and also handle development
    if (
      host.includes('leappage.com') ||
      process.env.NODE_ENV === 'development'
    ) {
      tenantDomain = host.split('.')[0];

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        subdomain: tenantDomain,
      });
    }
    // Get Tenant based on custom domain
    else {
      tenantDomain = host.split('.')[0];

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        domain: tenantDomain,
      });
    }

    return JSON.stringify(tenant);
  } catch (error) {
    console.log(error);
    return false;
  }
};
