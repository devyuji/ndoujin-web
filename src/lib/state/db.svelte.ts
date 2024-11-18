import { openDB, type IDBPDatabase } from 'idb';

export interface SavedType {
	name: string;
	code: string;
	imageUrls: string[];
	cover: string;
}

class IDB {
	db: IDBPDatabase | null = null;
	loading = $state(true);

	async init() {
		this.db = await openDB('ndouijn', 1, {
			upgrade: (db, oldVersion) => {
				switch (oldVersion) {
					case 0:
						if (!db.objectStoreNames.contains('saved')) {
							const objectStore = db.createObjectStore('saved', { keyPath: 'code' });
							objectStore.createIndex('imageUrls', 'imageUrls', { unique: false });
							objectStore.createIndex('name', 'name', { unique: false });
							objectStore.createIndex('cover', 'cover', { unique: false });
						}
				}

				console.log('database created');
			}
		});

		this.loading = false;
	}

	async getAll() {
		if (!this.db) return [];

		return this.db.getAll('saved');
	}

	async add(data: SavedType) {
		if (!this.db) throw new Error('db not found');

		const tx = this.db.transaction('saved', 'readwrite');

		tx.onabort = function (event: any) {
			const error = event.target!.error; // DOMException
			if (error.name == 'QuotaExceededError') {
				alert('memorry full');
			}
		};

		await Promise.all([
			tx.store.add({
				...this.cleanData(data)
			}),
			tx.done
		]);
	}

	isPresent(code: string) {
		return this.db?.get('saved', code);
	}

	private cleanData<T>(data: T) {
		return JSON.parse(JSON.stringify(data));
	}
}

const i = new IDB();
export default i;
