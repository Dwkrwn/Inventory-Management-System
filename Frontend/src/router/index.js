import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/login',
    component: () => import('../layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('../pages/DashboardPage.vue') },
      { path: 'barang', name: 'barang', component: () => import('../pages/BarangPage.vue') },
      { path: 'kategori', name: 'kategori', component: () => import('../pages/KategoriPage.vue') },
      { path: 'supplier', name: 'supplier', component: () => import('../pages/SupplierPage.vue') },
      { path: 'satuan', name: 'satuan', component: () => import('../pages/SatuanPage.vue') },
      { path: 'tujuan-pengeluaran', name: 'tujuan', component: () => import('../pages/TujuanPage.vue') },
      { path: 'barang-masuk', name: 'barang-masuk', component: () => import('../pages/BarangMasukPage.vue') },
      { path: 'barang-keluar', name: 'barang-keluar', component: () => import('../pages/BarangKeluarPage.vue') },
      { path: 'laporan', name: 'laporan', component: () => import('../pages/LaporanPage.vue') },
      {
        path: 'users',
        name: 'users',
        component: () => import('../pages/UsersPage.vue'),
        meta: { roles: ['admin'] },
      },
      { path: 'profile', name: 'profile', component: () => import('../pages/ProfilePage.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.public) {
    if (auth.isLoggedIn && to.path === '/login') return '/dashboard'
    return true
  }

  if (!auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.role)) {
    return '/dashboard'
  }

  return true
})

export default router
