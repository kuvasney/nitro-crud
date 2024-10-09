export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  nuxtApp.apiCadastrarDepoimento = async (depoimento) => {
    try {
      const apiToken = localStorage.getItem('apiToken')
      const url = `${config.public.baseUrl}/depoimentos`

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: depoimento,
        method: 'POST'
      }
      await $fetch(url, requestConfig)
      .then((res) => {
        console.log('res', res);
        return res
      })
    } catch (error) {
      console.log('Erro', error);
    }
  }
})
