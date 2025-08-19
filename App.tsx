import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from './src/screens/MainScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { palette } from './src/assets/theme';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.gradientOverlay}>
        <View style={styles.gradientOverlayInner}>
          <SafeAreaView style={styles.safeArea}>
            <MainScreen />
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: palette.primary,
    overflow: 'hidden',
  },
  gradientOverlayInner: {
    flex: 1,
    backgroundColor: palette.primaryVariant,
    borderTopLeftRadius: 600,
    borderBottomRightRadius: 600,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
