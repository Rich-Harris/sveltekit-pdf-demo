import { PDFDocument, TextAlignment, layoutMultilineText, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import FuturaPTCondBold from './fonts/FuturaPTCondBold.otf';
import { read } from '$app/server';
import type { ServerlessConfig } from '@sveltejs/adapter-vercel';

export const config: ServerlessConfig = {
	runtime: 'nodejs20.x'
};

export async function GET({ url }) {
	const text = url.searchParams.get('text') || 'Hello world!';
	const fontSize = +(url.searchParams.get('size') || '35');

	const pdf = await PDFDocument.create();

	pdf.registerFontkit(fontkit);
	const font = await pdf.embedFont(await read(FuturaPTCondBold).arrayBuffer());

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
