import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

import * as cheerio from 'cheerio';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		return error(400, 'Bad Request');
	}

	try {
		const url = `https://nhentai.net/g/${code}`;

		const cookie =
			'csrftoken=TuPHJ6a5kt7qM7YHU1r4NUUyCVitslPj; cf_clearance=1et44z35D1qvP2r.JJExqRy_xI6N5Abw6iU_6SoYKwM-1775467584-1.2.1.1-OmVGyj02PsZ.dTVGuv65tKX.zSomJPG7wXeQXZ65rjn98OGJTZRGLWbUOjxk.oGJI.zRN0cfQCEFRf_1MZh9DUpmyIAYY4x9FFVwOuxxBKZg2ggd4RBjoSrGDJcEK.Nsj6tYexTl6iEuizLi31FLuMAdr5Hpo5GDQ79JD.K58NGB7mx2iA0z8nXG8ul0SULpjn_WNRXShpY0Ao5v5TxHfSplWbCF9P8wDAZ9o6miXCJtypVTfIGmstoiMUFqVYX1i4Spa4g9f1Ovlcnj8yUWPCeVzGpTLRwXKArpsc2NsW6wPBiJ9qyZhqc0FqJhkmijtxLi5h4yWUQLT87cSWb6nQ';

		const options: RequestInit = {
			method: 'GET',
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0',
				Cookie: cookie
			},
			keepalive: true,
			credentials: 'omit'
		};

		const res = await fetch(url, options);

		if (!res.ok) {
			console.log(res.statusText);
			throw error(500, 'status.error');
		}

		const html = await res.text();

		const $ = cheerio.load(html);

		const title = $('#info .title').first().text();
		let coverImage = $('#cover img').attr('src');

		const response = await fetch(coverImage!, options);
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
	} catch (err) {
		console.log(err);

		return json(
			{ status: 'fail' },
			{
				status: 500
			}
		);
	}
};
