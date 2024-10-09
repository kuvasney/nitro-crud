<template>
  <header class="pagetop">
    <div class="pagetop__page-logo">
      <div class="logo">
        <nuxt-link to="/">
          <img src="../assets/logo.svg" alt="logo" class="signo">
        </nuxt-link>
        <p>
          <span>
            NITROCRUD
          </span>
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li v-if="isLoggedIn">
          <a @click="logout()">
            Sair
          </a>
        </li>
      </ul>
    </nav>
    <section class="pagetop__page-info">
    </section>
  </header>
</template>
<script>
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'PageHeader',
    setup() {
      const router = useRouter()
      const isLoggedIn = ref()

      const verificarLogin = () => {
        if (localStorage.getItem('email')) {
          isLoggedIn.value = true
        } else {
          isLoggedIn.value = false
        }
      }

      const logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('apiToken')

        router.push('/admin')
      }

      const init = () => {
        verificarLogin()
      }

      onMounted(() => {
        init()
      })

      return {
        isLoggedIn,
        logout
      }
    }
  })
</script>
