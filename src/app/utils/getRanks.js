import { ranks } from "../lib/ranks";


export function getRank(score) {
  for (const rank of ranks) {
    if (score >= rank.start && score <= rank.end) {
      if (rank.tiers.length > 0) {
        for (const tier of rank.tiers) {
          if (score >= tier.start && score <= tier.end) {
            return `${rank.name} ${tier.tier}`;
          }
        }
      }
      return rank.name; // If no tiers, return the rank name
    }
  }
  return "Unranked"; // Fallback for scores outside the defined range
}
