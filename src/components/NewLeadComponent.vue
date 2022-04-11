<template>
  <transition name="new-lead-component">
    <div class="hello">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
    <section class="container">
      <div>
        <img src="../assets/img/logo.jpg" alt="">
      </div>
      <section class ="container-tree">
        <div>
          <form class ="inputs">
            <label for ="nome">Nome *</label>
            <input v-model = "lead.name" type="text" id ="nome" placeholder="Nome Empresa">

            <label for ="telefone">Telefone *</label>
            <input v-model="lead.telephone" type="text" id ="telefone" placeholder="Telefone">

            <label for ="telefone">Email *</label>
            <input v-model="lead.email" type="email" id ="email" placeholder="exemplo@">

          </form>
        </div>
        <div class="container-two">
          <h1 class="description">Nova Lead</h1>
          <p>Oportunidades *</p>
          <table class="table-company">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" id ="exem" name="exem" >
                </th>
              </tr>
            </thead>
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
          <button class="save" @click="userLead()">Salvar</button>
        </div>
      </section>
    </section>
  </div>
  </div>
  </div>

  </transition>
</template>

<script>
  export default {
    data: () => ({
        props: {
          msg: String
        },
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

        }
        
    }),
    methods: {
      addUser(){
        let leads = localStorage.getItem('leads');
        if(!leads)
          leads=[];
        else
          leads=JSON.parse(leads);
        
        leads.push({
          name:this.lead.name,
          email:this.lead.email,
          telephone:this.lead.telephone,
          checkbox:this.lead.checkbox
        })
        localStorage.setItem('leads',JSON.stringify(leads));
        this.close();

      },
      invokeModal(color,title,message){
        this.modal.color=color;
        this.modal.title=title;
        this.modal.message=message;
        this.modal.isVisible = true;
      },
      close() {
        // Invoca o método 'close' utilizado na declaração deste componente
        this.$emit('close');
      },
      createLead() {
        // ATUALIZA NO LOCALSTORAGE NOSSO JSON DE OBJETOS

        // CHAMA O MÉTODO UPDATE DO PAI PARA ATUALIZAR A TABELA DE DADOS
        this.$emit('update');
      },
      userLead(){
        let erros=[];
        if(!this.lead.name){
          erros.push("Não foi digitado um nome.");
        }
        if(this.lead.telephone<13){
          erros.push("Numero de telefone inválido.");
        }
        if(!this.lead.email){
          erros.push("Não foi digitado email.");
        }if(erros.length>0){
          this.invokeModal("red","Erro",erros.join('<br>'));
        }
        else{
          this.addUser();

        }
      }
    },
  };

</script>

<style>
  @import '../assets/styles/register-emp.css';
</style>