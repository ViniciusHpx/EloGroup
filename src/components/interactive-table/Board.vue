<template>
  <div
    :id="html_id"
    class="board-component"
    @dragover.prevent
    @drop.prevent="drop"
    style="height:90px; width: 220px;"
  >
    <slot/>
  </div>
</template>

<script>
const Storage = require('@/assets/js/storage.js');

export default {
  name: 'board-component',
  props: {
    html_id: {
      type: String
    }
  },
  methods: {
    updatePosition(_id, newPos){
      
      console.log("Updating position: " + _id + " (" + newPos + ")");
      Storage.updateLeadPosition(_id, newPos);

      //atualizar Storage
      this.$emit('update');
    },
    drop(e){

      const card_id = e.dataTransfer.getData('card_id');
      const last_board_id = e.dataTransfer.getData('board_id');

      let card = document.getElementById(card_id);
      
      if(e.target){
        
        // row-c-column
        let card_id_arr = card_id.split("-");
        let board_id_arr = e.target.id.split("-");
        let last_board_id_arr = last_board_id.split("-");

        let board = document.getElementById(card_id_arr[0] + '-b-'+ board_id_arr[2]);

        if(last_board_id_arr[2] >= board_id_arr[2]){
          board = document.getElementById(card_id_arr[0] + '-b-'+ last_board_id_arr[2]);
          this.$emit('errorMessage');
          //EXIBIR MENSAGEM DE ERRO FALANDO QUE NÃO PODE VOLTAR
        } else {
          // O cara mudou de posição definitivamente
          card.id = card_id_arr[0] + '-c-'+ board_id_arr[2];
          let _id = e.dataTransfer.getData('_id');
          this.updatePosition(_id, board_id_arr[2]);
        }

        board.appendChild(card);
        // CHAMAR FUNÇÃO QUE ATUALIZA A SITUAÇÃO DO CARA ATUAL
      } 
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
