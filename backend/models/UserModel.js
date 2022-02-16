import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    join_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Users;