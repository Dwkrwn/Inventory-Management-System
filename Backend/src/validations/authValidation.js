const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    'any.required': 'Username wajib diisi',
    'string.empty': 'Username wajib diisi',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password wajib diisi',
    'string.empty': 'Password wajib diisi',
  }),
});

const profileSchema = Joi.object({
  nama: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Nama wajib diisi',
    'string.empty': 'Nama wajib diisi',
    'string.min': 'Nama minimal 2 karakter',
    'string.max': 'Nama maksimal 100 karakter',
  }),
  no_hp: Joi.string().allow('', null).max(20),
});

const passwordSchema = Joi.object({
  password_lama: Joi.string().required().messages({
    'any.required': 'Password lama wajib diisi',
    'string.empty': 'Password lama wajib diisi',
  }),
  password_baru: Joi.string().min(6).required().messages({
    'any.required': 'Password baru wajib diisi',
    'string.empty': 'Password baru wajib diisi',
    'string.min': 'Password baru minimal 6 karakter',
  }),
});

const themeSchema = Joi.object({
  theme: Joi.string().valid('light', 'dark').required().messages({
    'any.only': 'Tema hanya boleh light atau dark',
    'any.required': 'Tema wajib diisi',
  }),
});

module.exports = { loginSchema, profileSchema, passwordSchema, themeSchema };
