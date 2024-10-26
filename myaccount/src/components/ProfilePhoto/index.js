import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

function ProfilePhoto({ photoUrl }) {
  return (
    <div className="profile-photo">
      <img
        className="circle-frame"
        role="presentation"
        src={photoUrl}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    changePhoto: bindActionCreators(
      actions.changePhoto,
      dispatch
    ),
  };
}

ProfilePhoto.propTypes = {
  photoUrl: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(ProfilePhoto);
