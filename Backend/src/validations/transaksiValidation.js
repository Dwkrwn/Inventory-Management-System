const Joi = require('joi');

const detailItemSchema = Joi.object({
  barang_id: Joi.number().integer().required().messages({
    'any.required': 'Barang wajib dipilih',
  }),
  qty: Joi.number().integer().min(1).required().messages({
    'any.required': 'Jumlah wajib diisi',
    'number.min': 'Jumlah minimal 1',
  }),
  harga_beli: Joi.number().min(0).default(0),
  harga_jual: Joi.number().min(0).default(0),
});

const barangMasukSchema = Joi.object({
  tanggal: Joi.date().required().messages({
    'any.required': 'Tanggal wajib diisi',
  }),
  supplier_id: Joi.number().integer().required().messages({
    'any.required': 'Supplier wajib dipilih',
  }),
  keterangan: Joi.string().allow('', null),
  detail: Joi.array().items(detailItemSchema).min(1).required().messages({
    'array.min': 'Minimal harus ada satu barang',
    'any.required': 'Detail barang wajib diisi',
  }),
});

const barangKeluarSchema = Joi.object({
  tanggal: Joi.date().required().messages({
    'any.required': 'Tanggal wajib diisi',
  }),
  tujuan_pengeluaran_id: Joi.number().integer().required().messages({
    'any.required': 'Tujuan pengeluaran wajib dipilih',
  }),
  keterangan: Joi.string().allow('', null),
  detail: Joi.array().items(detailItemSchema).min(1).required().messages({
    'array.min': 'Minimal harus ada satu barang',
    'any.required': 'Detail barang wajib diisi',
  }),
});

module.exports = { barangMasukSchema, barangKeluarSchema };
