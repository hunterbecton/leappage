import { dbConnect } from 'utils';
import Tenant from 'models/tenantModel';

dbConnect();

export const withTenant = async ({ req, res }) => {
  try {
    let host = req.headers.host;
    let tenant;

    // Get Tenant based on subdomain and also handle development
    if (
      host.includes('leappage.com') ||
      process.env.NODE_ENV === 'development'
    ) {
      let subdomain = host.split('.')[0];

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        subdomain,
      });
    }
    // Get Tenant based on custom domain
    else {
      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        domain: host,
      });
    }

    return JSON.stringify(tenant);
  } catch (error) {
    console.log(error);
    return false;
  }
};
