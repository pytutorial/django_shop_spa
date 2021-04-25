<template>
  <div>
    <div class="login-form">
      <h3>Đăng nhập</h3>
      <br />
      <form @submit.prevent="logIn()">
        <div class="form-group">
          <label>Tên tài khoản</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <span id="error" style="color: red"></span>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Đăng nhập
          </button>
        </div>
        
      </form>
      <p class="text-center">
        <router-link to="/staff/signup">Đăng ký tài khoản</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },

  methods: {
    logIn() {
      axios.post('/api/token', { username: this.username, password: this.password })
      .then(result => {
        localStorage.setItem('token', result.data.access);
        this.$router.push('/staff');
      }).catch(e => {
        console.log(e);
        this.error = 'Tên đăng nhập hoặc mật khẩu không đúng';
      });
    }
  }
};
</script>

<style>
.login-form {
  border: 1px solid #ddd;
  max-width: 400px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
</style>