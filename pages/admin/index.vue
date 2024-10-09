<template>
  <div>
    <Header />
    <div class="maincontent">
      <div class="login">
        <h1>Administrar</h1>
        <form @submit.prevent="login" class="formDefault">
          <div class="formP">
            <label for="email">E-mail</label>
            <input type="email" required v-model="usuario.email" placeholder="Digite seu e-mail">
          </div>
          <div class="formP">
            <label for="password">Senha</label>
            <input type="password" required v-model="usuario.password" placeholder="Digite sua senha">
          </div>
          <div class="formP">
            <button type="submit" :disabled="isLoading">
              <span v-if="isLoading">Carregando...</span>
              <span v-else>Acessar</span>
            </button>
          </div>
          <p v-if="errorLog" class="error">{{ errorLog }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const nuxtApp = useNuxtApp()
    const userLogin = nuxtApp.apiLogin
    const errorLog = ref('')
    const isLoading = ref(false)

    const usuario = ref({
      email: '',
      password: ''
    })

    useHead({
      title: "Admin Login"
    })

    definePageMeta({
      layout: false
    })

    const login = async () => {
      isLoading.value = true
      errorLog.value = '' // Limpa a mensagem de erro anterior
      try {
        const loginResponse = await userLogin(usuario.value) // Chama a API
        if (!loginResponse || loginResponse.error) {
          // Verifica se houve erro
          throw new Error(loginResponse?.message || 'Usuário não existe')
        }
        // Se o login for bem-sucedido, redirecionar para outra página
        console.log('usuario.value.email', usuario.value.email);
        localStorage.setItem('apiToken', loginResponse.token)
        localStorage.setItem('email', usuario.value.email)
        router.push('/admin/dashboard')
      } catch (error) {
        // Tenta pegar a mensagem de erro da resposta da API
        if (error.response && error.response.data && error.response.data.message) {
          errorLog.value = error.response.message // Mensagem da API
        } else {
          errorLog.value = error.message // Caso contrário, uma mensagem genérica
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      login,
      usuario,
      errorLog,
      isLoading
    }
  }
})
</script>

<style scoped>
.login {
  width: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.formDefault {
  label {
    display: block;
    text-align: center;
  }

  input {
    display: block;
    width: 100%;
    height: 30px;
    padding: 5px;
  }
}

.formP {
  margin-bottom: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
