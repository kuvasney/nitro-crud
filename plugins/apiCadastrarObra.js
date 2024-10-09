export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  nuxtApp.apiCadastrarObra = async (obra, fotos) => {
    try {
      const formData = new FormData()

      // Adiciona cada foto ao FormData
      // for (let i = 0; i < fotos.length; i++) {
      //   formData.append('fotos', fotos[i]);
      // }
      // Adiciona os dados de novaObra ao FormData
      formData.append('nome', obra.nome);
      formData.append('descricao', obra.descricao);
      formData.append('local', obra.local);
      formData.append('tipo', obra.tipo);
      formData.append('fotos', fotos)


      const apiToken = localStorage.getItem('apiToken')
      const url = `${ config.public.baseUrl }/obras`

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
        method: 'POST'
      }
      await $fetch(url, requestConfig)
    } catch (error) {
      console.log('Erro', error);
    }
  }
})
