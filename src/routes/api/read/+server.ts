/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cheerio from 'cheerio';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		if (!body) {
			throw new Error('Request body not found', { cause: 'user-error' });
		}

		const id = body.id;

		if (!id) {
			throw new Error('Request body not found', { cause: 'user-error' });
		}

		const url = `https://nhentai.net/g/${id}`;

		const res = await fetch(url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0'
			}
		});

		if (res.status !== 200) {
			throw new Error('unable to visit nhentai.net', { cause: 'api-error' });
		}

		const html = await res.text();

		const $ = cheerio.load(html);

		const images: string[] = [];

		$('#thumbnail-container')
			.find('.thumb-container')
			.each(function () {
				const thumUrl = $(this).find('a img').attr('data-src');

				if (!thumUrl) return;

				const imageBaseUrl = 'https://i3.nhentai.net/galleries';

				const urlSplit = thumUrl.split('/');
				let fileName = urlSplit[urlSplit.length - 1];
				const imageId = urlSplit[urlSplit.length - 2];

				fileName = fileName.replaceAll('t', '');

				const imageUrl = `${imageBaseUrl}/${imageId}/${fileName}`;
				images.push(imageUrl);
			});

		return json({ data: images });
	} catch (err: any) {
		let status = 500;

		if (err.cause === 'user-error') {
			status = 400;
		}

		return new Response(err.message, {
			status
		});
	}
};
