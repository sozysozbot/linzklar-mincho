import * as fs from 'fs';
import * as jsdom from 'jsdom';

const { JSDOM } = jsdom;
const content = fs.readFileSync(`linmarn.svg`, 'utf-8');
const dom = new JSDOM(content);
const english_names: { [key: string]: string } = {};
dom.window.document.querySelectorAll("g").forEach(g => {
	let match = /^g([0-9A-Fa-f]{4})_([a-zA-Z0-9á_.]*)$/.exec(g.id);
	if (match) {
		const codepoint = parseInt(match[1], 16);
		const c = String.fromCodePoint(codepoint);
		const english_name = match[2];
		if (english_names[c]) {
			throw new Error(`Conflict: Trying to insert (${c}, ${g.id}) but there is already (${c}, ${english_names[c]})`)
		} else {
			english_names[c] = english_name;
		}
		console.log(c, g.id);
		fs.writeFileSync(`glyphs/${c}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewBox="0 0 2000 2000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
	${g.innerHTML}
</svg>
`);
		// console.log(`wrote to glyphs/${c}.svg`);
	} else {
		console.log("skipped:", g, g.id);
	}
});

fs.writeFileSync(`english_names.json`, JSON.stringify(english_names, null, 4));
