<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  Ruler,
  PackageOpen,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileBarChart,
  Users,
  Boxes,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
} from '@lucide/vue'
import { menu } from '../router/menu'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
import { useToastStore } from '../stores/toastStore'
import ConfirmDialog from '../components/base/ConfirmDialog.vue'
import Toaster from '../components/base/Toaster.vue'

const icons = {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  Ruler,
  PackageOpen,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileBarChart,
  Users,
}

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()
const toast = useToastStore()

const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const showLogoutConfirm = ref(false)
const loggingOut = ref(false)

const roleLabels = {
  admin: 'Admin Gudang',
  staff: 'Staff Gudang',
  owner: 'Owner',
}

const visibleMenu = computed(() =>
  menu
    .filter((item) => item.section || item.roles.includes(auth.role))
    .map((item) => {
      if (item.section) {
        return {
          ...item,
          items: item.items.filter((sub) => sub.roles.includes(auth.role)),
        }
      }
      return item
    })
    .filter((item) => (item.section ? item.items.length > 0 : true))
)

const currentTitle = computed(() => {
  for (const item of menu) {
    if (item.section) {
      const found = item.items.find((sub) => sub.to === route.path)
      if (found) return found.label
    } else if (item.to === route.path) {
      return item.label
    }
  }
  return 'Dashboard'
})

const initials = computed(() => {
  const nama = auth.user?.nama || 'User'
  return nama
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
})

const confirmLogout = async () => {
  loggingOut.value = true
  await auth.logout()
  toast.success('Berhasil logout')
  router.replace('/login')
}

onMounted(() => {
  theme.init()
})
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <Toaster />

    <!-- Overlay mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Boxes class="h-5 w-5" />
          </div>
          <span class="font-semibold text-slate-900 dark:text-white">Inventori</span>
        </div>
        <button class="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" @click="sidebarOpen = false">
          <X class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <template v-for="(item, i) in visibleMenu" :key="i">
          <p v-if="item.section" class="mt-4 mb-1 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            {{ item.section }}
          </p>
          <RouterLink
            v-for="sub in item.section ? item.items : [item]"
            :key="sub.to"
            :to="sub.to"
            class="mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
            :class="
              route.path === sub.to
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            "
            @click="sidebarOpen = false"
          >
            <component :is="icons[sub.icon]" class="h-5 w-5 shrink-0" />
            {{ sub.label }}
          </RouterLink>
        </template>
      </nav>

      <div class="border-t border-slate-200 p-3 dark:border-slate-800">
        <div class="flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            {{ initials }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-slate-900 dark:text-white">{{ auth.user?.nama }}</p>
            <p class="truncate text-xs text-slate-500 dark:text-slate-400">{{ roleLabels[auth.role] }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Navbar -->
      <header class="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center gap-3">
          <button class="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" @click="sidebarOpen = true">
            <Menu class="h-5 w-5" />
          </button>
          <div>
            <p class="text-xs text-slate-400 dark:text-slate-500">Dashboard</p>
            <h1 class="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">{{ currentTitle }}</h1>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            :title="theme.isDark ? 'Mode terang' : 'Mode gelap'"
            @click="theme.toggle()"
          >
            <Sun v-if="theme.isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>

          <div class="relative">
            <button
              class="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              @click="userMenuOpen = !userMenuOpen"
            >
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {{ initials }}
              </div>
            </button>

            <div
              v-if="userMenuOpen"
              class="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
              @click="userMenuOpen = false"
            >
              <div class="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <p class="text-sm font-medium text-slate-900 dark:text-white">{{ auth.user?.nama }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">@{{ auth.user?.username }}</p>
              </div>
              <RouterLink to="/profile" class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                <UserIcon class="h-4 w-4" />
                Profil
              </RouterLink>
              <button
                class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                @click="showLogoutConfirm = true"
              >
                <LogOut class="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <router-view />
      </main>
    </div>

    <ConfirmDialog
      v-if="showLogoutConfirm"
      title="Keluar dari aplikasi?"
      message="Anda akan diarahkan kembali ke halaman login."
      confirm-text="Ya, logout"
      :loading="loggingOut"
      @confirm="confirmLogout"
      @cancel="showLogoutConfirm = false"
    />
  </div>
</template>
