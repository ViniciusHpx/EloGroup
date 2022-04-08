<template>
  <div class="hello">
    <section class="conteiner">
      <div class="intro-img">
      <img src="../assets/img/logo.svg.jpg" alt="">
      </div>
      <form action="">
      <label for="input-teste-1">Usuário *</label>
      <input v-model="login.user" type="text" id="input-teste-1">
      <label for="input-teste-2">Password *</label>
      <input type="password" id="input-teste-2" placeholder="********">

      <label for="input-teste-3">Password *</label>
      <input type="password" id="input-teste-3" placeholder="********">

      <button @click="enviar()">Registrar</button>


      </form>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    props: {
        msg: String
    },
    login: {
        user: '',
        pass1: '',
        pass2: ''
    }
  }),
  methods: {
    enviar(){
        window.alert(this.login.user);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/styles/style.css';
</style>
