module.exports = (sequelize, dataTypes) => {

    const alias = 'Pedido'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cliente_fk: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        producto_fk: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        factura_fk: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        precio_venta: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        cantidad_prod: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    const config = {
        tablename: 'pedidos',
        timestamps: false,
        underscored: true,

        camelCase: false
    }

    const Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = function(models){

        Pedido.belongsTo(models.Factura, {   
            as: "facturas",
            foreignKey: "factura_fk"
            });

        /*
        Pedido.belongsToMany (models.Cliente, {
            as: "clientes",
            through: "pedidos",
            foreignKey: "producto_fk",
            otherKey: "cliente_fk",
            timestamps: false
            })
        */
    }

    return Pedido;
}