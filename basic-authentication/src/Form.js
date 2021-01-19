import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignup from './ConfirmSignup';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 45,
    marginTop: 8,
    width: 300,
    maxWidth: 300,
    padding: '8px 8px',
    fontSize: 16,
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid rgba(0,0,0,.3)'
  },
  toggleForm: {
    fontWeight: '600',
    padding: '0px 25px',
    marginTop: 15,
    marginBottom: 0,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, .3)'
  },
  resetPassword: {
    marginTop: '5px'
  },
  anchor: {
    color: '#006bfc',
    cursor: 'pointer'
  }
};

const initialFormState = {
  username: '',
  password: '',
  email: '',
  confirmationCode: ''
};

function Form(props) {
  const [formType, updateFormType] = useState('signIn');
  const [formState, updateFormState] = useState(initialFormState);

  function updateForm(event) {
    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value
    };
    updateFormState(newFormState);
  }

  async function signIn({ username, password }, setUser) {
    try {
      console.log('signIn');
      const user = await Auth.signIn(username, password);
      const userInfo = { username: user.username, ...user.attributes };
      console.log('signIn success');
      setUser(userInfo);
    } catch (e) {
      console.log('signIn error');
    }
  }

  async function signUp({ username, password, email }, updateFormType) {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log('signUp success');
      updateFormType('confirmSignup');
    } catch (e) { 
      console.log('signUp error', e)
    }
  }
  async function confirmSignUp({ username, confirmationCode }, updateFormType) {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('confirmSignUp success');
      updateFormType('signIn');
    } catch (e) { 
      console.log('confirmSignup error', e)
    }
  }
  async function forgotPassword({ username }, updateFormType) {
    try {
      await Auth.forgotPassword(username);
      console.log('forgotPassword success');
      updateFormType('forgotPasswordSubmit');
    } catch (e) { 
      console.log('forgotPassword error', e)
    }
  }
  async function forgotPasswordSubmit({ username, password, confirmationCode }, updateFormType) {
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, password);
      console.log('forgotPasswordSubmit success');
      updateFormType('signIn')
    } catch (e) { 
      console.log('forgotPasswordSubmit error', e)
    }
  }

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={e => updateForm(e)} />
        );
      case 'confirmSignup':
        return (
          <ConfirmSignup
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={e => updateForm(e)} />
        );
      case 'signIn':
        return (
          <SignIn 
            signIn={() => signIn(formState, props.setUser)}
            updateFormState={e => updateForm(e)} />
        );
      case 'forgotPassword':
        return (
          <ForgotPassword
            forgotPassword={() => forgotPassword(formState, updateFormType)}
            updateFormState={e => updateForm(e)} />
        );
      case 'forgotPasswordSubmit':
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() => forgotPasswordSubmit(formState, updateFormType)}
            updateFormState={e => updateForm(e)} />
        );
      default:
        return null;
    }
  }

  return (<div>
    {renderForm()}
    {
      formType === 'signUp' && (<p style={styles.toggleForm}>
        Already have an account? <span style={styles.anchor} onClick={() => updateFormType('signIn')}>Sign In</span>
      </p>)
    }
    {
      formType === 'signIn' && (
        <>
        <p style={styles.toggleForm}>
          Need an account? <span style={styles.anchor} onClick={() => updateFormType('signUp')}>Sign Up</span>
        </p>
        <p style={styles.toggleForm}>
          Forgot your Password? <span style={styles.anchor} onClick={() => updateFormType('forgotPassword')}>Reset Password</span>
        </p>
        </>
      )
    }
    {
      formType === 'forgotPassword' && (<p style={styles.toggleForm}>
        Already reset your password? <span style={styles.anchor} onClick={() => updateFormType('forgotPasswordSubmit')}>Enter Verification Code</span>
      </p>)
    }
  </div>)
}

export { styles, Form as default };