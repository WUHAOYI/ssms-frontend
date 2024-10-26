import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Modal, notification } from 'antd';
import SingleAttributeField from '../SingleAttributeField';
import StaffjoyButton from '../StaffjoyButton';
import PasswordsMatch from './PasswordsMatch';
import * as actions from '../../actions';

class PasswordUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      showModal: false,
    };
    this.changeNewPassword = this.changeNewPassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
    this.confirmSave = this.confirmSave.bind(this);
  }

  changeNewPassword(e) {
    this.setState({ newPassword: e.target.value });
  }

  changeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  submitPassword() {
    this.setState({ showModal: true });
  }

  confirmSave() {
    // UI will not allow action without password matching
    if (this.state.newPassword === this.state.confirmPassword) {
      this.props.dispatch(
        actions.changePassword(this.state.newPassword)
      ).then((res) => {
        if (res.data !== undefined && res.data.type === 'danger') {
          notification.error({
            message: 'Save Failed',
            description: 'Unable to save changes.',
            duration: 2,
          });
        } else {
          notification.success({
            message: 'Save Successful',
            description: 'Your password has been updated successfully!',
            duration: 1,
          });
        }
        this.setState({ showModal: false });
        this.setState({
          newPassword: '',
          confirmPassword: '',
        });
      });
    }
  }

  render() {
    const { formData } = this.props;
    const { newPassword, confirmPassword } = this.state;
    const passwordButtonDisabled = _.isEmpty(confirmPassword) || (newPassword !== confirmPassword);
    let element = null;

    if (!_.isEmpty(formData)) {
      const style = classNames({
        'form-response': true,
        [formData.type]: true,
      });
      element = <p className={style}>{formData.message}</p>;
    }

    return (
      <div className="security">
        <h1>Change your password</h1>
        <SingleAttributeField
          id="new-password-field"
          title="New Password"
          fieldValue={this.state.newPassword}
          onChange={this.changeNewPassword}
          type="password"
        />
        <SingleAttributeField
          id="confirm-password-field"
          title="Confirm Password"
          fieldValue={this.state.confirmPassword}
          onChange={this.changeConfirmPassword}
          type="password"
        />
        <PasswordsMatch
          original={this.state.newPassword}
          matching={this.state.confirmPassword}
        />
        {element}
        <StaffjoyButton
          buttonType="primary"
          size="small"
          onClick={this.submitPassword}
          disabled={passwordButtonDisabled}
        >
          Save
        </StaffjoyButton>

        <Modal
          title="Confirm Save"
          visible={this.state.showModal}
          onOk={this.confirmSave}
          onCancel={() => this.setState({ showModal: false })}
        >
          <p>Are you sure you want to save the changes?</p>
        </Modal>
      </div>
    );
  }
}

PasswordUpdate.propTypes = {
  dispatch: PropTypes.func,
  formData: PropTypes.object.isRequired,
};

export default connect()(PasswordUpdate);
