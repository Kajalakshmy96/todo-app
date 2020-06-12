import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import { Card } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Text, Button, Body, Left, Right, Icon } from 'native-base';

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const theme = useTheme();

  return (
    // <View style={styles.container}>
    //   <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
    //   <Text style={{ color: colors.text }}>Home Screen</Text>
    //   <Button
    //     title="Go to details screen"
    //     onPress={() => navigation.navigate("Details")}
    //   />
    // </View>

    <SafeAreaView >
      <ScrollView >
        <Container>
          <Header />
          <Content padder>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => alert("This is Card Header")}>
                <Text>Wake up at 5!</Text>
              </CardItem>
              <CardItem button onPress={() => alert("This is Card Body")}>
                <Body>
                  <Text>
                    Wake up at 5AM.
                </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text></Text>
                </Left>
                <Right>
                  <Text>2020-06-15 09:00:00</Text>
                </Right>
              </CardItem>
            </Card>
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
});
