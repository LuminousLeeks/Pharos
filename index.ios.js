// @flow

// import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native';
import App from './App/Containers/App';
import SocketIO from 'react-native-socketio';

AppRegistry.registerComponent('Pharos', () => App);
