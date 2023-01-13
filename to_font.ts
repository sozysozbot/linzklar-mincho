import { generateFonts, FontAssetType, OtherAssetType } from 'fantasticon';
import * as fs from 'fs';
// import * as fs_extra from 'fs-extra'
(async function () {
    const in_path = process.argv[3] ?? "glyphs"
    const out_path = process.argv[4] ?? "fonts"
    const glyph_map: { [key: string]: number } = {};
    const files = fs.readdirSync(`${in_path}/`);
    files.forEach((file, index) => {
        if (file.slice(-4) !== ".svg") return;
        glyph_map[file.slice(0, -4)] = file.codePointAt(0)!;
    });
    console.log(glyph_map);
    generateFonts({
        inputDir: `./${in_path}`,
        outputDir: `./${out_path}`,
        name: "linzklar-mincho",
        fontTypes: [FontAssetType.TTF, FontAssetType.WOFF],
        assetTypes: [
            OtherAssetType.CSS,
            OtherAssetType.HTML,
            OtherAssetType.JSON,
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