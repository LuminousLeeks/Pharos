import React, { PropTypes, Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { List, ListItem, CheckBox, Text } from 'native-base';
import { fetchCategories, saveSelectedCategories, toggleCategory } from './../Actions/index.js';
// TODO: Remove Test Data
<<<<<<< HEAD
import EventCategories from './../Lib/EventCategories';
=======
import NotificationCategories from './../Lib/NotificationCategories';
>>>>>>> upstream/master

// For empty lists
import AlertMessage from './../Components/AlertMessage';

// Styles
import styles from './Styles/CategoriesListStyle';

class CategoriesList extends React.Component {

  state: {
<<<<<<< HEAD
    dataSource: EventCategories
=======
    dataSource: NotificationCategories
>>>>>>> upstream/master
  }

  constructor(props) {
    super(props);
    // If you need scroll to bottom, consider http://bit.ly/2bMQ2BZ

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
<<<<<<< HEAD
    const dataObjects = EventCategories;
=======
    const dataObjects = NotificationCategories;
>>>>>>> upstream/master

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged });

    // Datasource is always in state
    dataSource.
    this.state = {
      dataSource: ds.cloneWithRows(),
    }
  }

  handleCheckBoxSelection(e) {  // TODO: finish handling the checkbox selecting action
    const { username, categories, selectedCategories } = this.state;
    this.
<<<<<<< HEAD
    e.preventDefault();
=======
    e.prnotificationDefault();
>>>>>>> upstream/master
    // this.props.toggleCategory(selectedCategories)
    console.log('handle selected');
  };
  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderCategories(categories) {
    return (
      categories.forEach( category => {
        return !this.state.selectedCategories.indexOf(category);
      })
    )
  }
  renderRows(rowData) {
    return (
      <ListItem>
        <CheckBox checked={true} onPress={this.handleSelected} />
        <Text>{rowData.title}</Text>
      </ListItem>
    );
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/
  // componentWillReceiveProps (newProps) {
  //   if (newProps.categories){
  //     this.setState({
  //       categories: this.state.categories.cloneWithRows(newProps.someData),
  //     });
  //   }
  // }
  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData() {
    return this.state.dataSource.getRowCount() === 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <AlertMessage title="Nothing to See Here, Move Along" show={this.noRowData()} />
        <Text>Select Notification Categories</Text>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} // TODO: Update
          renderFooter={this.renderFooter}
          enableEmptySections
          pageSize={this.state.dataSource.length} // TODO: update
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //userId: // TODO: need to update later
    username: state.username,
    token: state.token,
    selectedCategories: state.selectedCategories,



    // ...redux state to props here
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
