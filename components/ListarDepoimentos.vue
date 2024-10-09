<template>
  <div class="listarDepoimentos">
    <h2>Lista de Depoimentos</h2>
    <ul class="listaDepoimentos">
      <li v-for="depoimento in depoimentosList">
        {{ depoimento.nome }} <span class="editar" @click="abrirDepoimento(depoimento)">Detalhes</span>
        <span class="editar" @click="excluirDepoimento(depoimento._id)">Excluir Depoimento</span>
        <div class="listaDepoimentos__detalhes" v-show="depoimentoAtivo._id === depoimento._id">
          <div class="botoes">
            <button @click="depoimentoAtivo = {}">X</button>
          </div>
          <form @submit.prevent="editarDepoimento(depoimentoAtivo)" class="formAdm">
            <div>Depoimento id: {{ depoimento._id }} <span class="editar"
                @click="depoimentoAtivo.id = depoimento._id"><i class="icon-pencil icon"></i>Editar</span></div>
            <div>
              Autor: <input type="text" v-model="depoimentoAtivo.nome"
                :disabled="depoimentoAtivo.id !== depoimento._id">
            </div>
            <div>
              Referência: <input type="text" v-model="depoimentoAtivo.referencia"
                :disabled="depoimentoAtivo.id !== depoimento._id">
            </div>
            <div>
              Depoimento: <textarea v-model="depoimentoAtivo.depoimento"
                :disabled="depoimentoAtivo.id !== depoimento._id"></textarea>
            </div>
            <div>
              <button type="submit" v-show="depoimentoAtivo.id === depoimento._id">Atualizar</button>
            </div>
          </form>
        </div>
      </li>
      <Messenger />
    </ul>
  </div>
</template>
<script>
import { useLayoutStore } from '~/store/layout';
export default defineComponent({
  name: 'ListarDepoimentos',
  setup() {
    const config = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const getDepoimentos = nuxtApp.apiListarDepoimentos
    const layoutStore = useLayoutStore()
    let depoimentoAtivo = ref(0)
    let depoimentosList = ref()

    /**
     * Lista as Depoimentos cadastradas
     */
    const listarDepoimentos = async () => {
      // isListarDepoimentos.value === true ? isListarDepoimentos.value = false : isListarDepoimentos.value = true
      layoutStore.toggleLoading(true)
      try {
        depoimentosList.value = await getDepoimentos()
        if (!depoimentosList) {
          throw new Error('Erro ao listar Depoimentos')
        }
      } catch (error) {
        layoutStore.setMessage({ message: 'Erro ao listar Depoimentos', type: 0 })
        console.log('err', error);
      } finally {
        layoutStore.toggleLoading(false)
      }
    }

    const abrirDepoimento = (depoimento) => {
      depoimentoAtivo.value = { ...depoimento }
    }

    const editarDepoimento = async (depoimento) => {
      try {
        const apiToken = localStorage.getItem('apiToken')
        const url = `${config.public.baseUrl}/depoimentos/${depoimento._id}`

        const requestConfig = {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          body: depoimentoAtivo.value,
          method: 'PATCH'
        }
        await $fetch(url, requestConfig)
          .then((res) => {
            if (res) {
              layoutStore.setMessage({
                message: `Depoimento de ${depoimentoAtivo.value.nome} atualizado com sucesso.`,
                type: 1
              })
            }
          })
      } catch (error) {
        layoutStore.setMessage({
          message: `Erro ao atualizar depoimento: ${error}`,
          type: 0
        })
      }
    }

    const excluirDepoimento = async (depoimento) => {
      if (confirm('Deseja realmente excluir?')) {
        try {
          const apiToken = localStorage.getItem('apiToken')
          const url = `${config.public.baseUrl}/depoimentos/${depoimento}`

          // const deletado = depoimentosList.value.find(item => item._id === depoimento)

          // console.log('depoimento id', depoimento);

          // const deletado = Object.values(depoimentosList.value).find(dep => dep._id === depoimento)

          removerItem(depoimentosList.value, depoimento)

          // console.log('delet', deletado);
          const requestConfig = {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
            method: 'DELETE'
          }
          let deleteResponse = await $fetch(url, requestConfig)

          if (deleteResponse) {
            layoutStore.setMessage({ message: `Depoimento de ${deleteResponse.depoimento.nome} removido com sucesso.`, type: 1 })
            // listarDepoimentos(false)
          }
        } catch (error) {
          console.log('erro ', error);
          layoutStore.setMessage({ message: `Erro ao excluir depoimento: ${error}`, type: 0 })
        }
      }
    }

    /**
     * Percorre e apaga um item de um objeto
     * @param obj O objeto a ser editado
     * @param id o id do item excluído
     */
    const removerItem = (obj, id) => {
      for (let key in obj) {
        if(obj[key]._id === id) {
          delete obj[key]
          console.log('depoimentos', obj);
          return true
        }
      }
      return false // Caso o id não seja encontrado
    }

    onMounted(() => {
      layoutStore.clearMessages()
      listarDepoimentos()
    })

    return {
      listarDepoimentos,
      abrirDepoimento,
      editarDepoimento,
      excluirDepoimento,
      depoimentosList,
      depoimentoAtivo
    }
  }
})
</script>

<style lang="scss">
.listarDepoimentos {

  .listaDepoimentos {

    li {
      margin-bottom: 20px;
    }
  }

  .editar {
    font-size: 10px;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid green;
    padding: 2px;
  }
}

.listaDepoimentos__detalhes {
  position: relative;
  border: 1px solid grey;
  padding: 10px;
  margin: 10px auto;

  .botoes {
    float: right;
  }



  form {

    div {
      margin-bottom: 10px;

      input {
        width: 80%;
      }
    }
  }

  .fotosCadastradas {

    ul {
      display: table;

      li {
        display: table-cell;
        padding: 20px;
        text-align: center;

        .desc {
          display: block;
        }
      }
    }
  }
}
</style>
