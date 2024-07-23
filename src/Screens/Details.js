import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <Animatable.Image
        source={{uri: route.params.data.recipe.image}}
        style={styles.banner}
        animation={'slideInUp'}
      />
      <AnimatedBtn
        animation={'slideInUp'}
        style={styles.backBtn}
        onPress={() => {
          // navigation.navigate('Home');
          navigation.goBack();
        }}>
        <Image source={require('../images/left.png')} style={styles.backIcon} />
      </AnimatedBtn>
      <Animatable.Text animation={'slideInUp'} style={styles.title}>
        {route.params.data.recipe.label}
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'added by ' + route.params.data.recipe.source}
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.calories}>
        {'calories: '}{' '}
        <Text style={{color: 'orange'}}>
          {route.params.data.recipe.calories}
        </Text>
      </Animatable.Text>
      <Text style={styles.calories}>
        {'Total weight: '}{' '}
        <Text style={{color: 'black'}}>
          {route.params.data.recipe.totalWeight}
        </Text>
      </Text>
      <Text style={styles.calories}>
        {'Meal Type : '}{' '}
        <Text style={{color: 'green'}}>
          {route.params.data.recipe.mealType}
        </Text>
      </Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: 10}}
          data={[
            'Health',
            'Cautions',
            'Ingredients',
            'Diet',
            'Meal Type',
            'Cuisines',
            'Dish Type',
          ]}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(index);
                }}
                style={[
                  styles.typeItem,
                  {
                    borderWidth: selectedTab == index ? 0 : 0.5,
                    marginLeft: index == 0 ? 16 : 10,
                    borderColor: '#9e9e9e',
                    backgroundColor: selectedTab == index ? '#05b681' : 'white',
                  },
                ]}>
                <Animatable.Text
                  animation={'slideInUp'}
                  style={{color: selectedTab == index ? 'white' : 'black'}}>
                  {item}
                </Animatable.Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList
        data={
          selectedTab == 0
            ? route.params.data.recipe.healthLabels
            : selectedTab == 1
            ? route.params.data.recipe.cautions
            : selectedTab == 2
            ? route.params.data.recipe.ingredientLines
            : selectedTab == 3
            ? route.params.data.recipe.dietLabels
            : selectedTab == 4
            ? route.params.data.recipe.mealType
            : selectedTab == 5
            ? route.params.data.recipe.cuisineType
            : route.params.data.recipe.dishType
        }
        renderItem={({item, index}) => {
          return (
            <Animatable.View animation={'slideInUp'} style={styles.labels}>
              <Text>{item}</Text>
            </Animatable.View>
          );
        }}
      />
    </View>
  );
};

export default Details;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 250,
    // resizeMode:"cover"
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    top: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
  },
  source: {
    marginLeft: 20,
    marginTop: 10,
  },
  typeItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderRadius: 6,
  },
  labels: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#9e9e9e',
    paddingLeft: 10,
  },
  calories: {
    fontSize: 16,
    color: 'black',
    opacity: 0.8,
    fontWeight: '500',
    marginTop: 16,
    marginLeft: 25,
  },
});
