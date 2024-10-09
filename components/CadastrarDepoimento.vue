<template>
  <div class="cadastroObras">
    <h2>
      Cadastrar novo Depoimento
    </h2>
    <form @submit.prevent="cadastrarDepoimento()" class="formAdm">
      <div class="formP">
        <label for="depoimentoNome">
          Autor
        </label>
        <input type="text" id="depoimentoNome" placeholder="O nome de quem fez o depoimento" v-model="depoimento.nome"
          required>
      </div>

      <div class="formP">
        <label for="depoimentoReferencia">
          Referência
        </label>
        <input type="text" id="depoimentoReferencia" placeholder="Foi ligado a alguma obra?" v-model="depoimento.referencia">
      </div>

      <div class="formP">
        <label for="depoimentoDescricao">
          Depoimento
        </label>
        <textarea name="depoimentoDescricao" id="depoimentoDescricao" v-model="depoimento.depoimento" cols="85" rows="6"
          required></textarea>
      </div>

      <div class="formP">
        <button type="submit">Cadastrar depoimento</button>
      </div>
      <Messenger />
    </form>
  </div>
</template>
<script>
import { useLayoutStore } from '~/store/layout';
export default defineComponent({
  name: 'CadastrarDepoimento',
  setup() {
    const nuxtApp = useNuxtApp()
    const postDepoimento = nuxtApp.apiCadastrarDepoimento
    const layoutStore = useLayoutStore()

    let depoimento = ref({
      nome: '',
      referencia: '',
      depoimento: ''
    })


    const cadastrarDepoimento = async () => {
      layoutStore.clearMessages()
      let depoimentoRes = ''
      try {
        depoimentoRes = await postDepoimento(depoimento.value)
        layoutStore.setMessage({ message: 'Depoimento cadastrado com sucesso', type: 1 })
      } catch (err) {
        layoutStore.setMessage({ message: 'Erro ao cadastrar depoimento: ' + err, type: 0 })
        console.log('err', err);
      }
    }

    onMounted(() => {
      layoutStore.clearMessages()
    })

    return {
      depoimento,
      cadastrarDepoimento
    }
  }
})
</script>

<style lang="scss">
h2 {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
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

  .inputRadio {
    width: auto;
    padding: 0;
    margin-right: 5px;
    min-height: inherit;
  }
}

.listaFotos {
  margin: 20px 0;

  li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;

    .img {
      margin-right: 20px;
    }

    .dados {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
