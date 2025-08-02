export const tierOrder = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const;

export type Tier = keyof typeof tierOrder;

export const isTierAbove = (userTier: Tier, eventTier: Tier) => {
  return tierOrder[userTier] < tierOrder[eventTier];
};