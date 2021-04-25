import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, clearError } from './loginSlice';

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const state = useSelector(globalState => globalState.login);
  const error = state.error;
  const loggedIn = state.loggedIn;

  useEffect(() => {
    if (loggedIn) {
      history.push('/staff');
    }
  }, [loggedIn]);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(login(username, password));
  };

  const styles = {
    login_form : {
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
      <div style={styles.login_form}>
        <h3>Đăng nhập</h3>
        <br />
        <form method="POST" onSubmit={onLogin}>

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
            <span id="error" style={{color:"red"}}>{error}</span>
          </div>

          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
          </div>
        </form>
        <p className="text-center">
          <Link to="/staff/signup">Đăng ký tài khoản</Link>
        </p>
      </div>
    </div>
  )
}