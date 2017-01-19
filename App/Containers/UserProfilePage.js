import { connect } from 'react-redux';
import UserProfile from '../Components/UserProfile';
import { loadUserInfo } from '../Actions';
import { Actions as NavigationActions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    radius: state.radius,
  };
};


const mapDispatchToProps = (dispatch) => ({

  loadLoggedInUser: (userId) => {
    dispatch(loadUserInfo(userId));
  },
  // updateUserInfo: () => {
  //   dispatch(updateUserInfo());
  // },
});

const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfilePage;
