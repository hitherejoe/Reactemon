'use strict';

var ToolbarAndroid = require('ToolbarAndroid');
var ProgressBar = require('ProgressBarAndroid');
var colors = require( './resources/colors' ).mainScreen;
var strings = require( './resources/strings' ).mainScreen;
var dimens = require( './resources/dimensions' ).mainScreen;

var drawerRef = 'DRAWER';

var React = require('react-native');
var {
  Alert,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
  Text,
  View,
} = React;

var REQUEST_URL = 'http://pokeapi.co/api/v1/pokedex/1/';

var Reactemon = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      colorProps: {
        titleColor: colors.titleColor
      },
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.pokemon),
          loaded: true,
        });
      })
      .catch((error) => {
        Alert.alert(
            'Oops',
            'There was an error retrieving the data',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
      });
  },

  openDrawer:function() {
    this.refs[drawerRef].openDrawer()
  },

  render: function() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{backgroundColor: colors.toolbarBackground, height: 175, flexDirection:'row', alignItems:'flex-end'}}>
          <Image style={styles.circleImage} source={require('./images/ash.png')}/>
          <Text style={styles.profileItem}>{'Ash Ketchum'}</Text>
        </View>

        <Text style={styles.drawerItem}>{'Settings'}</Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
      ref={drawerRef}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./images/pokeball.png')}
            onIconClicked={this.openDrawer}
            title="Reactemon"
            style={styles.toolbar}
            {...this.state.colorProps}/>

          <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderPokemon}
              style={styles.listView}/>

          </ScrollView>
      </DrawerLayoutAndroid>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <ProgressBar styleAttr="Inverse" />
      </View>
    );
  },

  renderPokemon: function(pokemon) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.toTitleCase(pokemon.name)}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.listBackground,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: dimens.itemText,
  },
  drawerItem: {
    fontSize: dimens.drawerItemText,
    margin: 16,
  },
  profileItem: {
    fontSize: dimens.drawerItemText,
    marginBottom: 16,
    color: colors.white,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    backgroundColor: colors.listBackground,
  },
  toolbar: {
    backgroundColor: colors.toolbarBackground,
    height: 56,
  },
  circleImage: {
    height: 78,
    borderRadius: 50,
    width: 78,
    margin: 16,
  }
});

AppRegistry.registerComponent('Reactemon', () => Reactemon);
