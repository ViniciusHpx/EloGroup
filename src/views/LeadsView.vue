<template>
  <div class="leads">
    
    <section class="container">
      <div>
        <img src="@/assets/img/logo.jpg" alt="">
      </div>
      <button class="add-lead" @click="showLeadModal()" >Novo Lead(+)</button>
      <div>
        <h1>Painel de Leads</h1>
          <Table
            :headers="headers" 
            :data="leads"
            @update="updateTable"
            @errorMessage="errorMessage"
          ></Table>
      </div>

      <MessageComponent
        v-show="errorVisible"
        @close="errorVisible = false"
        title="Erro"
        message="Não é possível mover um card para uma opção anterior."
        color="red"
      >
      </MessageComponent>

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
    leadModalVisible: false,
    errorVisible: false,
    leads: Storage.getLeads(),
    headers: ['Cliente em Potencial','Dados Confirmados','Reunião Agendada']
  }),
  methods: {
    showLeadModal(){
      this.leadModalVisible=true;
    },
    updateTable() {
      this.leads = Storage.getLeads();
    },
    cardError() {
      this.invokeModal("red","Erro","Não é possível mover um card para uma coluna anterior.");
    },
    errorMessage() {
      this.errorVisible = true;
      console.log("vc não pode");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '@/assets/styles/leads-styles.css';
</style>

