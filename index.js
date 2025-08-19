/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

// Wrap App with SafeAreaProvider
const RootApp = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

// Register the wrapped component
AppRegistry.registerComponent(appName, () => RootApp);
