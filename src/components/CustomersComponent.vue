<template>
  <div class="customers-component">
    <section class="container">
        <div>
          <img src="../assets/img/logo.jpg" alt="">
        </div>
        <button class="add-lead" @click="showModal()" >Novo Lead(+)</button>
        <div>
          <h1>Painel de Leads</h1>
          <table class="table-dados">
            <thead >
              <tr >
                <th >Cliente em Potencial</th>
                <th>Dados Confirmados</th>
                <th>Reunião Agendada</th>
                
              </tr>
            </thead>
            <tbody class="linhas">

              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.pos1 }}</td>
                <td>{{ customer.pos2 }}</td>
                <td>{{ customer.pos3 }}</td>
              </tr>
            </tbody>
            
          </table>
        </div>

        <NewLeadComponent
          v-show="modal.isVisible"
          @close="closeModal"
          @update="updateTable"
        >
        </NewLeadComponent>

    </section>
  </div>
</template>

<script>
import NewLeadComponent from '@/components/NewLeadComponent.vue'

export default {
  components: {
    NewLeadComponent
  },
  data: () => ({
    name: 'CustomersComponent',
    props: {
        msg: String
    },
    modal: {
      isVisible: false
    },
    customers: []
  }),
  methods: {
    closeModal() {
      this.modal.isVisible = false;
      console.log(this.modal.isVisible);
    },
    updateTable() {
        //MÉTODO PARA ATUALIZAR OS NOVOS REGISTROS DO LOCALSTORAGE PARA A TABELA
    },
    showModal(){
      this.modal.isVisible=true;
    }

  },
  created(){
    // LER LOACLSTORAGE E ATUALIZAR A VARIÁVEL CUSTOMERS ( this.updateTable())
    this.customers = [
      {
        id: '0',
        pos1: 'caio',
        pos2: '',
        pos3: ''
      },
      {
        id: '1',
        pos1: '',
        pos2: 'jonas',
        pos3: ''
      },
      {
        id: '2',
        pos1: '',
        pos2: '',
        pos3: 'primo jorge'
      }
    ]
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/styles/customers-styles.css';
</style>
