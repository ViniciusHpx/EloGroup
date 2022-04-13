<template>
  <div class='interactive-table'>

    <main class="flexbox">
      <table class="tabela">
        
        <thead class="cabeçalho">
          <tr >
            <th v-for="(header, index) in headers" :key="index">{{header}}</th>
          </tr>
        </thead>

        <tbody class="linhas">
          <tr v-for="(item, row) in data" :key="row">
            <td v-for="(header, column) in headers" :key="column">
              <Board 
                v-bind:html_id="row + '-b-' + column" 
                @update="updateTable"
                @errorMessage="errorMessage"
              >
                <Card
                  v-if="item.pos == column"
                  v-bind:html_id="row + '-c-' + column"
                  :draggable="true"
                  :_id="item._id"
                  :name="item.name">
                </Card>
              </Board>
            </td>
          </tr>
        </tbody> 
      </table>
    </main>
  </div>
</template>


<script>
import Board from '@/components/interactive-table/Board.vue';
import Card from '@/components/interactive-table/Card.vue';

export default {
  components: {
    Board,
    Card
  },
  name: 'interactive-table',
  props: {
    data: {
      type: Array
    },
    headers: {
      type: Array
    }
  },
  errorVisible: false,
  methods: {
    updateTable(){
      this.$emit('update');
    },
    errorMessage(){
      this.$emit('errorMessage')
    },
  }
}
</script>

<style scoped>
  @import '@/assets/styles/table-style.css';

</style>
