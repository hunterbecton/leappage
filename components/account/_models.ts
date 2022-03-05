import { Tenant, Subscription, Theme, User } from 'models/_models';

export interface CreateDomainData {
  domain: string;
}

export interface CreateThemeData {
  primary: string;
  primaryLight: string;
  primaryHover: string;
  fontFamily: string;
}

export interface ManageThemeData {
  primary?: string;
  primaryLight?: string;
  primaryHover?: string;
  fontFamily?: string;
}

export interface ManageTeamData {
  name: string;
  email: string;
}

const DomainStatusObj = {
  Pending: 'pending',
  Incomplete: 'incomplate',
  Inactive: 'inactive',
  Verified: 'verified',
} as const;

export type DomainStatusType =
  typeof DomainStatusObj[keyof typeof DomainStatusObj];

export interface ManageDomainProps {
  tenant: Tenant;
  domainStatus: DomainStatusType;
}

export interface ManageSubscriptionProps {
  subscription: Subscription;
}

export interface ManageThemeProps {
  theme: Theme;
}

export interface ProfileData {
  name: string;
  uploadFile: any;
}

export interface ProfileProps {
  currentUser: User;
}

export interface TeamProps {
  team: User[];
}

const RoleObj = {
  User: 'user',
  Editor: 'editor',
  Admin: 'admin',
} as const;

export type RoleType = typeof RoleObj[keyof typeof RoleObj];

export interface TeammateData {
  name: string;
  role: RoleType;
  uploadFile: any;
}

export interface TeammateProps {
  teammate: User;
}
