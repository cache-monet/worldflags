import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button } from 'native-base';
import flagsRef from './db.js'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tajp R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const App = () => {
  const [flagUrl, setFlagUrl] = React.useState('https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg');
  const [options, setOptions] = React.useState(['Canada', 'US', 'England', 'China']);
  const [ans, setAns] = React.useState('Canada')
  const [score, setScore] = React.useState(0)
  const [reveal, setReveal] = React.useState(false)
  // Update score if user is right; generate next round
  const handleClick = (selected) => {
    if (selected == ans) setScore(score+1)
    setReveal(true)
    setTimeout(() => {
      setReveal(false)
      nextFlag()
    }, 500);
  }
  // Update options and flag
  const nextFlag = () => {
    let country_ids = [], data = []
    // Generate a list of random country ids
    while (country_ids.length < 4) {
      let n = Math.floor(Math.random() * 205) + 1
      if (country_ids.indexOf(n) == -1) country_ids.push(n)
    }
    // Chose a random answer
    let ansIndex = Math.floor(Math.random() * 4)
    // Fetch country data from FireStore
    flagsRef.where('_id', 'in', country_ids).get()
      .then(snapshot => {
        snapshot.forEach(doc => data.push(doc.data()));
        setOptions(data.map(d => d.country))
        setAns(data[ansIndex].country)
        setFlagUrl(data[ansIndex].url)
      })
      .catch(err => console.log('Error getting documents', err))
    }
    return (
    <Grid style={styles.container}>
      <Row size={5}>
        <Text style={styles.title}>Score: {score}</Text>
      </Row>
      <Row size={50}>
        <img style={{maxWidth: 800}} src={flagUrl}/>
      </Row>
      <Row size={20}>
        {options.map(option => (
          <Button rounded bordered dark
            style={option == ans && reveal ? styles.answer : styles.option}
            key={option} onClick={(e) => handleClick(e.nativeEvent.target.textContent)}>
            <Text style={{padding: 5}}>{option}</Text>
          </Button>
        ))}
      </Row>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8ff',
  },
  option: {
    minWidth: 100,
    margin: 10,
    justifyContent: 'center',
  },
  answer: {
    minWidth: 100,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#C4FFA8',
    borderColor: 'green',
  },
  title: {
    fontSize: 20,
    margin: 10,
  },
});

export default App;
