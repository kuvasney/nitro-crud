export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const router = useRouter()

  nuxtApp.apiListarObras = async () => {
    try {
      const url = `${ config.public.baseUrl }/public/obras`
      // return await $fetch(url, {method: 'GET'})
      const res = await $fetch(url, { method: 'GET' })
      if (res.data) {
        return res.data
      } else {
        throw new Error('Retorno da api vazio')
      }
    } catch (error) {
      console.log('Erro', error);
    }
  }
})
