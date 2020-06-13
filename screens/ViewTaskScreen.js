import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, List, ListItem, Title, Text, Button, Body, Left, Right, Icon } from 'native-base';


const ViewTaskScreen = (props) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [task, setTask] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://10.0.2.2:8163/api/v1/task/` + props.route.params.id,
      {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwNjFhZjEwMWQxMmRhMWQxZjU3MGQ4MDYyOGVmOTE0NmFjYzYzOWY1Y2Q2ZmFiY2RiNGJlNGEzYzE1NDRhYzBkNzcyMzc4MTg2NjlkMjUiLCJpYXQiOjE1OTE5NDMxMDAsIm5iZiI6MTU5MTk0MzEwMCwiZXhwIjoxNjIzNDc5MTAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.yEWBza9x4SAsq_facmrvKq1-LDdHkW1YpH1KyXawXKiHoTE4-X3c9Tj29keKzmGRkvF3q4jM6ogDSC9wr1POa9MLCYBG-CMRWHRrBJ6fpl_MvpZxyIg2LTXY2-5p0LgAk-Clp1yPSg5ohaVKynJW_hs0WbmFwOnpPHPOzk_rc5yA3oXpXbqSj-jFESq1JyVPWZm7_P0O9gPz7jIVtV-FfJpnyuNULfYS-o8paK4W6DS02eNkxJtXlqmLsTgZi0f7CH0sF9xrk9h5Ssp5krWvB1ED6KYJuJ2UvJ7-zRFDQpHHgJnK5APs1lD8iH6Oc42TscbS1ddw_sxD0dIERW6h7BY1BwPTQjwThcYrpDRkdfXRQrASdj1_KGwrl8ZUf36x5K0_qs1Qm_B86pdQIc__Dh0dof5fZoenxGMzd8kaWMnzypA8jTe3HIoq0hkPgW8jlwBWyA771N1MoGrppYXjbS4H_aWU-KBm6Lc-7JN_0UPeujcxIBjl_QvHyAyf8Qc9ywPyZMM5VKwhxYLBPKyPNcP8ju7eLMBp-gmRvUakAVuNEnfSYMD5Y4FihT1ItswoJh37MXbtHj0mjPx-cFyEzkhYXcsjTGoFI5GEi9daF7sknQuYCKSY16NGU0XeS0ZJtbkmsykDrMe7YO-DKl69OYilFKe9AgNjdwnKldYgjmg'
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setTask(response.result);
        setIsLoading(false);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <SafeAreaView >
      <ScrollView >
        <Container>
          <Content>
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
            </List>

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
});
