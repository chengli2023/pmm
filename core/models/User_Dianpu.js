/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User_Dianpu", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role:DataTypes.STRING(50),
        userphone:DataTypes.STRING(11),
        ishexiao:{
           type:DataTypes.BOOLEAN, defaultValue:false
        }
    },{
        comment: "",
        createdAt: 'create_time',
        updatedAt: 'update_time'
    })
}