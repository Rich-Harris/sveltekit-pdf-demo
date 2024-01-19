import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import FuturaPTCondBold from './fonts/FuturaPTCondBold.otf';
import { read } from '$app/server';
import type { ServerlessConfig } from '@sveltejs/adapter-vercel';

export const config: ServerlessConfig = {
	runtime: 'nodejs20.x'
};

export async function GET({ url }) {
	const text = url.searchParams.get('text') || 'Hello world!';

	const pdf = await PDFDocument.create();

	pdf.registerFontkit(fontkit);
	const font = await pdf.embedFont(await read(FuturaPTCondBold).arrayBuffer());

	const page = pdf.addPage();

	// page.getHeight()

	page.drawText(text, {
		x: 40,
		y: page.getHeight() - 75,
		size: 35,
		font,
		color: rgb(0, 0, 0)
	});

	const bytes = await pdf.save();

	return new Response(await pdf.save(), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': bytes.byteLength.toString()
		}
	});
}
