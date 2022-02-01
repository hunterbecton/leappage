import { dbConnect } from 'utils';
import Tenant from 'models/tenantModel';

dbConnect();

export const withTenant = async ({ req, res }) => {
  try {
    const host = req.headers.host;

    let tenantDomain;
    let tenant;

    console.log(`Host: ${host}`);

    // Get Tenant based on subdomain
    // Also handle for development
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
      let { hostname } = new URL(req.headers.referer);

      console.log(`Hostname: ${hostname}`);

      hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        domain: hostname,
      });
    }

    return JSON.stringify(tenant);
  } catch (error) {
    console.log(error);
    return false;
  }
};
