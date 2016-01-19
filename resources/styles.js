var colors = require( './colors.js' ).mainScreen;
var dimens = require( './dimensions' ).mainScreen;

var mainScreen;

mainScreen = {
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
  },
  toolbarIcon: {
    height: 24,
    width: 24,
    marginLeft: 8,
  }
};

module.exports = {
	mainScreen
}