import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearError, setError } from './signupSlice';

export default function SignupPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [password2, setPassword2] = useState('');

  const state = useSelector(globalState => globalState.signup);
  const error = state.error;
  const signedUp = state.signedUp;

  useEffect(() => {
    if (signedUp) {
      history.push('/staff');
    }
  }, [signedUp]);

  const onSignup = (e) => {
    e.preventDefault();
    
    if(password !== password2) {
      dispatch(setError({error: 'Mật khẩu xác thực không đúng'}));
      return;
    }

    dispatch(clearError());
    dispatch(signup(username, password));
  };

  const styles = {
    signup_form : {
      border: "1px solid #DDD",
      maxWidth: "400px",
      padding: "20px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "100px"
    },

  };

  return (
    <div>
      <div style={styles.signup_form}>
        <h3>Đăng nhập</h3>
        <br />
        <form method="POST" onSubmit={onSignup}>

          <div className="form-group">
            <label>Tên tài khoản</label>
            <input type="text" 
              className="form-control"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Mật khẩu xác thực</label>
            <input type="password" 
              className="form-control" 
              value={password2}
              onChange={(e) => setPassword2(e.target.value)} />
          </div>

          <div className="form-group">
            <span id="error" style={{color:"red"}}>{error}</span>
          </div>

          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
          </div>
        </form>        
      </div>
    </div>
  )
}