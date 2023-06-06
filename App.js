import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Navigation from './src/navigation';
import LoginProvider from './src/context/LoginProvider';

const App = () => {
  return (
    <>
      <LoginProvider>
        <Navigation />
      </LoginProvider>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#dee1e3',
  },
});

export default App;
