// White print grain, tiled. Sits on grounds and artwork, never over text.
// One source: the layout sets it as --grain and --grain-soft, and the ridges tile it inside their hills.
const print = (strength: number) =>
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${+(3.2 * strength).toFixed(3)} 0 0 0 ${+(-1.8 * strength).toFixed(3)}'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23g)'/%3E%3C/svg%3E`;

export const grain = print(1);
/** At 45%, for any ground that carries reading text: at full strength the white specks eat small letters' edges. */
export const grainSoft = print(0.45);
