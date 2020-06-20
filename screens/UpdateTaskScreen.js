import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Picker } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Input, CheckBox, Button } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, List, ListItem, Title, Text, Body, Left, Right, Icon } from 'native-base';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Configs from '../model/config';
import AsyncStorage from '@react-native-community/async-storage';

const UpdateTaskScreen = (props) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [remind, setRemind] = useState(true);
  const [taskDate, setTaskDate] = useState(moment().utcOffset('+05:30').format('YYYY-MM-DD'));
  const [taskTime, setTaskTime] = useState("12:00:00");

  const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
  }

  useEffect(() => {
    getToken().then(token => {
      setIsLoading(true);
      fetch(
        Configs.apiUrl + `/api/v1/task/` + props.route.params.id,
        {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )
        .then(res => res.json())
        .then(response => {
          setIsLoading(false);
          console.log(response);
          setTask(response.result);
          setTitle(response.result.title);
          setDescription(response.result.description);
          setCategory(response.result.category_id);
          setRemind(response.result.remind ? true : false);
          setTaskDate(response.result.date);
          setTaskTime(response.result.time);
          console.log(title);
          setIsLoading(false);
        })
        .catch(error => alert(error));
    });
  }, []);


  const updateTask = () => {
    getToken().then(token => {
      setIsLoading(true);
      fetch(Configs.apiUrl + `/api/v1/task/update/` + props.route.params.id,
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
            remind: remind
          })
        }
      )
        .then(res => res.json())
        .then(response => {
          setIsLoading(false);
          console.log(response);
          if (response.code == 200) {
            console.log("Task successfully updated!");
            props.navigation.navigate("ViewTask", { id: props.route.params.id })
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
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}>
              {/* <Picker.Item label="Select a Category" value="0"></Picker.Item> */}
              <Picker.Item label="Education" value="1"></Picker.Item>
              <Picker.Item label="Workout" value="2"></Picker.Item>
              <Picker.Item label="Shopping" value="3"></Picker.Item>
            </Picker>
            <Input
              label='Title'
              placeholder='Task Title'
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <Input
              label='Description'
              placeholder='Task Description'
              value={description}
              onChangeText={(value) => setDescription(value)}
            />
            <Input
              type='date'
              label='Date'
              placeholder='YYYY-MM-DD'
              value={taskDate}
              onChangeText={(value) => setTaskDate(value)}
            />
            <Input
              type='time'
              label='Date'
              placeholder='HH:MM:SS'
              value={taskTime}
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
              title="Save"
              onPress={() => updateTask()}
            />
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  button: {

  }
});
