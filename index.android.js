'use strict';

var ToolbarAndroid = require('ToolbarAndroid');
var ProgressBar = require('ProgressBarAndroid');
var colors = require( './resources/colors' ).mainScreen;
var strings = require( './resources/strings' ).mainScreen;
var styles = require( './resources/styles' ).mainScreen;
var StatusBarAndroid = require('react-native-android-statusbar');

var dataManager = require( './data/dataManager' );

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
  StatusBarAndroid.setHexColor(colors.toolbarBackgroundDark);

    var self = this;
    dataManager.fetchListOfPokemon(function handleFetchListOfPokemon( error, data ) {
      if ( error ) {
        console.error( error );
        Alert.alert(
            'Oops',
            'There was an error retrieving the data',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
      } else {

        self.setState({
            dataSource: self.state.dataSource.cloneWithRows(data.pokemon),
            loaded: true,
          });
      }
  });
  },

  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
            title={strings.titleText}
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
        <ProgressBar progressTintColor="yellow" />
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

var styles = StyleSheet.create(styles);

AppRegistry.registerComponent('Reactemon', () => Reactemon);