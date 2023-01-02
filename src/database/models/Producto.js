module.exports = (sequelize, dataTypes) => {

    const alias = 'Producto';

    const cols = {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        categoria_fk: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        created_at: {
            type: dataTypes.DATE, 
        },
        updated_at: {
            type: dataTypes.DATE, 
        },
        deleted_at: {
            type: dataTypes.DATE,
            defaultValue: true
        },
        nombre: {
            type: dataTypes.STRING(255),
            allowNull:false
        },
        imagen: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(255), 
            allowNull:false
        },
        precio_lista: { 
            type: dataTypes.DECIMAL, 
            allowNull:false
        },
        descuento: {
            type: dataTypes.DECIMAL, 
            allowNull:false
        },
        stock: {
            type: dataTypes.INTEGER, 
            allowNull:false
        },
        deleteable: {
            type: dataTypes.BOOLEAN, 
            allowNull:false
        }
    }

    const config = {
        tablename: 'productos',
        timestamps: false,
        underscored: true,
        camelCase: false
    }

    const Producto = sequelize.define(alias,cols,config);
    
    Producto.associate = function (models) {
        
        Producto.belongsTo( models.categorias, {
          as: "categorias",
          foreignKey: "categoria_fk"
        });

        Producto.belongsToMany( models.Cliente, {
            as: "Cliente",
            through: "pedidos",
            foreignKey: "producto_fk",
            otherKey: "cliente_fk",
            timestamps: false
        })
    }

    return Producto;
}