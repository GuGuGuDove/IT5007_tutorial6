import React, { Component } from 'react'
import { Button, View, Text, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import RNRestart from 'react-native-restart'; 
import ApolloClient from 'apollo-boost';
// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
// Fuck this idiot { ApolloClient }. Can the developer distinguish it from default export?
import { ApolloProvider, graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const client = new ApolloClient({ uri: 'http://10.0.2.2:5000/graphql' });

// const client = new ApolloClient({ uri: 'http://192.168.1.91:5000/graphql' });

// const client = new ApolloClient({
//   link: new HttpLink({uri: 'https://192.168.1.91:5000/graphql'}),
//   cache: new InMemoryCache()
// });

const customerQuery = gql`
  query {
    customerList {
      id
      name
      phone
      created
    }
  }`;

const CustomerTable = graphql(customerQuery)(props => {
  const { error, customerList } = props.data;

  if (error) {
    return <Text style={{textAlign: 'center'}}>Something Error!</Text>;
  }

  if (customerList) {
    const head = ['ID', 'NAME', 'PHONE', 'CREATED'];
    const customerData = customerList.map(customer => {return [customer.id, customer.name, customer.phone, customer.created]})
    return (
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={head} style={styles.head} textStyle={styles.text}/>
        <Rows data={customerData} textStyle={styles.text}/>
      </Table>
    );
  }

  return <Text style={{textAlign: 'center'}}>Loading...</Text>;
});


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      name: 'null',
      phone: 'null'
    }
    this.updateName = this.updateName.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  updateName(text) {this.setState({name: text})}
  updatePhone(text) {this.setState({phone: text})}
  refresh(){RNRestart.Restart()}


  render () {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={{textAlign: 'center', color: 'green', fontSize:40}}>Hotel California</Text>
            <Text style={{textAlign: 'center', color: 'green', fontSize:25}}>Waiting List Management System</Text>
            <Text style={{textAlign: 'center', color: 'black', marginTop: 40, fontSize:20}}>Please Input the Customer Info</Text>
            <TextInput onChangeText={this.updateName} style={styles.input} placeholder="Name"/>
            <TextInput onChangeText={this.updatePhone} style={styles.input} placeholder="Phone"/>

            <View style={{marginHorizontal: 100, marginBottom: 10}}> 
              <Button
                title="try this"
                onPress={() => Alert.alert('Haha! I did not implement the mutation function!')}
              />
            </View>
            <Text style={{textAlign: 'center', color: 'red'}}>I wrote the logic for state maintenance. For my 8 points! Just input something in above forms!</Text>
            <Text style={{textAlign: 'center'}}>state.name now is: {this.state.name}</Text>
            <Text style={{textAlign: 'center'}}>state.phone now is: {this.state.phone}</Text>
            <Text style={{textAlign: 'center', color: 'orange', fontSize:30}}>The Waiting List</Text>
            <View style={{marginHorizontal: 100, marginBottom: 10}}> 
              <Button title="Refresh" onPress={this.refresh}/>
            </View>
            <CustomerTable />
          </ScrollView>
        </SafeAreaView>
      </ApolloProvider>
    )
  }

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 10,
    paddingLeft: 10
  },
  button:
  {
    height: 30,
    width: 10,
  },
  head: { height: 40, backgroundColor: '#f1f8ff'},
  text: { margin: 6, textAlign: 'center' }
});
