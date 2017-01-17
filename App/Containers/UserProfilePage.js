import { connect } from 'react-redux';
import UserProfile from '../Components/UserProfile';
import { fetchUserInfo, updateUserInfo } from '../Actions';
import { Actions as NavigationActions } from 'react-native-router-flux';

// NOTE: this is the standard format
// const mapStateToProps = (state, ownProps) => {
// however the ownProps only have ownProps.socket so we use {socket}

const mapStateToProps = (state, ownProps) => {
  console.log(state, 'MAP USER STATE TO PROPS');
  // return {
  //   username: state.username,
  //   firstName: state.firstName,
  //   lastName: state.lastName,
  //   token: state.token,
  // };
  const { username, firstName, lastName } = state;
  return { username, firstName, lastName };
  // email: state.email,
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  fetchUserInfo: (username, token) => {
    dispatch(fetchUserInfo(username, token));
  },
  updateUserInfo: (username, token) => {
    dispatch(updateUserInfo(username, token));
  },
});

const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfilePage;
