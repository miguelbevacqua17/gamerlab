module.exports = (sequelize, dataTypes) => {

    const alias = 'Envio'

    const cols = {
        id: {
            type: dataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        pais: {
            type: dataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING,
            allowNull: false
        },
        region: {
            type: dataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        altura: {
            type: dataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: dataTypes.STRING,
            allowNull: false
        },
        codigo_postal: {
            type: dataTypes.STRING,
            allowNull: false   
        }
    }

    const config = {
        tablename: 'envios',
        timestamps: false,
        underscored: true,
        camelCase: false
    }

    const Envio = sequelize.define(alias, cols, config);

    Envio.associate = function (models){
        
        Envio.hasMany( models.Cliente, {
          as: "clientes",
          foreignKey: "envio_fk"
        });
    }

    return Envio;
}