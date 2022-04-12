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
// salvando os metodos que estão dentro da classe Storage dentro do arquivo js
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
      // obtendo o id atraves de uma transferência de dados usando getData
      const card_id = e.dataTransfer.getData('card_id');
      const last_board_id = e.dataTransfer.getData('board_id');
      //aqui pegamos o elemento do cartão
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
          //Mudou de posição definitivamente
          card.id = card_id_arr[0] + '-c-'+ board_id_arr[2];
          let _id = e.dataTransfer.getData('_id');
          this.updatePosition(_id, board_id_arr[2]);
        }

        board.appendChild(card);
        // CHAMAR FUNÇÃO QUE ATUALIZA A SITUAÇÃO DO ATUAL
      } 
    }
  },
}
</script>


<style scoped>

</style>
