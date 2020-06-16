import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Picker } from 'react-native';

import { Input, CheckBox, Button } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Content } from 'native-base';


const CreateTaskScreen = (props) => {

  const { colors } = useTheme();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [remind, setRemind] = useState(1);

  // useEffect(() => {
  //   fetch(
  //     `http://10.0.2.2:8163/api/v1/task/` + props.route.params.id,
  //     {
  //       method: "get",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwNjFhZjEwMWQxMmRhMWQxZjU3MGQ4MDYyOGVmOTE0NmFjYzYzOWY1Y2Q2ZmFiY2RiNGJlNGEzYzE1NDRhYzBkNzcyMzc4MTg2NjlkMjUiLCJpYXQiOjE1OTE5NDMxMDAsIm5iZiI6MTU5MTk0MzEwMCwiZXhwIjoxNjIzNDc5MTAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.yEWBza9x4SAsq_facmrvKq1-LDdHkW1YpH1KyXawXKiHoTE4-X3c9Tj29keKzmGRkvF3q4jM6ogDSC9wr1POa9MLCYBG-CMRWHRrBJ6fpl_MvpZxyIg2LTXY2-5p0LgAk-Clp1yPSg5ohaVKynJW_hs0WbmFwOnpPHPOzk_rc5yA3oXpXbqSj-jFESq1JyVPWZm7_P0O9gPz7jIVtV-FfJpnyuNULfYS-o8paK4W6DS02eNkxJtXlqmLsTgZi0f7CH0sF9xrk9h5Ssp5krWvB1ED6KYJuJ2UvJ7-zRFDQpHHgJnK5APs1lD8iH6Oc42TscbS1ddw_sxD0dIERW6h7BY1BwPTQjwThcYrpDRkdfXRQrASdj1_KGwrl8ZUf36x5K0_qs1Qm_B86pdQIc__Dh0dof5fZoenxGMzd8kaWMnzypA8jTe3HIoq0hkPgW8jlwBWyA771N1MoGrppYXjbS4H_aWU-KBm6Lc-7JN_0UPeujcxIBjl_QvHyAyf8Qc9ywPyZMM5VKwhxYLBPKyPNcP8ju7eLMBp-gmRvUakAVuNEnfSYMD5Y4FihT1ItswoJh37MXbtHj0mjPx-cFyEzkhYXcsjTGoFI5GEi9daF7sknQuYCKSY16NGU0XeS0ZJtbkmsykDrMe7YO-DKl69OYilFKe9AgNjdwnKldYgjmg'
  //       }
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log(response);
  //       setTask(response.result);
  //       setIsLoading(false);
  //     })
  //     .catch(error => alert(error));
  // }, []);

  function createTask() {
    fetch(`http://10.0.2.2:8163/api/v1/task/create`,
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwNjFhZjEwMWQxMmRhMWQxZjU3MGQ4MDYyOGVmOTE0NmFjYzYzOWY1Y2Q2ZmFiY2RiNGJlNGEzYzE1NDRhYzBkNzcyMzc4MTg2NjlkMjUiLCJpYXQiOjE1OTE5NDMxMDAsIm5iZiI6MTU5MTk0MzEwMCwiZXhwIjoxNjIzNDc5MTAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.yEWBza9x4SAsq_facmrvKq1-LDdHkW1YpH1KyXawXKiHoTE4-X3c9Tj29keKzmGRkvF3q4jM6ogDSC9wr1POa9MLCYBG-CMRWHRrBJ6fpl_MvpZxyIg2LTXY2-5p0LgAk-Clp1yPSg5ohaVKynJW_hs0WbmFwOnpPHPOzk_rc5yA3oXpXbqSj-jFESq1JyVPWZm7_P0O9gPz7jIVtV-FfJpnyuNULfYS-o8paK4W6DS02eNkxJtXlqmLsTgZi0f7CH0sF9xrk9h5Ssp5krWvB1ED6KYJuJ2UvJ7-zRFDQpHHgJnK5APs1lD8iH6Oc42TscbS1ddw_sxD0dIERW6h7BY1BwPTQjwThcYrpDRkdfXRQrASdj1_KGwrl8ZUf36x5K0_qs1Qm_B86pdQIc__Dh0dof5fZoenxGMzd8kaWMnzypA8jTe3HIoq0hkPgW8jlwBWyA771N1MoGrppYXjbS4H_aWU-KBm6Lc-7JN_0UPeujcxIBjl_QvHyAyf8Qc9ywPyZMM5VKwhxYLBPKyPNcP8ju7eLMBp-gmRvUakAVuNEnfSYMD5Y4FihT1ItswoJh37MXbtHj0mjPx-cFyEzkhYXcsjTGoFI5GEi9daF7sknQuYCKSY16NGU0XeS0ZJtbkmsykDrMe7YO-DKl69OYilFKe9AgNjdwnKldYgjmg'
        },
        body: JSON.stringify({
          category_id: category,
          title: title,
          description: description,
          date: "2020-06-20",
          time: "10:00:00",
          remind: remind,
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if(response.code == 200){
          props.navigation.navigate("Home");
        }
      })
      .catch(error => alert(error));
  }

  return (
    <SafeAreaView >
      <ScrollView>
        <Container>
          <Content>
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
              onChangeText={(value) => setDescription(value)}
            />
            <Input
              type='time'
              label='Date'
              placeholder='HH:MM:SS'
              onChangeText={(value) => setDescription(value)}
            />
            <CheckBox
              title='Remind'
              checked={remind}
              onPress={(remind) => setRemind(!remind)}
            />
            <Button
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
});
