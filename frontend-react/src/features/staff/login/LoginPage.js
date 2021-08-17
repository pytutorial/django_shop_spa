import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

export default function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const login = () => {
    setError('');

    axios.post('/api/token', { username, password })
    .then(result => {
      localStorage.setItem('token', result.data.access);
      history.push('/staff')
    }).catch(e => 
      setError('Tên đăng nhập hoặc mật khẩu không đúng')
    );
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
        <form method="POST" onSubmit={(e) => {e.preventDefault(); login();}}>

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