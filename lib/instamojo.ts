// Instamojo client configuration for BGMI Tournament Website
const INSTAMOJO_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://www.instamojo.com/api/1.1/'
  : 'https://test.instamojo.com/api/1.1/';

// Instamojo API credentials from environment variables
const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY;
const INSTAMOJO_AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN;
const INSTAMOJO_SANDBOX_API_KEY = process.env.INSTAMOJO_SANDBOX_API_KEY;

// Create Instamojo HTTP client
export const createInstamojoClient = () => {
  const axios = require('axios').default;

  if (!axios) {
    throw new Error('Axios is required for Instamojo integration. Please install it: npm install axios');
  }

  const baseURL = INSTAMOJO_BASE_URL;

  return axios.create({
    baseURL,
    auth: {
      username: INSTAMOJO_API_KEY || INSTAMOJO_SANDBOX_API_KEY,
      password: INSTAMOJO_AUTH_TOKEN,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Verify environment variables are configured
export const checkInstamojoConfig = () => {
  const required = [
    'INSTAMOJO_API_KEY',
    'INSTAMOJO_AUTH_TOKEN',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing Instamojo environment variables: ${missing.join(', ')}`);
  }

  console.log('Instamojo configuration:', {
    api_key_exists: !!process.env.INSTAMOJO_API_KEY,
    auth_token_exists: !!process.env.INSTAMOJO_AUTH_TOKEN,
    sandbox_key_exists: !!process.env.INSTAMOJO_SANDBOX_API_KEY,
    environment: process.env.NODE_ENV,
  });
};

// Webhook signature verification function
export const verifyWebhookSignature = (payload: string, signature: string) => {
  const crypto = require('crypto');
  const expectedSignature = crypto.createHmac('sha1', INSTAMOJO_AUTH_TOKEN!)
    .update(payload, 'utf8')
    .digest('hex');

  return expectedSignature === signature;
};