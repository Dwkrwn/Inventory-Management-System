const Joi = require('joi');

const kategoriSchema = Joi.object({
  nama_kategori: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Nama kategori wajib diisi',
    'string.empty': 'Nama kategori wajib diisi',
    'string.min': 'Nama kategori minimal 2 karakter',
    'string.max': 'Nama kategori maksimal 100 karakter',
  }),
  deskripsi: Joi.string().allow('', null),
});

const supplierSchema = Joi.object({
  nama_supplier: Joi.string().trim().min(2).max(150).required().messages({
    'any.required': 'Nama supplier wajib diisi',
    'string.empty': 'Nama supplier wajib diisi',
  }),
  nama_pic: Joi.string().allow('', null).max(100),
  no_hp: Joi.string().allow('', null).max(20),
  email: Joi.string().allow('', null).email().messages({
    'string.email': 'Format email tidak valid',
  }),
  alamat: Joi.string().allow('', null),
});

const satuanSchema = Joi.object({
  nama_satuan: Joi.string().trim().min(1).max(50).required().messages({
    'any.required': 'Nama satuan wajib diisi',
    'string.empty': 'Nama satuan wajib diisi',
  }),
  keterangan: Joi.string().allow('', null),
});

const tujuanSchema = Joi.object({
  nama_tujuan: Joi.string().trim().min(2).max(150).required().messages({
    'any.required': 'Nama tujuan wajib diisi',
    'string.empty': 'Nama tujuan wajib diisi',
  }),
  keterangan: Joi.string().allow('', null),
});

const barangSchema = Joi.object({
  nama_barang: Joi.string().trim().min(2).max(150).required().messages({
    'any.required': 'Nama barang wajib diisi',
    'string.empty': 'Nama barang wajib diisi',
  }),
  kategori_id: Joi.number().integer().required().messages({
    'any.required': 'Kategori wajib dipilih',
  }),
  supplier_id: Joi.number().integer().required().messages({
    'any.required': 'Supplier wajib dipilih',
  }),
  satuan_id: Joi.number().integer().required().messages({
    'any.required': 'Satuan wajib dipilih',
  }),
  harga_beli: Joi.number().min(0).default(0),
  harga_jual: Joi.number().min(0).default(0),
  min_stok: Joi.number().integer().min(0).default(0),
  deskripsi: Joi.string().allow('', null),
});

const userSchema = Joi.object({
  role_id: Joi.number().integer().required().messages({
    'any.required': 'Role wajib dipilih',
  }),
  username: Joi.string().trim().min(3).max(50).required().messages({
    'any.required': 'Username wajib diisi',
    'string.empty': 'Username wajib diisi',
    'string.min': 'Username minimal 3 karakter',
  }),
  nama: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Nama wajib diisi',
    'string.empty': 'Nama wajib diisi',
  }),
  no_hp: Joi.string().allow('', null).max(20),
  password: Joi.string().min(6).messages({
    'string.min': 'Password minimal 6 karakter',
  }),
  is_active: Joi.boolean().default(true),
});

const userUpdateSchema = Joi.object({
  role_id: Joi.number().integer().required(),
  nama: Joi.string().trim().min(2).max(100).required(),
  no_hp: Joi.string().allow('', null).max(20),
  is_active: Joi.boolean().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password baru wajib diisi',
    'string.min': 'Password minimal 6 karakter',
  }),
});

module.exports = {
  kategoriSchema,
  supplierSchema,
  satuanSchema,
  tujuanSchema,
  barangSchema,
  userSchema,
  userUpdateSchema,
  resetPasswordSchema,
};
