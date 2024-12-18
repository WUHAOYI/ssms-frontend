import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Modal, notification } from 'antd';
import * as actions from '../../actions';
import SingleAttributeField from '../SingleAttributeField';
import SSMSButton from '../SSMSButton';

class AccountUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      name: props.name,
      phoneNumber: props.phoneNumber,
      showModal: false,
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhoneNumber = this.changePhoneNumber.bind(this);
    this.submit = this.submit.bind(this);
    this.confirmSave = this.confirmSave.bind(this);
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changePhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  submit() {
    this.setState({ showModal: true });
  }

  confirmSave() {
    this.props.dispatch(
      actions.changeAccountData(
        this.state.email,
        this.state.name,
        this.state.phoneNumber
      )
    ).then((res) => {
      if (res.data.type === 'danger') {
        notification.error({
          message: 'Save Failed',
          description: 'Unable to save changes.',
          duration: 2,
        });
      } else {
        notification.success({
          message: 'Save Successful',
          description: 'Your account details have been updated successfully!',
          duration: 1,
        });
      }
      console.log(res);
      this.setState({ showModal: false });
    });
  }

  render() {
    const { formData } = this.props;
    let element = null;

    if (!_.isEmpty(formData)) {
      const style = classNames({
        'form-response': true,
        [formData.type]: true,
      });
      element = <p className={style}>{formData.message}</p>;
    }

    return (
      <div className="account">
        <h1>Account</h1>
        <SingleAttributeField
          id="name-field"
          title="Full Name"
          fieldValue={this.state.name}
          onChange={this.changeName}
        />
        <SingleAttributeField
          id="email-field"
          title="Email"
          fieldValue={this.state.email}
          onChange={this.changeEmail}
        />
        <SingleAttributeField
          id="phone-field"
          title="Phone Number"
          fieldValue={this.state.phoneNumber}
          onChange={this.changePhoneNumber}
        />
        {element}
        <SSMSButton buttonType="primary" size="small" onClick={this.submit}>
          Save
        </SSMSButton>

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

AccountUpdate.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  formData: PropTypes.object.isRequired,
};

export default connect()(AccountUpdate);
