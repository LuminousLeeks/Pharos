import React, { Component, PropTypes } from 'react';
import { Body, Container, Content, List, Left, Right, ListItem, Text } from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles/UserAccountStyle';


class UserAccount extends Component {

  componentWillMount() {

  }

  render() {
    const { username, firstName, lastName, email, radius } = this.props;
    return (
        <Container style={Styles.container}>
          <Content>
            <List>
              <ListItem>
                <Text>
                  <Text>Username: </Text>
                  <Text>{`${username}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Full Name: </Text>
                  <Text>{`${firstName} ${lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Email: </Text>
                  <Text>{`${email}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Radius: </Text>
                  <Text>{`${radius}`}</Text>
                </Text>
              </ListItem>
              <ListItem button onPress={NavigationActions.categoriesList}>
                <Text>Edit Subscriptions  <Icon name="cog" size={15} /> </Text>

              </ListItem>
            </List>
          </Content>
        </Container>
    );
  }
}

UserAccount.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  radius: PropTypes.number,
  categories: PropTypes.array,
};

export default UserAccount;
