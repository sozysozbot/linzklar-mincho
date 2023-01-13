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
			fs.writeFileSync(`glyphs/${g.id}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewBox="0 0 2000 2000" version="1.1" xmlns="http://www.w3.org/2000/svg">
	${g.innerHTML}
</svg>
`);
			console.log(`wrote to glyphs/${g.id}.svg`);
		} else {
			console.log("skipped:", g, g.id);
		}
	})
})();