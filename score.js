export const calculateScore = ({
  shipmentWeight,
  truckCapacity,
  distance,
}) => {
  const utilization = shipmentWeight / truckCapacity;

  if (utilization > 1) return 0;

  const utilizationScore = utilization * 50;
  const distanceScore = Math.max(0, 50 - distance);

  return utilizationScore + distanceScore;
};
