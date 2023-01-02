module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Cliente'
    
    const cols = {
        id: {
            type: dataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        envio_fk: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        dni: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        telefono: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE, 
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        }
    }

    const config = {
        tablename: 'clientes',
        timestamps: false,
        underscored: true,
        camelCase: false
    }

    const Cliente = sequelize.define(alias, cols, config);

    Cliente.associate = function (models) {
        
        Cliente.belongsTo( models.Envio, {
          as: "envios",
          foreignKey: "envio_fk"
        });

        Cliente.belongsToMany( models.Producto, {
            as: "productos",
            through: "pedidos",
            foreignKey: "cliente_fk",
            otherKey: "producto_fk",
            timestamps: false
        })
    }

    return Cliente;
}