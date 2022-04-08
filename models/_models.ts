export interface Tenant {
  id: string;
  _id: string;
  company?: string;
  active: boolean;
  email: string;
  tenantId: string;
  stripeId: string;
  addressOne?: string;
  addressTwo?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  domain?: string;
  subdomain: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoleObj = {
  User: 'user',
  Editor: 'editor',
  Admin: 'admin',
} as const;

export type RoleType = typeof RoleObj[keyof typeof RoleObj];

const UserStatusObj = {
  Pending: 'pending',
  Active: 'active',
  Inactive: 'inactive',
} as const;

export type UserStatusType = typeof UserStatusObj[keyof typeof UserStatusObj];

export interface User {
  id: string;
  _id: string;
  name?: string;
  email: string;
  profileImage?: string;
  role: RoleType;
  status: UserStatusType;
  tenant: string;
  getMarketingEmails?: boolean;
  inviteToken?: string;
  inviteTokenExpires?: Date;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionStatusObj = {
  Incomplate: 'incomplete',
  IncompleteExpired: 'incomplete_expired',
  Trialing: 'trialing',
  Active: 'active',
  PastDue: 'past_due',
  Canceled: 'canceled',
  Unpaid: 'unpaid',
} as const;

export type SubscriptionStatusType =
  typeof SubscriptionStatusObj[keyof typeof SubscriptionStatusObj];

export interface Subscription {
  id: string;
  _id: string;
  tenant: string;
  stripeSubId?: string;
  stripeSubItemId?: string;
  product: string;
  quantity: number;
  status: SubscriptionStatusType;
  startDate: Date;
  endDate: Date;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  tenantInfo?: Tenant[];
  productInfo?: Product[];
}

export interface Product {
  id: string;
  _id: string;
  title: string;
  featureImg?: string;
  stripeId: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  id: string;
  _id: string;
  primary: string;
  primaryLight: string;
  primaryHover: string;
  fontFamily: string;
  tenant: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: string;
  _id: string;
  title: string;
  url: string;
  size100: string;
  size200: string;
  size500: string;
  tenant: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  _id: string;
  title: string;
  tenant: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentStatusObj = {
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
} as const;

export type ContentStatusType =
  typeof ContentStatusObj[keyof typeof ContentStatusObj];

export interface Content {
  id: string;
  _id: string;
  title?: string;
  url?: string;
  status: ContentStatusType;
  description?: string;
  feature?: string;
  tenant: string;
  category?: string;
  content?: string;
  hosted: boolean;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  categoryInfo?: Category[];
}

const TestimonialStatusObj = {
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
} as const;

export type TestimonialStatusType =
  typeof TestimonialStatusObj[keyof typeof TestimonialStatusObj];

export interface Testimonial {
  id: string;
  _id: string;
  title: string;
  quote: string;
  profileImage: string;
  name: string;
  company: string;
  position: string;
  tenant: string;
  category: string;
  status: TestimonialStatusType;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  categoryInfo?: Category[];
}

const PageStatusObj = {
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
} as const;

export type PageStatusType = typeof PageStatusObj[keyof typeof PageStatusObj];

export interface Page {
  id: string;
  _id: string;
  title: string;
  frame: string;
  slug: string;
  tenant: string;
  user: string;
  status: PageStatusType;
  seoTitle?: string;
  seoDescription?: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  userInfo?: User[];
}

const TemplateStatusObj = {
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
} as const;

export type TemplateStatusType =
  typeof TemplateStatusObj[keyof typeof TemplateStatusObj];

export interface Template {
  id: string;
  _id: string;
  title: string;
  frame: string;
  tenant: string;
  status: PageStatusType;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
