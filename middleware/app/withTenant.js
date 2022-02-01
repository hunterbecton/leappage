import { dbConnect } from 'utils';
import Tenant from 'models/tenantModel';

dbConnect();

export const withTenant = async ({ req, res }) => {
  try {
    const host = req.headers.host;

    let tenantDomain;
    let tenant;

    // Search database based on custom domain
    if (host.startsWith('www.')) {
      const { hostname } = new URL(req.headers.referer);

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        domain: hostname
          .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
          .split('/')[0],
      });
    } else {
      tenantDomain = host.split('.')[0];

      // Check if tenant exists in MongoDB
      tenant = await Tenant.findOne({
        subdomain: tenantDomain,
      });
    }

    return JSON.stringify(tenant);
  } catch (error) {
    console.log(error);
    return false;
  }
};
