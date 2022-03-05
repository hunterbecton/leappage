export interface BadgeProps {
  type:
    | 'pending'
    | 'incomplete'
    | 'incomplete_expired'
    | 'all'
    | 'past_due'
    | 'active'
    | 'trialing'
    | 'inactive'
    | 'canceled'
    | 'ended'
    | 'unpaid'
    | 'loading'
    | 'drafted'
    | 'preview'
    | 'published'
    | 'categorized'
    | 'uncategorized'
    | 'verified';
  text: string;
}
