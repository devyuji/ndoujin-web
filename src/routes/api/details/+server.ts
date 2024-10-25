import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

import * as cheerio from 'cheerio';

export const GET: RequestHandler = async (props) => {
	const code = props.url.searchParams.get('code');

	if (!code) {
		return error(400, 'Bad Request');
	}

	const url = `https://nhentai.net/g/${code}/`;

	const options: RequestInit = {
		method: 'GET',
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0'
		}
	};

	const res = await fetch(url, options);

	if (res.status !== 200) {
		throw error(500);
	}

	const html = await res.text();

	const $ = cheerio.load(html);

	const title = $('#info .title').first().text();
	let coverImage = $('#cover img').attr('data-src');

	const response = await fetch(coverImage!);
	const blob = await response.arrayBuffer();

	// Convert the Blob to a Base64 string
	coverImage = Buffer.from(blob).toString('base64');

	const tags: string[] = [];
	let language = '';
	let totalPage = '';
	const artists: string[] = [];

	$('.tag-container').each(function () {
		if ($(this).text().toLowerCase().indexOf('tags') !== -1) {
			$(this)
				.find('.name')
				.each(function () {
					tags.push($(this).text());
				});
		} else if ($(this).text().toLowerCase().indexOf('language') !== -1) {
			language = $(this).find('.name').last().text();
		} else if ($(this).text().toLowerCase().indexOf('pages') !== -1) {
			totalPage = $(this).find('.name').text();
		} else if ($(this).text().toLowerCase().indexOf('artists') !== -1) {
			$(this)
				.find('.name')
				.each(function () {
					artists.push($(this).text());
				});
		}
	});

	const data = {
		id: code,
		title,
		coverImage,
		tag: tags,
		language,
		totalPage,
		artists
	};

	return json(data);
};
