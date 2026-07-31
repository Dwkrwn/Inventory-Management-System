export const menu = [
  { label: 'Dashboard', to: '/dashboard', icon: 'LayoutDashboard', roles: ['admin', 'staff', 'owner'] },
  {
    section: 'Data Master',
    items: [
      { label: 'Barang', to: '/barang', icon: 'Package', roles: ['admin', 'staff', 'owner'] },
      { label: 'Kategori', to: '/kategori', icon: 'Tags', roles: ['admin', 'staff', 'owner'] },
      { label: 'Supplier', to: '/supplier', icon: 'Truck', roles: ['admin', 'staff', 'owner'] },
      { label: 'Satuan', to: '/satuan', icon: 'Ruler', roles: ['admin', 'staff', 'owner'] },
      { label: 'Tujuan Pengeluaran', to: '/tujuan-pengeluaran', icon: 'PackageOpen', roles: ['admin', 'staff', 'owner'] },
    ],
  },
  {
    section: 'Transaksi',
    items: [
      { label: 'Barang Masuk', to: '/barang-masuk', icon: 'ArrowDownToLine', roles: ['admin', 'staff', 'owner'] },
      { label: 'Barang Keluar', to: '/barang-keluar', icon: 'ArrowUpFromLine', roles: ['admin', 'staff', 'owner'] },
    ],
  },
  { label: 'Laporan', to: '/laporan', icon: 'FileBarChart', roles: ['admin', 'staff', 'owner'] },
  { label: 'Kelola User', to: '/users', icon: 'Users', roles: ['admin'] },
]
