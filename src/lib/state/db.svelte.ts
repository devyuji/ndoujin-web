/* eslint-disable @typescript-eslint/no-explicit-any */
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

	data = $state<SavedType[]>([]);
	isDataEmpty = $derived(this.data.length === 0);

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

		this.data = await this.db.getAll('saved');
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

		this.data.push(this.cleanData(data));
	}

	async delete(code: string) {
		if (!this.db) throw new Error('db not initialize');

		const tx = this.db.transaction('saved', 'readwrite');

		await Promise.all([tx.store.delete(code), tx.done]);

		// Delete it from the data also
		this.data = this.data.filter((e) => e.code !== code);
	}

	isPresent(code: string) {
		return this.data.find((e) => e.code === code) !== undefined;
	}

	private cleanData<T>(data: T) {
		return JSON.parse(JSON.stringify(data));
	}
}

const i = new IDB();
export default i;
