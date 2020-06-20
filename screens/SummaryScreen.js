import React, { useState, useEffect } from 'react';
import { View, RefreshControl, Text, Button, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Spinner from 'react-native-loading-spinner-overlay';
import Configs from '../model/config';
import AsyncStorage from '@react-native-community/async-storage';

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

  const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
  }

  useEffect(() => {
    setIsLoading(true);
    getSummary();
  }, []);

  const getSummary = () => {
    setIsLoading(true);
    getToken().then(token => {
      fetch(
        Configs.apiUrl + `/api/v1/summary`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
        .catch(error => {
          setIsLoading(false);
          alert(error);
        });
    });
  }

  return (
    // <Text>Test</Text>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={getSummary}
        />
      }
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
