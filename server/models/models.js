import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  active: { type: DataTypes.STRING, defaultValue: 'ACTIVATED' }
});

export const Note = sequelize.define('note', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING  },
  message: { type: DataTypes.STRING }
});

User.hasMany(Note);
Note.belongsTo(User);

export default {
  User,
  Note
};