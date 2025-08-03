export type Tier = 'free' | 'silver' | 'gold' | 'platinum';

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: Tier;
}

export interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string, tier: Tier) => void;
}

export interface UpgradeModalProps {
  currentTier: Tier;
  onClose: () => void;
  onUpgrade: (tier: Tier) => void;
}

export interface LockedEventCardProps {
  event: Event;
  onUpgrade: () => void;
}