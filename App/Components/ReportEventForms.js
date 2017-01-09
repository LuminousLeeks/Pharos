// @flow

import React from 'react';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';

import Styles from './Styles/ReportEventFormsStyle';

const ReportEventForms = ({ newEvent }) =>(
  <Container>
    <Content style={{padding:20}}>
      <Text
        style={{alignSelf: 'center', marginTop:200, marginBottom: 20}}
      >
       {'Report: ' + newEvent.description + ', ' + newEvent.event}
      </Text>
      <InputGroup borderType='rounded'>
          <Input
            style={{height:300, marginTop:20}}
            stackedLabel
            label="Report"
            placeholder="add more details about event"
          />
      </InputGroup>
      <Button style={{
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
      }}>
          Submit
      </Button>
    </Content>
  </Container>
);

export default ReportEventForms;