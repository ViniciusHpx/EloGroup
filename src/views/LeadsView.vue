<template>
  <div class="leads">
    
    <section class="container-leads">
      <div>
        <img src="@/assets/img/logo.jpg" alt="">
      </div>
      <button class="add-lead" @click="showLeadModal()" >Novo Lead(+)</button>

        <h1>Painel de Leads</h1>
        <!--Componetes que estão sendo usados na tela-->
        <Table
          :headers="headers" 
          :data="leads"
          @update="updateTable"
          @errorMessage="errorMessage"
        ></Table>
      <!--Componetes que estão sendo usados caso haja erro ao arrastar as empresas para um lugar que não é permitido-->
      <MessageComponent
        v-show="errorVisible"
        @close="errorVisible = false"
        title="Erro"
        message="Não é possível mover um card para uma opção anterior."
        color="red"
      >
      </MessageComponent>
      <!--Componetes que estão sendo usados no momento de adicionar outra lead-->
      <NewLeadComponent
        v-show="leadModalVisible"
        @close="leadModalVisible = false"
        @update="updateTable"
      >
      </NewLeadComponent>
    </section>
  </div>
</template>


<script>
import MessageComponent from '@/components/modals/MessageComponent.vue'
import NewLeadComponent from '@/components/modals/NewLeadComponent.vue'
import Table from '@/components/interactive-table/Table.vue';
const Storage = require('@/assets/js/storage.js');

export default {
  components: {
    NewLeadComponent,
    MessageComponent,
    Table
  },
  data: () => ({
    name: 'LeadsComponent',
    props: {
        msg: String
    },
    // variaveis utilizadas dentro dos metodos e da página atual
    leadModalVisible: false,
    errorVisible: false,
    leads: Storage.getLeads(),
    headers: ['Cliente em Potencial','Dados Confirmados','Reunião Agendada']
  }),
  methods: {
    showLeadModal(){
      //Mostra painel de Leads
      this.leadModalVisible=true;
    },
    updateTable() {
      //fazendo update na tabela do leads
      this.leads = Storage.getLeads();
    },
    cardError() {
      // Mostra um modal 
      this.invokeModal("red","Erro","Não é possível mover um card para uma coluna anterior.");
    },
    errorMessage() {
      this.errorVisible = true;
      
    }
  }
};
</script>


<style scoped>
  @import '@/assets/styles/style.css';
  @import '@/assets/styles/leads-styles.css';
</style>

