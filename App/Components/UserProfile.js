import React, { PropTypes } from 'react';
import { Button, Container, Content, List, ListItem, Text } from 'native-base';
import Styles from './Styles/UserProfileStyle';

const testUser = {
  username: 'demo',
  firstName: 'John',
  lastName: 'Smith',
}

const UserProfile = ({ username, firstName, lastName }) => (
  <Container>
    <Content>
      <List>
        <ListItem>
          <Text value="TEST" />
          <Text inlineLabel label="Last Name" value="TEST" />
        </ListItem>
        <ListItem>
          <Text>Username:</Text>
          <Text >{testUser.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Full name:</Text>
          <Text>{testUser.firstName}</Text>
          <Text>{testUser.lastName}</Text>
          <Text value={'TEST'} />
        </ListItem>
        <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
          Update User Profile
        </Button>
      </List>
    </Content>
  </Container>
);

UserProfile.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default UserProfile;