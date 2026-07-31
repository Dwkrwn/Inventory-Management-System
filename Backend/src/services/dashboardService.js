const dashboardModel = require('../models/dashboardModel');

const getDashboard = async () => {
  const [total_barang, total_supplier, masuk_hari_ini, keluar_hari_ini, stok_menipis, list_menipis, grafik_masuk, grafik_keluar] =
    await Promise.all([
      dashboardModel.totalBarang(),
      dashboardModel.totalSupplier(),
      dashboardModel.barangMasukHariIni(),
      dashboardModel.barangKeluarHariIni(),
      dashboardModel.stokMenipis(),
      dashboardModel.listStokMenipis(),
      dashboardModel.grafikMasuk(),
      dashboardModel.grafikKeluar(),
    ]);

  return {
    total_barang,
    total_supplier,
    barang_masuk_hari_ini: masuk_hari_ini,
    barang_keluar_hari_ini: keluar_hari_ini,
    jumlah_stok_menipis: stok_menipis,
    list_stok_menipis: list_menipis,
    grafik_masuk,
    grafik_keluar,
  };
};

module.exports = { getDashboard };
