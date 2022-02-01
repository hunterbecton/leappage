import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

export const PrivateRoute = ({ children, isAdmin, ...rest }) => {
  const { user } = useAuth();

  const handleRender = (user) => {
    if (isAdmin) {
      return user.role === 'user' ? <Redirect to='/login' /> : children;
    } else {
      return user ? children : <Redirect to='/login' />;
    }
  };

  return <Route {...rest} render={() => handleRender(user)}></Route>;
};

PrivateRoute.defaultProps = {
  isAdmin: false,
};
