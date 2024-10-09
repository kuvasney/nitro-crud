<template>
  <div id="app">
    <Header />
  </div>
  <div class="maincontent">

    <slot />

    <footer class="main-footer" id="contato">
      <div class="side contact-info">
        <h4>
          está esperando o que?<br>
          <b>chame a gente</b> pra bater um papo!
        </h4>
        <section>
          <ul class="social">
            <li class="social-facebook">
              <a href="http://www.facebook.com/" target="_blank">
                <i class="icon-facebook" />
                <span class="hide">facebook</span>
              </a>
            </li>
            <li class="social-instagram">
              <a href="https://www.instagram.com//" target="_blank">
                <i class="icon-instagram" />
                <span class="hide">instagram</span>
              </a>
            </li>
            <li class="social-pinterest">
              <a href="https://www.pinterest.pt/" target="_blank">
                <i class="icon-pinterest" />
                <span class="hide">pinterest</span>
              </a>
            </li>
            <li class="social-whatsapp">
              <a href="https://api.whatsapp.com/send?phone=5511999999999" target="_blank">
                <i class="icon-whatsapp" />
                <span class="hide">+551199999999</span>
              </a>
            </li>
          </ul>
        </section>
        <p>
          &copy; {{ thisYear }} - Rafael Kuvasney Marcolin
        </p>
      </div>
      <div class="side contact-form">
        <h4>ENTRE EM CONTATO</h4>
        <form @submit.prevent="sendMail()" class="contact-form">
          <div class="fakefieldset">
            <div class="formside">
              <div class="formP">
                <label for="name">Nome</label>
                <input type="text" id="name" placeholder="Nome" v-model="contact.name" required>
              </div>
              <div class="formP">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Email" v-model="contact.email" required>
              </div>
              <div class="formP">
                <label for="phone">Telefone</label>
                <input type="phone" id="phone" placeholder="Telefone" v-model="contact.phone" required>
              </div>
            </div>
            <div class="formside">
              <textarea name="message" id="message" v-model="contact.message" cols="10" rows="10"></textarea>
            </div>
          </div>
          <div class="fakefieldset">
            <div class="formside">
              <span class="loader" v-if="formSent === 'loading'"><i class="icon-loading" /> Enviando...</span>
              <p class="error" v-show="formSent === 'error'"><i class="icon-alert-octagon" /> Um erro ocorreu e sua
                mensagem não foi enviada.</p>
              <p class="ok" v-show="formSent === 'ok'"><i class=" icon-tick" /> Mensagem enviada com sucesso!</p>
            </div>
            <div class="formside">
              <button type="submit" :disabled="formSent === 'loading'">
                ENVIAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import { useLayoutStore } from '~/store/layout'
// import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'JSMainTemplate',
  setup() {
    const route = useRoute()
    const thisYear = ref(new Date().getFullYear())
    let mobomenu = ref(false)

    let contact = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    let isLoggedIn = ref(false)
    let formSent = ref(false)

    const sendMail = () => {
      console.log('senmail',);
    }

    const logout = () => {
      console.log('logout',);
    }

    const init = () => {
    }

    useHead({
    })

    onMounted(() => {
      init()
    })

    return {
      thisYear,
      mobomenu,
      isLoggedIn,
      contact,
      formSent
    }
  }
})
</script>
