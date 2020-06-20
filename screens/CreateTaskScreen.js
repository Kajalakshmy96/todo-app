import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Picker } from 'react-native';

import { Input, CheckBox, Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Content } from 'native-base';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Configs from '../model/config';
import AsyncStorage from '@react-native-community/async-storage';


const CreateTaskScreen = (props) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [remind, setRemind] = useState(true);
  const [taskDate, setTaskDate] = useState(moment().utcOffset('+05:30').format('YYYY-MM-DD'));
  const [taskTime, setTaskTime] = useState("12:00:00");

  const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
  }

  function createTask() {
    getToken().then(token => {
      setIsLoading(true);
      fetch(Configs.apiUrl + `/api/v1/task/create`,
        {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            category_id: category,
            title: title,
            description: description,
            date: taskDate,
            time: taskTime,
            remind: remind,
          })
        }
      )
        .then(res => res.json())
        .then(response => {
          setIsLoading(false);
          console.log(response);
          if (response.code == 200) {
            props.navigation.navigate("Home");
          }
        })
        .catch(error => alert(error));
    });
  }

  return (
    <SafeAreaView >
      <ScrollView>
        <Container>
          <Content>
            <Spinner
              visible={isLoading}
              textContent={'Creating task...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}>
              <Picker.Item label="Select a Category" value="0"></Picker.Item>
              <Picker.Item label="Education" value="1"></Picker.Item>
              <Picker.Item label="Workout" value="2"></Picker.Item>
              <Picker.Item label="Shopping" value="3"></Picker.Item>
            </Picker>
            <Input
              label='Title'
              placeholder='Task Title'
              onChangeText={(value) => setTitle(value)}
            />
            <Input
              label='Description'
              placeholder='Task Description'
              onChangeText={(value) => setDescription(value)}
            />
            <Input
              type='date'
              label='Date'
              placeholder='YYYY-MM-DD'
              onChangeText={(value) => setTaskDate(value)}
            />
            <Input
              type='time'
              label='Date'
              placeholder='HH:MM:SS'
              onChangeText={(value) => setTaskTime(value)}
            />
            <CheckBox
              title='Remind'
              checked={remind}
              onPress={() => setRemind(!remind)}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'blue',
                width: '60%',
                marginLeft: '20%'
              }}
              title="Create Task"
              onPress={() => createTask()}
            />
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

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
