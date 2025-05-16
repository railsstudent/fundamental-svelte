import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.D6gEOXvx.js","_app/immutable/chunks/Dq2Vcimm.js","_app/immutable/chunks/BMxRbr_b.js"];
export const stylesheets = ["_app/immutable/assets/0.C4TqJTYg.css"];
export const fonts = [];
