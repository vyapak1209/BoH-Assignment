import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

class Wrapper extends React.Component {
  render() {
    const { route } = this.props;

    return (
      <div>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

Wrapper.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Wrapper;
