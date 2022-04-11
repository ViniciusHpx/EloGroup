<template>
  <transition name="new-lead-component">
    <div class="modal-backdrop">
      <div class="modal modal-container"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
      <div>
        <img src="@/assets/img/logo.jpg" alt="">
      </div>
      <section class ="modal-container-tree">
        <div>
          <form class ="inputs" action="#" onsubmit="return false">
            <label for ="nome">Nome *</label>
            <input v-model = "lead.name" type="text" id ="nome" placeholder="Nome Empresa">

            <label for ="telefone">Telefone *</label>
            <input v-model="lead.telephone" type="text" id ="telefone" placeholder="Telefone">

            <label for ="telefone">Email *</label>
            <input v-model="lead.email" type="email" id ="email" placeholder="exemplo@">

          </form>
        </div>
        <div class="modal-container-two">
          <h1 class="description">Nova Lead</h1>
          <p>Oportunidades *</p>
          <table class="table-company">
            <tbody>
              <tr>
                <td>
                  <input v-model="lead.checkbox.rpa" type="checkbox" id ="RPA" name="RPA" >
                </td>
                <td>RPA</td>
              </tr>
            </tbody> 
            <tbody>
              <tr>
                <td>
                  <input v-model="lead.checkbox.analytics" type="checkbox" id ="Analytics" name="Analytics" >
                </td>
                <td>Analytics</td>
              </tr>
            </tbody>
              <tbody>
                <tr>
                  <td>
                    <input v-model="lead.checkbox.produtoDigital" type="checkbox" id ="ProdutoDigital" name="ProdutoDigital" >
                  </td>
                  <td>Produto Digital</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>
                    <input v-model="lead.checkbox.bpm" type="checkbox" id ="BPM" name="BPM" >
                  </td>
                  <td>BPM</td>
                </tr>
              </tbody>
          </table>
          <button class="save" @click="closeForm()">Fechar</button><br>
          <button class="save" @click="checkErros()">Salvar</button>
          <MessageComponent
            v-show="modal.isVisible"
            @close="closeModal"
            :title="modal.title"
            :message="modal.message"
            :color="modal.color"
          >
          </MessageComponent>
        </div>
      </section>
  </div>
  </div>
  </transition>
</template>

<script>
import MessageComponent from '@/components/modals/MessageComponent.vue'
const Storage = require('@/assets/js/storage.js');

export default {
  components: {
    MessageComponent
  },
  data: () => ({
    lead: {
      name: '',
      telephone: '',
      email: '',
      checkbox:{
        rpa:false,
        analytics:false,
        produtoDigital:false,
        bpm:false,
      }
    },
    modal:{
      color:"",
      title:"",
      message:"",
      isVisible: false
    }
  }),
  methods: {
    invokeModal(color,title,message){
      this.modal.color=color;
      this.modal.title=title;
      this.modal.message=message;
      this.modal.isVisible = true;
    },
    closeModal() {
      this.modal.isVisible = false;
    },
    closeForm() {
      // Invoca o método 'close' utilizado na declaração deste componente
      this.$emit('close');
    },
    addLead(){
      Storage.addLead(this.lead);
      this.invokeModal("green","Sucesso",'Lead "' + this.lead.name + '" criado com sucesso!');
      this.$emit('update');
      //this.closeForm();
    },
    checkErros(){
      let erros = [];

      if(!this.lead.name)
        erros.push("Nenhum nome foi informado.");

      if(this.lead.telephone<13)
        erros.push("Número de telefone inválido.");
      
      if(!this.lead.email)
        erros.push("Nenhum e-mail foi informado.");
      
      if(erros.length>0){
        this.invokeModal("red","Erro",erros.join('<br>'));
      }
      else{
        this.addLead();
      }
    }
  },
};
</script>

<style scoped>
  @import '@/assets/styles/register-emp.css';
</style>