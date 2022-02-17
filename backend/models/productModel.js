import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products',{
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.DOUBLE
    },
    quantity:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

export default Product;