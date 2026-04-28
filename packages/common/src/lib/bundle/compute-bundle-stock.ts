/**
 * Computes the effective available stock for a bundle product.
 *
 * Rules:
 * - Children with trackStock=false are unlimited and do not limit the bundle.
 * - For each tracked child: floor(childStock / itemQty) gives how many bundles that child can satisfy.
 * - The bundle stock = min across all tracked children.
 * - Returns 0 if there are no tracked children (all unlimited) or if any tracked child has 0 effective stock.
 */
export function computeBundleEffectiveStock(
  children: Array<{ stock: number; trackStock: boolean; itemQty: number }>,
): number {
  let min = Infinity;
  for (const c of children) {
    if (!c.trackStock) continue;
    const eff = Math.floor(c.stock / c.itemQty);
    if (eff < min) min = eff;
  }
  return min === Infinity ? 0 : min;
}
