export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "fundamental_svelte/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.AsrZDdgQ.js",app:"_app/immutable/entry/app.quPdRFJr.js",imports:["_app/immutable/entry/start.AsrZDdgQ.js","_app/immutable/chunks/CFXVjtsa.js","_app/immutable/chunks/BMxRbr_b.js","_app/immutable/chunks/F2Iym1Ij.js","_app/immutable/entry/app.quPdRFJr.js","_app/immutable/chunks/BMxRbr_b.js","_app/immutable/chunks/BQ8p7Bi7.js","_app/immutable/chunks/Dq2Vcimm.js","_app/immutable/chunks/DAEA9ZjI.js","_app/immutable/chunks/F2Iym1Ij.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/fundamental_svelte/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
