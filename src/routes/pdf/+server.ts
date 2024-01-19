import { PDFDocument, TextAlignment, layoutMultilineText, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import Overpass from './fonts/overpass-regular.otf';
import { read } from '$app/server';

export async function GET({ url }) {
	const text = url.searchParams.get('text') || 'Hello world!';
	const fontSize = +(url.searchParams.get('size') || '35');

	const pdf = await PDFDocument.create();
	pdf.registerFontkit(fontkit);

	const font_data = await read(Overpass).arrayBuffer();
	const font = await pdf.embedFont(font_data);

	const page = pdf.addPage();

	const margin = 40;

	const layout = layoutMultilineText(text, {
		alignment: TextAlignment.Left,
		font,
		fontSize,
		bounds: {
			x: margin,
			y: margin,
			width: page.getWidth() - margin * 2,
			height: page.getHeight() - margin * 2
		}
	});

	for (const line of layout.lines) {
		page.drawText(line.text, {
			x: line.x,
			y: line.y,
			size: fontSize,
			font,
			color: rgb(0, 0, 0)
		});
	}

	const bytes = await pdf.save();

	return new Response(await pdf.save(), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': bytes.byteLength.toString()
		}
	});
}
