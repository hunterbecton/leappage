import mongoose from 'mongoose';

import { Tenant } from 'models/_models';

export interface ForgotPasswordProps {
  tenant: Tenant;
}

export interface ForgotPasswordData {
  email: string;
}

export interface LoginProps {
  tenant: Tenant;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SetupProps {
  tenant: Tenant;
}

export interface SetupData {
  email: string;
  password: string;
  passwordConfirm: string;
  getMarketingEmails: boolean;
}
