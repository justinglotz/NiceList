// Calculates progress based on the number of actions the user has completed (i.e. a gift being completed means they have completed all 4 actions)

export default function calculateOverallProgress(giftItems) {
  if (!giftItems || giftItems.length === 0) return 0;

  let statusSum = 0;
  giftItems.forEach((gift) => {
    statusSum += gift.status;
  });

  return ((statusSum / (giftItems.length * 4)) * 100).toFixed(0);
}
