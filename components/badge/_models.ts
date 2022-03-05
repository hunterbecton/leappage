const BadgeTypeObj = {
  Pending: 'pending',
  Incomplete: 'incomplete',
  IncompleteExpired: 'incomplete_expired',
  All: 'all',
  PastDue: 'past_due',
  Active: 'active',
  Trialing: 'trialing',
  Inactive: 'inactive',
  Canceled: 'canceled',
  Ended: 'ended',
  Unpaid: 'unpaid',
  Loading: 'loading',
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
  Categorized: 'categorized',
  Uncategorized: 'uncategorized',
  Verified: 'verified',
} as const;

export type BadgeType = typeof BadgeTypeObj[keyof typeof BadgeTypeObj];

export interface BadgeProps {
  type: BadgeType;
  text: string;
}
