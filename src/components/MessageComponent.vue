<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            <b v-bind:style="'color:'+color+';'">{{title}}</b>
          </slot>
          
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body" >
            <div v-html="message"></div>
          </slot>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Fechar
          </button>

        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'MessageComponent',
    props: {
      title: {
        type: String,
        default: "Título"
      },
      message: {
        type: String,
        default: "message"
      },
      color: {
        type: String,
        default: "green"
      },
    },
    methods: {
      close() {
        // Invoca o método 'close' utilizado na declaração deste componente
        this.$emit('close');
      },
    },
  };
</script>

<style>

  #link{
      color: black;
      text-decoration: none;
  }
  a{
      color: black;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>