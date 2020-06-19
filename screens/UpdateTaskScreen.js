import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Picker } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Input, CheckBox, Button } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, List, ListItem, Title, Text, Body, Left, Right, Icon } from 'native-base';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

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

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pure-tundra-14665.herokuapp.com/api/v1/task/` + props.route.params.id,
      {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
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
  }, []);


  const updateTask = () => {
    setIsLoading(true);
    fetch(`https://pure-tundra-14665.herokuapp.com/api/v1/task/update/` + props.route.params.id,
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
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
