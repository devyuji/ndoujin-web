export interface DetailsType {
	title: string;
	coverImage: string;
	tag: string[];
	artists: string[];
	language: string;
	totalPage: string;
	id: string;
}

class DoujinDetails {
	details = $state<{ data: DetailsType; hasData: boolean }>();

	constructor() {
		this.details = {
			data: {
				id: '',
				artists: [],
				coverImage: '',
				language: '',
				tag: [],
				title: '',
				totalPage: ''
			},
			hasData: false
		};
	}

	update(data: DetailsType) {
		this.details!.data = data;
		this.details!.hasData = true;
	}
}

const d = new DoujinDetails();
export default d;
