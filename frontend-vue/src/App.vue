<template>
  <div>
    <Login v-if="$route.name=='login'"/>
    <Signup v-else-if="$route.name=='signup'"/>
    <AppStaff v-else-if="$route.path.startsWith('/staff')"/>
    <AppEndUser v-else/>
  </div>
</template>

<script>
import AppStaff from './AppStaff';
import AppEndUser from './AppEndUser';
import Login from '@/views/staff/Login';
import Signup from '@/views/staff/Signup';

export default {
  name: 'App',
  components: {
    Login,
    Signup,
    AppStaff,
    AppEndUser
  }
}
</script>