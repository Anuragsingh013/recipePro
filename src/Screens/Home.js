import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MEAL_FILTERS} from '../Data';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const APP_ID = 'c7ad7562';
const APP_KEY = '21ed7defb97c9b23539d2800a8d4edc8';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getTrendyRecipes();
  }, []);

  const getTrendyRecipes = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=food&type=public`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.hits);
        setRecipes(result.hits);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Animatable.Image
          animation={'slideInUp'}
          source={require('../images/cooking.jpeg')}
          style={styles.banner}
        />
        <View style={styles.transparentView}>
          <Animatable.Text animation={'slideInUp'} style={styles.logo}>
            Recipe pro
          </Animatable.Text>
          <AnimatedBtn
            animation={'slideInUp'}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Search');
            }}
            style={styles.searchBox}>
            <Image
              source={require('../images/search.png')}
              style={styles.search}
            />
            <Text style={styles.placeholder}>Please search here...</Text>
          </AnimatedBtn>
          <Animatable.Text animation={'slideInUp'} style={styles.note}>
            Search 1000+ recipes easily with one click
          </Animatable.Text>
        </View>
      </View>
      <Animatable.Text animation={'slideInUp'} t style={styles.heading}>
        Categories
      </Animatable.Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MEAL_FILTERS}
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                onPress={() => {
                  navigation.navigate('RecipeBYCategory', {data: item.title});
                }}
                animation={'slideInUp'}
                activeOpacity={0.8}
                style={styles.categoryItem}>
                <View style={styles.card}>
                  <Image source={item.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.category}>{item.title}</Text>
              </AnimatedBtn>
            );
          }}
        />
      </View>
      <Animatable.Text animation={'slideInUp'} style={styles.heading}>
        Trendy Recipes{' '}
      </Animatable.Text>
      <View>
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recipes}
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                animation={'slideInUp'}
                style={styles.recipeItem}
                onPress={() => {
                  navigation.navigate('Details', {data: item});
                }}>
                <Animatable.Image
                  animation={'slideInUp'}
                  source={{uri: item.recipe.image}}
                  style={styles.recipeImage}
                />
                <View style={[styles.transparentView, {borderRadius: 15}]}>
                  <Text style={styles.recipeLabel}>{item.recipe.label}</Text>
                </View>
              </AnimatedBtn>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transparentView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center', // Add this line
  },
  searchBox: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 50,
  },
  search: {
    width: 20,
    height: 20,
  },
  placeholder: {
    marginLeft: 15,
    fontSize: 16,
    color: '#9e9e9e',
  },
  logo: {
    fontSize: 40,
    color: 'white',
    position: 'absolute',
    fontWeight: '600',
    top: 20,
    left: 20,
  },
  note: {
    fontSize: 14,
    color: 'white',
    width: '90%',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  categoryItem: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '70%',
    shadowColor: 'rgba(0,0,0.3)',
    shadowOpacity: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    tintColor: '#05b681',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 10,
  },
  recipeItem: {
    width: 160,
    height: 180,
    marginLeft: 20,
    borderRadius: 15,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  recipeLabel: {
    color: 'white',
    fontSize: 18,
    width: '90%',
    fontWeight: '600',
  },
});

//  id 0a746181

// key 1275063bd92973085bb321f7cf6094bb	—
