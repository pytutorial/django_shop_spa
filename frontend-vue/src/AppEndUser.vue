<template>
  <div>
    <div class="bg-primary">
      <div class="container">
        <nav class="navbar navbar-expand navbar-dark bg-primary p-0">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Sản phẩm</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">Liên hệ</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppEndUser'
}
</script>

<style>

</style>