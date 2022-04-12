<template>
  <div class="register">
    <section class="container-register">
      <div class="intro-img">
        <img src="@/assets/img/logo.jpg" alt="">
      </div>
      <form class ="form-user" action="#" onsubmit="return false">
        <label for="input-teste-1">Usuário *</label>
        <input v-model="login.user" type="text" id="input-teste-1">
        <label for="input-teste-2">Password *</label>
        <input v-model="login.pass" @input="checkPassword" autocomplete="off" type="password" id="input-teste-2" placeholder="********">

        <label for="input-teste-3">Password *</label>
        <input v-model="login.pass2" autocomplete="off" type="password" id="input-teste-3" placeholder="********">
      
        <ul>
          <li v-bind:class="{is_valid:validation.has_eight_characters }">8 Caracteres</li>
          <li v-bind:class="{is_valid:validation.has_number }">Contém números</li>
          <li v-bind:class="{is_valid:validation.has_uppercase }">Contém maiúsculas</li>
          <li v-bind:class="{is_valid:validation.has_special_character }">Contém caracteres especiais</li>
        </ul>

        <button @click="registrar()">Registrar</button>

        <!--<MessageComponent msg="Welcome to Customers!"/>-->

      </form> 
    </section>
  </div>
  
    <MessageComponent
      v-show="modal.isVisible"
      @close="closeModal"
      :title="modal.title"
      :message="modal.message"
      :color="modal.color"
    >
  </MessageComponent>
</template>

<script>
import MessageComponent from '@/components/modals/MessageComponent.vue'
const Storage = require('@/assets/js/storage.js');

export default {
  components: {
    MessageComponent
  },
  data: () => ({
    props: {
        msg: String
    },
    login: {
        user: '',
        pass: '',
        pass2: ''
    },
    validation: {
      valid_password: false,
      has_number: false,
      has_uppercase: false,
      has_special_character: false,
      has_eight_characters: false
    },
    modal: {
      isVisible: false,
      title: "",
      message: "",
      color: "red"
    }
  }),
  methods: {
    closeModal() {
      this.modal.isVisible = false;
    },
    invokeModal(color,title,message) {
      this.modal.color=color;
      this.modal.title=title;
      this.modal.message=message;
      this.modal.isVisible = true;
    },
    resetForm(){
      this.login = {
          user: '',
          pass: '',
          pass2: ''
      }
      this.validation = {
        valid_password: false,
        has_number: false,
        has_uppercase: false,
        has_special_character: false,
        has_eight_characters: false
      }
    },
    registrar(){
        let erros = []

        if(this.login.pass != this.login.pass2)
          erros.push("As senhas devem coincidir.")

        if(!this.validation.valid_password)
          erros.push("A senha digitada é inválida.")

        if(!this.login.user)
          erros.push("Nenhum nome de usuário foi informado.")

        if(erros.length > 0){
          this.invokeModal("red","Erro",erros.join('<br>'));
        } else {
          Storage.addUser({
            user: this.login.user,
            pass: this.login.pass
          })
          this.invokeModal("green","Sucesso","Usuário criado com sucesso!");
          this.resetForm();
        }
    },
    checkPassword() {

      const special_chars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

      this.validation.has_number = /\d/.test(this.login.pass);
      this.validation.has_uppercase = /[A-Z]/.test(this.login.pass);
			this.validation.has_special_character = special_chars.test(this.login.pass);

      this.validation.has_eight_characters = this.login.pass.length > 8? true : false;
      
      if (this.validation.has_eight_characters === true &&
					this.validation.has_special_character === true &&
					this.validation.has_uppercase === true &&
					this.validation.has_number === true) {
						this.validation.valid_password = true;			
      } else {
        this.validation.valid_password = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  @import '@/assets/styles/register-styles.css';
  
</style>