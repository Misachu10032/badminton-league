export const ranks = [
    {
      name: "江湖小虾",
      start: 0,
      end: 999,
      tiers: [],
    },
    {
      name: "初出茅庐",
      start: 1000,
      end: 1999,
      tiers: [
        { tier: "IV", start: 1000, end: 1250 },
        { tier: "III", start: 1251, end: 1500 },
        { tier: "II", start: 1501, end: 1750 },
        { tier: "I", start: 1751, end: 1999 },
      ],
    },
    {
      name: "初窥门径",
      start: 2000,
      end: 2999,
      tiers: [
        { tier: "IV", start: 2000, end: 2250 },
        { tier: "III", start: 2251, end: 2500 },
        { tier: "II", start: 2501, end: 2750 },
        { tier: "I", start: 2751, end: 2999 },
      ],
    },
    // Add other ranks similarly...
  ];
  