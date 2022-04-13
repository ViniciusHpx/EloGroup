<template>
  <div class="leads">
    
    <section class="container-leads">
      <div>
        <img src="@/assets/img/logo.jpg" alt="">
      </div>
      <button class="add-lead" @click="showLeadModal()" >Novo Lead(+)</button>
        <h1>Painel de Leads</h1>
        <!--Componente para exibir dinâmicamente a tabela de leads-->
        <Table
          :headers="headers" 
          :data="leads"
          @update="updateTable"
          @errorMessage="errorMessage"
        ></Table>
      <!--Componente para exibir dinâmicamente uma mensagem personalizada-->
      <MessageComponent
        v-show="errorVisible"
        @close="errorVisible = false"
        title="Erro"
        message="Não é possível mover um card para uma opção anterior."
        color="red"
      >
      </MessageComponent>
      <!--Componente para exibir a tela de cadastro de uma empresa-->
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
    // Váriaveis utilizadas dentro dos metodos e da página atual
    leadModalVisible: false,
    errorVisible: false,
    leads: Storage.getLeads(),
    headers: ['Cliente em Potencial','Dados Confirmados','Reunião Agendada']
  }),
  methods: {
    showLeadModal() {
      // Exibir painel de cadastro de Leads
      this.leadModalVisible=true;
    },
    updateTable() {
      // Fazendo update da tabela do leads
      this.leads = Storage.getLeads();
    },
    cardError() {
      // Mostra um modal de erro 
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

