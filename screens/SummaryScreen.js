import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Spinner from 'react-native-loading-spinner-overlay';

const SummaryScreen = ({ navigation }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const graphStyle = {
    marginVertical: 8,
    ...chartConfig.style
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pure-tundra-14665.herokuapp.com/api/v1/summary`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUxMGU2NTNmZGRhZWFiYmQ3YzU1MWQzODZjZWE5NGFkNzEwNjg3ZWZkOWI2ZjkxMjVhNTU1MzE4NmNlN2VlZDhhOGFjOGRjMzIzMDExNjciLCJpYXQiOjE1OTI1MTIyNTUsIm5iZiI6MTU5MjUxMjI1NSwiZXhwIjoxNjI0MDQ4MjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SOUjXHDjUNbM4FUKZbLMl5sC_N0rEC14e5zF-tkIzO3ZuEW9TZ4jZZYu4ZkBsXRJG_x7edtuzbwstYqSbx7dy9Tb4UcvdDFjwdqgmcoB1xOG3stlI4djTyEk6LlFvn7qeP3Pgz8i41dzGnCY-XvUvuXy_aazEwznGPyOzeLylSDOpcowljGk3rfaWMTHzPdwf0ZxHcjbaG_-WqAonY_PdsuGAu3lkojtrXyYrihyLxuy4ekDgndUS3dCxNFeAHJt_Uc8GebDC3HJdbsK1ON3Bvc_MNkAaEuGzn9UxD9sRXYtyUaV6T4udZUgEAzeFUfEMmPc_W1NBg19BYAoxu7miMxM8T8Ms_VB5YfNzYaSKuUkp3mUObtopXsGCvgAkk4mh8EAlG8Vav_ZCV1s_M1aVZ0fLeEIfbNx-TFvvyziEbQLvOEWiVlN4-hos5tO34fomAwxUqhStWttx-iVBGe5hVb8slqyOcEGf7rIYEEgGq_BtyLn0D3v0KwesShsjFtniiuG4qnO6T5K8ciV1aiF_5Eq-Ev5kKWZPVD2YzFFOoxMQWx15pwvHLEJJJVdU3JZR4noi9zRG8UEZ4XoXB6GYR-pH4uCP2S-M-x73031WkVq6IIVx7uFkfXV2C1E2Zz9WN_CJ0zEJMd4fAnPmq0KRsEkqRuJ4zKyqbwe-IAGwzM'
        },
        body: JSON.stringify({
          time_period: "M"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setIsLoading(false);
        // console.log(response);
        //Sample Pie Chart Data
        // const pieChartData = [
        //   { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        //   { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        //   { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        //   { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        //   { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        // ]  
        var tmpPieChartData = [];
        response.result.map((summary) => {
          console.log(summary);
          tmpPieChartData = [
            // { name: 'New Tasks', population: parseInt(summary.new), color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Completed', population: parseInt(summary.completed), color: '#52d726', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Partially Completed', population: parseInt(summary.partially), color: '#e01e84', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Progress', population: parseInt(summary.progress), color: '#ff7300', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Failed', population: parseInt(summary.new), color: '#ff0000', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ];
          console.log(tmpPieChartData);
        });
        setPieChartData(tmpPieChartData);
        setIsLoading(false);
      })
      .catch(error => alert(error));
  }, []);

  return (
    // <Text>Test</Text>
    <ScrollView
      key={Math.random()}
      style={{
        // backgroundColor: chartConfig.backgroundColor
      }}
    >
      {/* <Text >Tasks Summay</Text> */}
      <Spinner
        visible={isLoading}
        textContent={'Loading summary...'}
        textStyle={styles.spinnerTextStyle}
      />
      <PieChart
        data={pieChartData}
        height={220}
        width={Dimensions.get('window').width}
        chartConfig={chartConfig}
        accessor="population"
        style={graphStyle}
      />
    </ScrollView>
  );
};

export default SummaryScreen;

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
