import _ from 'lodash';
import React, { PropTypes } from 'react';
import SSMSButton from 'components/SSMSButton';
import { SCHEDULING_VIEW_BY_OPTIONS } from 'constants/config';

require('./scheduling-view-by-controller.scss');

function SchedulingViewByController({ viewBy, onClick, disabled = false }) {
  return (
    <div className="scheduling-view-by-controller">
      {
        _.map(SCHEDULING_VIEW_BY_OPTIONS, (buttonView) => {
          const key = `viewBy-${buttonView.id}`;
          return (
            <SSMSButton
              key={key}
              data-id={buttonView.id}
              onClick={onClick}
              buttonType="outline-dark"
              active={viewBy === buttonView.id}
              disabled={disabled}
            >
              {buttonView.name}
            </SSMSButton>
          );
        })
      }
    </div>
  );
}

SchedulingViewByController.propTypes = {
  viewBy: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SchedulingViewByController;
