import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Text, Button, Body, Left, Right, Icon } from 'native-base';
// import ActionButton from 'react-native-action-button';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pure-tundra-14665.herokuapp.com/api/v1/task`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
        },
        body: JSON.stringify({
          page: 1,
          limit: 10,
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setTasksList(response.result);
        setIsLoading(false);
      })
      .catch(error => alert(error));


    // axios({
    //   url: 'https://pure-tundra-14665.herokuapp.com/api/v1/task',
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
    //   },
    //   data: {
    //     page: 1,
    //     limit: 10
    //   }
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setTasksList(response.result);
    //     setIsLoading(false);
    //   }, (error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <SafeAreaView >
      <ScrollView >
        <Container>
          <Spinner
            visible={isLoading}
            textContent={'Loading tasks...'}
            textStyle={styles.spinnerTextStyle}
          />          
          <Content padder>
            {
              tasksList.map((task) => (
                <Card key={task.id}>
                  <CardItem header button onPress={() => navigation.navigate("ViewTask", { id: task.id })}>
                    <Text>{task.title}</Text>
                  </CardItem>
                  {/* <CardItem button onPress={() => alert("This is Card Body")}>
                    <Body>
                      <Text>
                        {task.title}
                      </Text>
                    </Body>
                  </CardItem> */}
                  <CardItem>
                    <Left>
                      <Text>{task.date}</Text>
                    </Left>
                    <Right>
                      <Text>{task.time}</Text>
                    </Right>
                  </CardItem>
                </Card>
              ))
            }
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
