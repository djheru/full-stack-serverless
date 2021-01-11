import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { attachEventProps } from '@aws-amplify/ui-react/lib-esm/react-component-lib/utils';

const protectedRoute = (Comp, route = '/profile') => props => {
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser()
    } catch(e) {
      attachEventProps.history.push(route)
    }
  }

  useEffect(() => {
    checkAuthState()
  }, []);
  return <Comp {...props} />
}

export default protectedRoute;