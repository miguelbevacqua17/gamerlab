module.exports = (sequelize, dataTypes) => {

    const alias = 'Factura'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total_a_pagar: {
            type: dataTypes.DECIMAL,
            allowNull:false
        }
    }
    
    const config = {
        tablename: 'facturas',
        timestamps: false,
        underscored: true,
        camelCase: false
    }

    const Factura = sequelize.define(alias, cols, config);

    Factura.associate = function (models){

        Factura.hasMany(models.Pedido, {
           as: "pedidos",
           foreignKey: "factura_fk"
        });
    }
   
    return Factura;
}