import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PerformanceTestScreen = (props) => {
  const initialDate = React.useRef();
  const initialPerformance = React.useRef();

  const [performanceTime, setPerformanceTime] = React.useState(0);
  const [dateTime, setDateTime] = React.useState(0);

  React.useEffect(() => {
    initialDate.current = Date.now();
    initialPerformance.current = performance.now();

    const interval = setInterval(() => {
      setPerformanceTime(performance.now());
      setDateTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const performanceElapsed = Math.floor(
    performanceTime - initialPerformance.current,
  );
  const dateElapsed = Math.floor(dateTime - initialDate.current);

  return (
    <View style={styles.container}>
      <Text>Performance Time: {performanceTime}</Text>
      <Text>Performance Elapsed: {performanceElapsed}ms</Text>
      <Text>Date Time: {dateTime}</Text>
      <Text>Date Elapsed: {dateElapsed}ms</Text>
      <Text>Difference: {performanceElapsed - dateElapsed}ms</Text>
    </View>
  );
};

export default PerformanceTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
