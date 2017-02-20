import { connect } from 'react-redux';
import UserAccount from '../Components/UserAccount';
import { fetchUserInfo } from '../Actions';

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    // radius: state.radius,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAccountScreenInfo: (userId) => {
    dispatch(fetchUserInfo(userId));
  },

});

const UserAccountScreen = connect(mapStateToProps, mapDispatchToProps)(UserAccount);
export default UserAccountScreen;
