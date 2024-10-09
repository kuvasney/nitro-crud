<template>
  <div class="messenger" v-show="messages.length > 0" id="cpnt_messenger">
    <p v-for="(message, index) in messages" :key="index"
      :class="{ 'error': message.type === 0, 'success': message.type === 1 }">
      <i class="icon icon-alert-octagon" v-show="message.type === 0" />
      <i class="icon icon-checkmark" v-show="message.type === 1" />
      {{ message.message }}
    </p>
  </div>
</template>
<script>

import { defineComponent } from 'vue'
import { useLayoutStore } from '~/store/layout'

export default defineComponent({
  setup() {
    const layoutStore = useLayoutStore()
    const messages = layoutStore.getMessages

    onMounted(() => {

    })

    onUpdated(() => {
      if (messages.length > 0) {
        const messenger = document.getElementById('cpnt_messenger')
        messenger.scrollIntoView({ block: 'end', behavior: 'smooth' })
      }
    })

    return {
      layoutStore,
      messages
    }
  },
})
</script>

<style lang="scss" scoped>
.messenger {
  margin: 1em 0;
  font-size: 10px;

  .error {
    color: red
  }

  .success {
    color: green
  }
}

.apphome__page .messenger {
  margin-top: 20px;

  p {
    color: #FFF;
    padding: 10px;
    border-radius: 8px;

    &.success {
      background-color: green
    }

    &.error {
      background-color: red;
    }
  }
}
</style>
