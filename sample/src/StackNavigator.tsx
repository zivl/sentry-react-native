import * as React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import TrackerScreen from './screens/TrackerScreen';
import PerformanceTestScreen from './screens/PerformanceTestScreen';

import {store} from './reduxApp';

Sentry.init({
  dsn:
    // Replace the example DSN below with your own DSN:
    'https://6890c2f6677340daa4804f8194804ea2@o19635.ingest.sentry.io/148053',
  debug: true,
  beforeSend: (e) => {
    if (!e.tags) {
      e.tags = {};
    }
    e.tags.beforeSend = 'JS layer';

    console.log('Event beforeSend:', e);
    return e;
  },
  integrations: [
    new Sentry.Integrations.ReactNativeTracing({
      tracingOrigins: [/^https:\/\/api.covid19api.com/g],
    }),
  ],
  enableAutoSessionTracking: true,
  // For testing, session close when 5 seconds (instead of the default 30) in the background.
  sessionTrackingIntervalMillis: 5000,
  tracesSampleRate: 1.0,
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Tracker" component={TrackerScreen} />
          <Stack.Screen name="PerformanceTest" component={PerformanceTestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Sentry.withTouchEventBoundary(App);
