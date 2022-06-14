/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User", {
        phone:DataTypes.STRING(11)
    },{
        comment: "",
        createdAt: 'create_time',
        updatedAt: 'update_time'
    })
}