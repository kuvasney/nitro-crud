<template>
  <div class="cadastroObras">
    <h2>
      Cadastrar nova obra
    </h2>
    <form @submit.prevent="cadastrarObra()" class="formAdm">
      <div class="formP">
        <label for="obraNome">
          Nome da obra
        </label>
        <input type="text" id="obraNome" placeholder="O nome que aparecerá no título" v-model="novaObra.nome">
      </div>

      <div class="formP">
        <label for="obraDescricao">
          Descrição da obra
        </label>
        <input type="text" id="obraDescricao" placeholder="Resumo da obra" v-model="novaObra.descricao">
      </div>

      <div class="formP">
        <label for="obraTipo">
          Tipo de obra
        </label>
        <input type="text" id="obraTipo" placeholder="residencial, apartamento, comercial" v-model="novaObra.tipo">
      </div>

      <div class="formP">
        <label for="obraLocal">
          Local da obra
        </label>
        <input type="text" id="obraLocal" placeholder="São Pedro, SP" v-model="novaObra.local">
      </div>

      <div class="formP">
        <label for="obraFotos">
          Enviar fotos
        </label>
        <input type="file" id="obraFotos" ref="fileInput" @change="handleFileSelect" multiple required>
      </div>
      <div v-if="selectedFiles.length > 0" class="formP">
        <h2>Arquivos selecionados:</h2>
        <p>
          Escolha uma foto para ser a imagem principal
        </p>
        <ul class="listaFotos">
          <li v-for="(file, index) in selectedFiles" :key="index">
            <div class="img">
              <img :src="previewFotos[index]" alt="" width="100px" height="auto">
            </div>
            <div class="dados">
              <label class="formP"><input type="radio" v-model="novaObra.fotoDestaque" :value="index" id="`fotoDestaque-${index}`" class="inputRadio"
                name="fotoDestaque" required /> Definir como imagem principal</label>
              <input type="text" placeholder="descricao" v-model="novaObra.descricaoFoto[index]"> <br>
              {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB - {{ file.type }}
            </div>
          </li>
        </ul>
      </div>
      <div class="formP">
        <button type="submit">Cadastrar obra</button>
      </div>
      <Messenger />
    </form>
  </div>
</template>
<script>
import { useLayoutStore } from '~/store/layout';
export default defineComponent({
  name: 'CadastrarObra',
  setup() {
    const nuxtApp = useNuxtApp()
    const getObras = nuxtApp.apiListarObras
    const layoutStore = useLayoutStore()
    const config = useRuntimeConfig()

    let novaObra = ref({
      nome: '',
      descricao: '',
      local: '',
      tipo: '',
      fotos: '',
      fotoDestaque: '',
      descricaoFoto: []
    })

    let fileInput = ref()
    let selectedFiles = ref([])
    let previewFotos = ref([])

    const handleFileSelect = (event) => {
      selectedFiles.value = Array.from(event.target.files)
      previewFotos.value = []

      for (let i = 0; i < selectedFiles.value.length; i++) {
        const file = selectedFiles.value[i]
        const reader = new FileReader();
        reader.onload = (e) => {
          previewFotos.value.push(e.target.result)
        }

        reader.readAsDataURL(file); // Lê o arquivo como URL
      }
    }


    const cadastrarObra = async () => {
      layoutStore.clearMessages()
      const formData = new FormData();  // Corrigido: "F" maiúsculo
      // Adiciona os dados de novaObra ao FormData
      formData.append('nome', novaObra.value.nome);
      formData.append('descricao', novaObra.value.descricao);
      formData.append('local', novaObra.value.local);
      formData.append('tipo', novaObra.value.tipo);
      formData.append('fotoDestaque', novaObra.value.fotoDestaque);

      // Adiciona cada foto ao FormData
      for (let i = 0; i < selectedFiles.value.length; i++) {


        formData.append('fotos', selectedFiles.value[i]);  // 'fotos' é o nome esperado no backend
        formData.append(`descricaoFoto[${i}]`, novaObra.value.descricaoFoto[i] || ""); // Adiciona descrição das fotos
      }

      try {
        const apiToken = localStorage.getItem('apiToken')
        const url = `${config.public.baseUrl}/obras`

        const requestConfig = {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          body: formData,
          method: 'POST'
        }
        await $fetch(url, requestConfig)
          // Envia o FormData com os dados da obra e as fotos
          .then((res) => {
            if (res.obra) {
              layoutStore.setMessage({ message: `Obra ${res.obra.nome} cadastrada com sucesso`, type: 1 })

              // Limpa os dados e o input file
              novaObra.value = {
                nome: '',
                descricao: '',
                local: '',
                tipo: '',
                fotos: '',
                fotoDestaque: '',
                descricaoFoto: []
              };
              selectedFiles.value = [];
              fileInput.value = '';  // Limpa o input de arquivo
            }
          })
          .catch(error => {
            console.log('erro ', error);
            throw new Error()
            // layoutStore.setMessage({ message: `Erro ao cadastrar obra`, type: 0 })
          })
      } catch (err) {
        console.log('err', err);
        layoutStore.setMessage({ message: `Erro ao cadastrar obra`, type: 0 })
      }
    }

    onMounted(() => {
      layoutStore.clearMessages()
    })

    return {
      novaObra,
      cadastrarObra,
      handleFileSelect,
      selectedFiles,
      previewFotos,
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
