import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Container, Content, List, ListItem, CheckBox, Text } from 'native-base';

// Styles
import Styles from './Styles/CategoriesListStyle';

class CategoriesList extends Component {


  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  }

  // handleCheckBoxSelection(e) {  // TODO: finish handling the checkbox selecting action
  //   const { username, categories, selectedCategories } = this.state;
  //   this.
  //   e.prnotificationDefault();
  //   // this.props.toggleCategory(selectedCategories)
  //   console.log('handle selected');
  // };

  render() {
    const { categories } = this.props;
    return (
        <Container style={Styles.container}>
          <Content>
            <List
              dataArray={categories} renderRow={item =>
                <ListItem>
                    <Text>{item.name}</Text>
                  <CheckBox iconRight checked={true} />
                </ListItem>
              }
            />

          </Content>
        </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    username: state.username,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
