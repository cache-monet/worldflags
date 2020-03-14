import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { FIRESTORE_API_KEY, FIRESTORE_AUTH_DOMAIN, FIRESTORE_PROJECT_ID } from 'react-native-dotenv'


AppRegistry.registerComponent(appName, () => App);
