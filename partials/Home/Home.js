export default defineComponent({
  name: 'JSHome',
  setup() {
    const route = useRoute()
    const config = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const buscarProjetos = nuxtApp.apiListarObras
    const buscarDepoimentos = nuxtApp.apiListarDepoimentos
    let projectList = ref()
    let depoimentosList = ref()

    const getObras = async () => {
      try {
        projectList.value = await buscarProjetos()
      } catch (error) {
        console.log('error', error);
      }
    }

    const getDepoimentos = async () => {
      try {
        depoimentosList.value = await buscarDepoimentos()
      } catch (error) {
        console.log('error', error);
      }
    }

    const init = () => {
      getObras()
      getDepoimentos()
    }

    onMounted(() => {
      init()
    })

    return {
      projectList,
      depoimentosList
    }
  }
})

