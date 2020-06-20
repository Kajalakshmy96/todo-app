import React, { useState, useEffect } from 'react';
import { View, RefreshControl, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Text, Button, Body, Left, Right, Icon } from 'native-base';
// import ActionButton from 'react-native-action-button';
import Spinner from 'react-native-loading-spinner-overlay';
import Configs from '../model/config';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTasksList();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
  }

  const getTasksList = () => {
    getToken().then(token => {
      setIsLoading(true);
      fetch(
        Configs.apiUrl + `/api/v1/task`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
    });
  }
  return (
    <SafeAreaView >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getTasksList}
          />
        }>
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
