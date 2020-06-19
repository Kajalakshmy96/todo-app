import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Picker } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Input, CheckBox, Button } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, List, ListItem, Title, Text, Body, Left, Right, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const ViewTaskScreen = (props) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [task, setTask] = useState([]);
  const [taskState, setTaskState] = useState("N");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        console.log(response);
        setTask(response.result);
        setTaskState(response.result.state);
        setIsLoading(false);
      })
      .catch(error => alert(error));
  }, []);

  const getTaskState = (state) => {
    if (state == 'N') {
      return "New";
    } else if (state == 'C') {
      return "Completed";
    } else if (state == 'P') {
      return "Partially Completed";
    } else if (state == 'O') {
      return "Progress";
    } else if (state == 'E') {
      return "Cancelled";
    }
  }

  const updateState = (state) => {
    setIsLoading(true);
    fetch(`https://pure-tundra-14665.herokuapp.com/api/v1/task/state/` + props.route.params.id,
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
        },
        body: JSON.stringify({
          state: state
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setIsLoading(false);
        console.log(response);
        if (response.code == 200) {
          setTaskState(state);
          console.log("State successfully updated!");
        }
      })
      .catch(error => alert(error));
  }

  const deleteTask = () => {
    setIsLoading(true);
    fetch(`https://pure-tundra-14665.herokuapp.com/api/v1/task/delete/` + props.route.params.id,
      {
        method: "post",
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
        if (response.code == 200) {
          //setTaskState(state);          
          console.log("Task successfully deleted!");
          props.navigation.navigate("Home");
        }
      })
      .catch(error => alert(error));
  }
  return (
    <SafeAreaView >
      <ScrollView >
        <Container>
          <Content>
            <Spinner
              visible={isLoading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <List>
              <ListItem>
                <Text>{props.id} {task.title}</Text>
              </ListItem>
              <ListItem>
                <Text>{task.description}</Text>
              </ListItem>
              <ListItem>
                <Text>{task.date} {task.time}</Text>
              </ListItem>
              <ListItem>
                <Text>Reminder - {task.remind ? <Text>On</Text> : <Text>Off</Text>} </Text>
              </ListItem>
              <ListItem>
                <Text>Status - {getTaskState(taskState)}</Text>
              </ListItem>
            </List>
            <Picker
              selectedValue={taskState}
              onValueChange={(value) => updateState(value)}>
              {/* <Picker.Item label="Select a Category" value="N"></Picker.Item> */}
              <Picker.Item label="New" value="N"></Picker.Item>
              <Picker.Item label="Completed" value="C"></Picker.Item>
              <Picker.Item label="Progress" value="O"></Picker.Item>
              <Picker.Item label="Cancelled" value="E"></Picker.Item>
              <Picker.Item label="Partially" value="P"></Picker.Item>
            </Picker>
            <Button
              title="Delete"
              buttonStyle={{
                backgroundColor: 'red',
                width: '60%',
                marginLeft: '20%',
                marginBottom: 10
              }}
              onPress={() => deleteTask()}
            />
            <Button
              title="Update"
              buttonStyle={{
                backgroundColor: 'blue',
                width: '60%',
                marginLeft: '20%'
              }}
              onPress={() => props.navigation.navigate("UpdateTask", { id: props.route.params.id })}

            />
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewTaskScreen;

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
