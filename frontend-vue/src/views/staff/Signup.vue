<template>
  <div>
    <div class="signup-form">
      <h3>Đăng ký tài khoản</h3>
      <br />
      <form @submit.prevent="signUp()">
        <div class="form-group">
          <label>Tên tài khoản</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label>Mật khẩu xác thực</label>
          <input v-model="password2" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <span style="color: red">{{error}}</span>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Đăng ký
          </button>
        </div>
      </form>
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
      password2: '',
      error: ''
    }
  },

  methods:{
    async signUp() {
      this.error = '';
      if(this.password != this.password2) {
        this.error = 'Mật khẩu xác thực không đúng';
        return;
      }

      await axios.post('/api/signup', {username: this.username, password: this.password})
        .then(result => {
          console.log(result);

          axios.post('/api/token', { username: this.username, password: this.password })
            .then(result => {
              localStorage.setItem('token', result.data.access);
              this.$router.push('/staff');
            });

        }).catch(e => {
          this.error = e.response.data.error;
        })
    }
  }
};
</script>

<style>
.signup-form {
  border: 1px solid #ddd;
  max-width: 400px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
</style>