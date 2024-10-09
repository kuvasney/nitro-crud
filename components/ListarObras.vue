<template>
  <!-- LISTA DE OBRAS  -->
  <div class="listarObras">
    <h2>Lista de Obras</h2>
    <ul class="listaObras">
      <li v-for="obra in obrasList">
        {{ obra.nome }} <span class="editar" @click="abrirObra(obra)">Detalhes</span>
        <span class="editar" @click="excluirObra(obra._id)">Excluir Obra</span>
        <div class="listaObras__detalhes" v-show="obraAtiva._id === obra._id">
          <div class="botoes">

            <button @click="obraAtiva = {}">X</button>
          </div>
          <form @submit.prevent="editarObra(obraAtiva)" class="formAdm">
            <div>Obra id: {{ obra._id }} <span class="editar" @click="obraAtiva.id = obra._id"><i
                  class="icon-pencil icon"></i>Editar</span></div>
            <div>
              Nome da obra: <input type="text" v-model="obraAtiva.nome" :disabled="obraAtiva.id !== obra._id">
            </div>
            <div>
              Local da obra: <input type="text" v-model="obraAtiva.local" :disabled="obraAtiva.id !== obra._id">
            </div>
            <div>
              Descrição da obra: <input type="text" v-model="obraAtiva.descricao" :disabled="obraAtiva.id !== obra._id">
            </div>
            <div>
              Tipo obra: <input type="text" v-model="obraAtiva.tipo" :disabled="obraAtiva.id !== obra._id">
            </div>
            <div class="fotosCadastradas">
              Fotos cadastradas:
              <ul>
                <li v-for=" foto in obraAtiva.fotos">
                  <img :src="`/uploads/obras/${foto.nomeArquivo}`" :alt="foto.descricaoFoto" width="200px"
                    height="auto">
                  <span class="desc">Descrição: {{ foto.descricaoFoto }}</span>
                </li>
              </ul>
              <button type="submit" v-show="obraAtiva.id === obra._id">Atualizar</button>
            </div>
            <!-- <p class="log" v-if="Object.keys(log).length > 0"
              :class="{ 'sucesso': log.tipo === 1, 'erro': log.tipo === 0 }">
              {{ log.mensagem }}
            </p> -->
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
  name: 'ListarObras',
  setup() {
    const config = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const getObras = nuxtApp.apiListarObras
    const layoutStore = useLayoutStore()
    let obraAtiva = ref(0)
    let obrasList = ref()

    /**
     * Lista as obras cadastradas
     */
    const listarObras = async () => {

      layoutStore.toggleLoading(true)
      try {
        console.log('ooooooo', );
        obrasList.value = await getObras()
        if (!obrasList) {
          throw new Error('Erro ao listar obras')
        }
      } catch (error) {
        layoutStore.setMessage({ message: 'Erro ao listar obras', type: 0 })
      } finally {
        layoutStore.toggleLoading(false)
      }
    }

    const abrirObra = (obra) => {
      obraAtiva.value = { ...obra }
    }

    const editarObra = async (obra) => {
      try {
        const apiToken = localStorage.getItem('apiToken')
        const url = `${config.public.baseUrl}/obras/${obra._id}`

        const requestConfig = {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          body: obraAtiva.value,
          method: 'PATCH'
        }
        await $fetch(url, requestConfig)
          .then((res) => {
            if (res) {
              layoutStore.setMessage({
                message: `Obra ${obraAtiva.value.nome} atualizada com sucesso.`,
                type: 1
              })
            }
          })
      } catch (error) {
        layoutStore.setMessage({
          message: `Erro ao atualizar obra: ${error}`,
          type: 0
        })
      }
    }

    const excluirObra = async (obra) => {
      if (confirm('Deseja realmente excluir?')) {
        try {
          const apiToken = localStorage.getItem('apiToken')
          const url = `${config.public.baseUrl}/obras/${obra}`

          const requestConfig = {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
            method: 'DELETE'
          }
          let deleteResponse = await $fetch(url, requestConfig)

          if (deleteResponse) {
            layoutStore.setMessage({ message: `Obra ${deleteResponse.obra.nome} removida com sucesso.`, type: 1 })
            removerItem(obrasList.value, obra)
            // listarObras(false)
          }
        } catch (error) {
          console.log('erro ', error);
          layoutStore.setMessage({ message: `Erro ao excluir obra: ${error}`, type: 0 })
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
        if (obj[key]._id === id) {
          delete obj[key]
          console.log('depoimentos', obj);
          return true
        }
      }
      return false // Caso o id não seja encontrado
    }

    onMounted(() => {
      listarObras()
      layoutStore.clearMessages()
    })

    return {
      listarObras,
      abrirObra,
      editarObra,
      excluirObra,
      obrasList,
      obraAtiva
    }
  }
})
</script>

<style lang="scss">
.listarObras {

  .listaObras {

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

.listaObras__detalhes {
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
