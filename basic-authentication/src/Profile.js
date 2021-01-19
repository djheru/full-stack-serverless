import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Auth, Hub } from 'aws-amplify';
import Container from './Container';
import Form from './Form';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    Hub.listen('auth', data => {
      console.log('Hub auth data: ', data);
      const { payload } = data;
      if (payload.event === 'signOut') {
        setUser(null)
      }
    });
  }, []);

  const checkUser = async () => {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      console.log('signOut error: ', e)
    }
  }

  return user ? (
    <Container>
      <h1>Profile</h1>
      <h2>Username: { user.username }</h2>
      <h3>Email: { user.email }</h3>
      <Button onClick={signOut} >Sign Out</Button>
    </Container>
  ) : (
    <Form setUser={setUser} />
  )
}

export default Profile;