import React from 'react';
import { Route } from 'react-router-dom';

class NotFound extends React.PureComponent {

  render() {
    return (
      <Route render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            Not Found
          </div>
        )
      }} />
    );
  }
}

NotFound.propTypes = {
  
};


NotFound.defaultProps = {
  
};

export default NotFound;

