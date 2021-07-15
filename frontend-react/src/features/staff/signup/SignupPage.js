import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function SignupPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); 
  const [error, setError] = useState('');

  const signup = () => {
    
    if(password !== password2) {
      setError('Mật khẩu xác thực không đúng');
      return;
    }

    setError('');

    axios.post('/api/signup', { username, password })
      .then(_ => {
        axios.post('/api/token', { username, password }).then(result => {          
          localStorage.setItem('token', result.data.access);
          history.push('/staff/')
        });        
      }).catch(e => setError(e.response.data));
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
        <form method="POST" onSubmit={(e) => {e.preventDefault(); signup()}}>

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
              onChange={(e) => setPassword(e.target.value) } />
          </div>

          <div className="form-group">
            <label>Mật khẩu xác thực</label>
            <input type="password" 
              className="form-control" 
              value={password2}
              onChange={(e) => setPassword2(e.target.value) } />
          </div>

          <div className="form-group">
            <span style={{color:"red"}}>{error}</span>
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