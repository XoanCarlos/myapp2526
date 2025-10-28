import NotFound from '../components/NotFound.vue'
import PaginaInicio from '../components/PaginaInicio.vue'
import GestionClientes from '../components/GestionClientes.vue'
import NotiCias from '../components/NotiCias.vue'
import AvisoLegal from '../components/AvisoLegal.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',      // Ruta raíz o la que se carga al
        name: 'Inicio',
        component: PaginaInicio
    },
    {
        path: '/clientes',
        name: 'GestionClientes',
        component: GestionClientes
    },
    {
        path: '/noticias',
        name: 'NotiCias',
        component: NotiCias
    },
    {
        path: '/avisolegal',
        name: 'AvisoLegal',
        component: AvisoLegal
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router