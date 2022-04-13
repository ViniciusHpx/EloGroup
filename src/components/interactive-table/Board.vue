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
    // Método para realizar o update das posições dos Cards no LocalStorage 
    updatePosition(_id, newPos){

      console.log("Updating position: " + _id + " (" + newPos + ")");
      Storage.updateLeadPosition(_id, newPos);
      // Invoca o método 'update' utilizado na declaração deste componente, para garantir que a tabela está 
      // exibindo as mesmas informações que constam no localStorage
      this.$emit('update');
    },
    drop(e){
      // Obtendo o id (Html) do card que está sendo arrasto para o board em questão
      // através de uma transferência de dados usando getData
      const card_id = e.dataTransfer.getData('card_id');
      // Obtendo o id (Html) do útlimo board onde o card estavá
      // através de uma transferência de dados usando getData
      const last_board_id = e.dataTransfer.getData('board_id');
      // Aqui pegamos o elemento do card
      let card = document.getElementById(card_id);
      
      if(e.target){
        
        // Todo id de card é escrito no seguinte formato: {{linha}}-c-{{coluna}}
        let card_id_arr = card_id.split("-");
        // Todo id de board é escrito no seguinte formato {{linha}}-b-{{coluna}}
        let board_id_arr = e.target.id.split("-");
        let last_board_id_arr = last_board_id.split("-");
        // Váriavel para definir o novo board que o card estará 
        // Forçando que o board de destino esteja na mesma linha do card 
        let board = document.getElementById(card_id_arr[0] + '-b-'+ board_id_arr[2]);

        // Verifica se o borde antigo está em uma coluna superior ao board atual do card
        if(last_board_id_arr[2] >= board_id_arr[2]){
          // Faz o card voltar para a posição que ele estavá
          board = document.getElementById(card_id_arr[0] + '-b-'+ last_board_id_arr[2]);
          // Invoca o método 'erroMessage' utilizado na declaração deste componente, para 
          // Exibir uma mensagem de erro para o usuário 
          this.$emit('errorMessage');
        
        } else {
          // Atualiza o id (Html) com a nova posição do card
          card.id = card_id_arr[0] + '-c-'+ board_id_arr[2];
          let _id = e.dataTransfer.getData('_id');
          // Atualiza a posição do card no localStorage 
          this.updatePosition(_id, board_id_arr[2]);
        }

        // Adiciona o card em seu novo board 
        board.appendChild(card);
        
      } 
    }
  },
}
</script>


<style scoped>

</style>
