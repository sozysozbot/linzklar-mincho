"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const jsdom = __importStar(require("jsdom"));
const { JSDOM } = jsdom;
const content = fs.readFileSync(`linmarn.svg`, 'utf-8');
const dom = new JSDOM(content);
const english_names = {};
dom.window.document.querySelectorAll("g").forEach(g => {
    let match = /^g([0-9A-Fa-f]{4})_([a-zA-Z0-9á_.]*)$/.exec(g.id);
    if (match) {
        const codepoint = parseInt(match[1], 16);
        const c = String.fromCodePoint(codepoint);
        const english_name = match[2];
        english_names[c] = english_name;
        console.log(g.id, c);
        fs.writeFileSync(`glyphs/${c}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewBox="0 0 2000 2000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
	${g.innerHTML}
</svg>
`);
        // console.log(`wrote to glyphs/${c}.svg`);
    }
    else {
        console.log("skipped:", g, g.id);
    }
});
fs.writeFileSync(`english_names.json`, JSON.stringify(english_names, null, 4));
