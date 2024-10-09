<template>
  <Header />
  <div class="maincontent">
    <div class="sitecont">
      <h1>Administrador</h1>
      <h2>
        O que deseja fazer?
      </h2>
      <nav>
        <ul class="nav">
          <li @click="ativarSessao('listarObras')" :class="{ 'on': sessaoAtiva === 'listarObras' }">
            Listar e editar obras
          </li>
          <li @click="ativarSessao('cadastrarObra')" :class="{ 'on': sessaoAtiva === 'cadastrarObra' }">
            Cadastrar nova obra
          </li>
          <li @click="ativarSessao('listarDepoimentos')" :class="{ 'on': sessaoAtiva === 'listarDepoimentos' }">
            Listar depoimentos
          </li>
          <li @click="ativarSessao('cadastrarDepoimento')" :class="{ 'on': sessaoAtiva === 'cadastrarDepoimento' }">
            Cadastrar novo depoimento
          </li>
        </ul>
      </nav>
      <section class="listarObras" v-if="sessaoAtiva === 'listarObras'">
        <ListarObras />
      </section>
      <section class="cadastrarObra" v-if="sessaoAtiva === 'cadastrarObra'">
        <CadastrarObra />
      </section>
      <section class="listarDepoimentos" v-if="sessaoAtiva === 'listarDepoimentos'">
        <ListarDepoimentos />
      </section>
      <section class="cadastrarDepoimento" v-if="sessaoAtiva === 'cadastrarDepoimento'">
        <CadastrarDepoimento />
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const nuxtApp = useNuxtApp()
    const validarUsuario = nuxtApp.apiValidarUsuario
    let obraAtiva = ref(0)
    let sessaoAtiva = ref()


    definePageMeta({
      layout: false
    })

    useHead({
      title: "Dashboard Jessica Saka"
    })

    const ativarSessao = (sessao) => {
      if (sessaoAtiva.value === sessao) {
        sessaoAtiva.value = ''
      } else {
        sessaoAtiva.value = sessao
      }
    }

    const validarUsuarioApi = async () => {
      try {
        const params = {
          email: localStorage.getItem('email')
        }
        const usuarioLogado = await validarUsuario(params)
        console.log('usuarioLogado', usuarioLogado);
        if (!usuarioLogado) {
          router.push('/admin')
        }

      } catch (err) {
        router.push('/admin')
        console.log('(err)', err);
      }
    }

    const init = () => {
      validarUsuarioApi()
    }

    onMounted(() => {
      init()
    })

    return {
      ativarSessao,
      validarUsuarioApi,
      sessaoAtiva,
      obraAtiva
    }
  }
})
</script>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
}

.sitecont {
  padding: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.formAdm {

  .formP {
    margin-bottom: 10px;
  }

  label {
    display: block;
  }

  input {
    width: 80%;
    min-height: 25px;
    padding: 5px;
  }
}

nav {

  .nav {

    li {
      margin-bottom: 10px;

      &::before {
        font-family: 'Icomoon';
        content: '\e909';
      }

      &.on {
        &::before {
          font-family: 'Icomoon';
          content: '\e908';
        }
      }
    }
  }
}

.listaFotos {
  display: table;

  li {
    display: table-cell;
    padding: 10px;

  }
  input {
    width: 250px;
  }
}

.log {
  padding: 3px;
  color: #FFF;
  font-style: italic;

  &.sucesso {
    background-color: green;
  }
}
</style>
