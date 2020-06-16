import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit'

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
    fetch(
      `http://10.0.2.2:8163/api/v1/summary`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwNjFhZjEwMWQxMmRhMWQxZjU3MGQ4MDYyOGVmOTE0NmFjYzYzOWY1Y2Q2ZmFiY2RiNGJlNGEzYzE1NDRhYzBkNzcyMzc4MTg2NjlkMjUiLCJpYXQiOjE1OTE5NDMxMDAsIm5iZiI6MTU5MTk0MzEwMCwiZXhwIjoxNjIzNDc5MTAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.yEWBza9x4SAsq_facmrvKq1-LDdHkW1YpH1KyXawXKiHoTE4-X3c9Tj29keKzmGRkvF3q4jM6ogDSC9wr1POa9MLCYBG-CMRWHRrBJ6fpl_MvpZxyIg2LTXY2-5p0LgAk-Clp1yPSg5ohaVKynJW_hs0WbmFwOnpPHPOzk_rc5yA3oXpXbqSj-jFESq1JyVPWZm7_P0O9gPz7jIVtV-FfJpnyuNULfYS-o8paK4W6DS02eNkxJtXlqmLsTgZi0f7CH0sF9xrk9h5Ssp5krWvB1ED6KYJuJ2UvJ7-zRFDQpHHgJnK5APs1lD8iH6Oc42TscbS1ddw_sxD0dIERW6h7BY1BwPTQjwThcYrpDRkdfXRQrASdj1_KGwrl8ZUf36x5K0_qs1Qm_B86pdQIc__Dh0dof5fZoenxGMzd8kaWMnzypA8jTe3HIoq0hkPgW8jlwBWyA771N1MoGrppYXjbS4H_aWU-KBm6Lc-7JN_0UPeujcxIBjl_QvHyAyf8Qc9ywPyZMM5VKwhxYLBPKyPNcP8ju7eLMBp-gmRvUakAVuNEnfSYMD5Y4FihT1ItswoJh37MXbtHj0mjPx-cFyEzkhYXcsjTGoFI5GEi9daF7sknQuYCKSY16NGU0XeS0ZJtbkmsykDrMe7YO-DKl69OYilFKe9AgNjdwnKldYgjmg'
        },
        body: JSON.stringify({
          time_period: "M"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
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
            { name: 'Completed', population: parseInt(summary.completed), color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Partially Completed', population: parseInt(summary.partially), color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Progress', population: parseInt(summary.progress), color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Failed', population: parseInt(summary.new), color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
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
        backgroundColor: chartConfig.backgroundColor
      }}
    >
      <Text >Bezier Line Chart</Text>
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
});
