<template>
  <!-- Draggable permite o Card ser arrastavél-->
  <!-- Dragstart é um método que será chamado no momento que o card começar a ser arrastado-->
  <!-- Dragend é um método que será chamado tiver acabado a ação de arraste no card-->
  <div
    :id="html_id"
    class="card-component"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.stop
    style="padding: 10px 15px; text-align: center; font-weight: bold;}"
  >{{name}}
  </div>
</template>

<script>
export default {
  name: 'card-component',
  props: {
    html_id: {
      type: String
    },
    name: {
      type: String
    },
    draggable: {
      type: Boolean
    },
    _id: {
      type: Number
    }
  },
  methods: {
    dragStart(e){
      // Capturando o Html do elemento que está sendo arrastodo
      const target = e.target;
      // Adiciona informações do card que está sendo arrastado para a váriavel 'e'
      e.dataTransfer.setData('_id', this.$props._id);
      e.dataTransfer.setData('card_id', target.id);
      e.dataTransfer.setData('board_id', target.parentNode.id);
      // Fazendo card fica transparente
      setTimeout(() => {
        target.style.display = 'none';
      }, 0);
    },
    // Fazendo o card ficar visível
    dragEnd(e){
      e.target.style.display = 'block';
    }
  }
}
</script>

<style scoped>

</style>
