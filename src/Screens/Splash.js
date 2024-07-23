import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  const naviagtion = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      naviagtion.navigate('Home');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      {/* image lga dena */}
      <Animatable.Text style={styles.appName}>Recipie Pro</Animatable.Text>
      {/* <Animatable.Text animation="zoomInUp" style={styles.appName}>Recipie Pro</Animatable.Text> */}
      <Animatable.Text animation="slideInUp" style={styles.name}>
        By Anurag
      </Animatable.Text> 
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: '#05B681',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 50,
    fontWeight: '600',
    marginTop: 10,
  },
  name: {
    fontSize: 30,
  },

});
