/*
* @ author unocus
* @ use 后台用户schema
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model('AdminUser', AdminUserSchema);