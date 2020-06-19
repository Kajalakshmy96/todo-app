import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Spinner
        visible={isLoading}
        textContent={'Loading tasks...'}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <Text>Profile Screen</Text>
      <Button
        title="Click Here"
        onPress={() => alert('Button Clicked!')}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
