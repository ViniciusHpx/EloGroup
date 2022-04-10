<template>
  <div class="customers">
    <CustomersComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomersComponent from '@/components/CustomersComponent.vue'

export default {
  name: 'CustomersView',
  components: {
    CustomersComponent
  }
}
</script>
