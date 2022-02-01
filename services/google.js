import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
});

export default storage;
