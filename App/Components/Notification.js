/* eslint-disable */
import React, { PropTypes, Component } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles/NotificationStyle';
import { Metrics } from '../Themes';
import {
  Container,
  View,
  Card,
  CardItem,
  Text,
  Button,
  Content,
  Grid,
  Row,
} from 'native-base';


const Notification = ({event, handleThumbsUpIsPressed, handleThumbsDownIsPressed }) => {

  return (
    <Container >
      <Content style={Styles.view}>
        <Grid>
          <Row style={{ backgroundColor: '#D954D7', height: 150 }}></Row>
          <Row style={{ backgroundColor: '#D93735', height: 70  }}></Row>

        </Grid>

      </Content>
    </Container>
  );
}

Notification.propTypes = {
  event: PropTypes.object,
  handleThumbsUpIsPressed: PropTypes.func,
  handleThumbsDownIsPressed: PropTypes.func,
};

export default Notification;
/*
        <Card >
          <CardItem >
            <Text style={Styles.text} >{event.title}</Text>
            <Text style={Styles.text} >{event.category}</Text>        
          </CardItem>
          <CardItem >
            <Text style={Styles.count} >{event.voteCount}</Text>
            {
              !event.votable ?
                <View style={Styles.flex}>
                  <Button transparent onPress={handleThumbsUpIsPressed}>
                    <Icon name="thumbs-o-up" size={Metrics.icons.small} color={'blue'} />
                  </Button>
                  <Button transparent onPress={handleThumbsDownIsPressed}>
                    <Icon name="thumbs-o-down" size={Metrics.icons.small} color={'blue'} />
                  </Button>
                </View>
                : <View>Not Votable</View>
            }          
          </CardItem>
        </Card>

*/