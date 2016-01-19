/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var NavigationBar = require('react-native-navbar');
var Drawer = require('react-native-drawer')
var colors = require( './resources/colors' ).mainScreen;
var strings = require( './resources/strings' ).mainScreen;
var styles = require( './resources/styles' ).mainScreen;

var dataManager = require( './data/dataManager' );

var React = require('react-native');
var {
  AlertIOS,
  AppRegistry,
  Navigator,
  Image,
  ListView,
  StyleSheet,
  ProgressViewIOS,
  TabBarIOS,
  TouchableOpacity,
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
    var self = this;
    dataManager.fetchListOfPokemon(function handleFetchListOfPokemon( error, data ) {
      if ( error ) {
        AlertIOS.alert(
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

    var leftView = (
      <TouchableOpacity onPress={() => {this.refs.drawer.open()}}>
        <Image style={styles.toolbarIcon} source={require('./images/pokeball.png')}/>
      </TouchableOpacity>
    );

    return (
      <Drawer
        type="overlay"
        ref="drawer"
        content={navigationView}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{
          drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3}
        }}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        
          <NavigationBar
            tintColor= {colors.toolbarBackground}
            statusBar= {{ tintColor: colors.toolbarBackgroundDark, style: 'light-content', hidden: false }}
            title={{ title: strings.titleText, tintColor: colors.titleColor }}
            leftButton={leftView} />

          <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderPokemon}
              style={styles.listView}/>

          </ScrollView>
      </Drawer>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <ProgressViewIOS progressTintColor="purple" />
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