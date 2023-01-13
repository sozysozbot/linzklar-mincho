import * as fs from 'fs';
// import * as svgpath from 'svgpath';
import * as jsdom from 'jsdom';
// import { Command, CommandMadeAbsolute, makeAbsolute, parseSVG } from 'svg-path-parser';

(() => {
	const { JSDOM } = jsdom;
	const glyph_map: object = {};
	const content = fs.readFileSync(`linmarn.svg`, 'utf-8');
	const dom = new JSDOM(content);
	dom.window.document.querySelectorAll("g").forEach(g => {
		if (/^g[0-9A-Fa-f]{4}_[a-zA-Z0-9á_.]*$/.test(g.id)) {
			// todo
		} else {
			console.log(g, g.id);
		}
	})
})();