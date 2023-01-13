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
const fantasticon_1 = require("fantasticon");
const fs = __importStar(require("fs"));
// import * as fs_extra from 'fs-extra'
(async function () {
    const in_path = process.argv[3] ?? "glyphs";
    const out_path = process.argv[4] ?? "fonts";
    const glyph_map = {};
    const files = fs.readdirSync(`${in_path}/`);
    files.forEach((file, index) => {
        if (file.slice(-4) !== ".svg")
            return;
        glyph_map[file.slice(0, -4)] = parseInt(file.slice(1, 5), 16);
    });
    console.log(glyph_map);
    (0, fantasticon_1.generateFonts)({
        inputDir: `./${in_path}`,
        outputDir: `./${out_path}`,
        name: "linzklar-mincho",
        fontTypes: [fantasticon_1.FontAssetType.TTF, fantasticon_1.FontAssetType.WOFF],
        assetTypes: [
            fantasticon_1.OtherAssetType.CSS,
            fantasticon_1.OtherAssetType.HTML,
            fantasticon_1.OtherAssetType.JSON,
            /* OtherAssetType.TS */ // The TS asset is buggy; remove
        ],
        fontHeight: 480,
        codepoints: glyph_map
    }).then(results => {
        console.log(results);
        /*
            // copy the resulting fonts into docs/
            fs_extra.copy("fonts", "docs/fonts");
        */
    });
})();
