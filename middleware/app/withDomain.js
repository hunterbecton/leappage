import Tenant from 'models/tenantModel';

export const withDomain = async (domain) => {
  try {
    // Create domain in Render
    const response = await fetch(
      `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/custom-domains/${domain}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RENDER_API}`,
        },
      }
    );

    // Throw error if status is error
    if (response.status === 200) {
      const data = await response.json();

      return data.verificationStatus;
    } else {
      return 'unknown';
    }

    return JSON.stringify({});
  } catch (error) {
    console.log(error);
    return 'unknown';
  }
};
