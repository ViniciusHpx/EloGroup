<template>
  <div
    :id="html_id"
    class="card-component"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.stop
  > {{name}}
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

      const target = e.target;

      e.dataTransfer.setData('_id', this.$props._id);
      e.dataTransfer.setData('card_id', target.id);
      e.dataTransfer.setData('board_id', target.parentNode.id);

      setTimeout(() => {
        target.style.display = 'none';
      }, 0);
    },
    dragEnd(e){
      e.target.style.display = 'block';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
