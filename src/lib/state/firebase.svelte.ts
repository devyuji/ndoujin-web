import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APPID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MEASUREMENT_ID,
	PUBLIC_FIREBASE_MESSANGING_SENDERID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public';
import { initializeApp, type FirebaseApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Auth, type User } from 'firebase/auth';

class Firebase {
	fb: FirebaseApp | null = null;
	auth: Auth | null = null;
	user: User | null = $state(null);

	constructor() {
		const config = {
			apiKey: PUBLIC_FIREBASE_API_KEY,
			authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
			projectId: PUBLIC_FIREBASE_PROJECT_ID,
			storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: PUBLIC_FIREBASE_MESSANGING_SENDERID,
			appId: PUBLIC_FIREBASE_APPID,
			measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
		};

		if (!getApps().length) {
			this.fb = initializeApp(config);
			this.auth = getAuth(this.fb);

			onAuthStateChanged(this.auth, (u) => {
				this.user = u;
			});
		}
	}
}

const f = new Firebase();
export default f;
