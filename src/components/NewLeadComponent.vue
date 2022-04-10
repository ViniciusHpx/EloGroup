<template>
  <transition name="new-lead-component">
    
  </transition>
</template>

<script>
  export default {
    name: 'MessageComponent',
    props: {},
    methods: {
      close() {
        // Invoca o método 'close' utilizado na declaração deste componente
        this.$emit('close');
      },
      createLead() {
        // ATUALIZA NO LOCALSTORAGE NOSSO JSON DE OBJETOS

        // CHAMA O MÉTODO UPDATE DO PAI PARA ATUALIZAR A TABELA DE DADOS
        this.$emit('update');
      }
    },
  };
</script>

<style>

</style>