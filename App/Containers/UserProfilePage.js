import { connect } from 'react-redux';
import UserProfile from '../Components/UserProfile';
import { fetchUserInfo } from '../Actions';
// import { Actions as NavigationActions } from 'react-native-router-flux';

// NOTE: this is the standard format
// const mapStateToProps = (state, ownProps) => {
// however the ownProps only have ownProps.socket so we use {socket}

const mapStateToProps = (state) => {
  console.log(state, 'MAP USER STATE TO PROPS');
  return {
    userInfo: state.userInfo,
    userId: state.userId,
  };
};


const mapDispatchToProps = (dispatch) => ({

  fetchUserInfo: (userId) => {
    dispatch(fetchUserInfo(userId));
  },
  // updateUserInfo: (username, token) => {
  //   dispatch(updateUserInfo());
  // },
});

export default UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// export default UserProfilePage;
