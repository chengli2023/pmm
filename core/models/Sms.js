/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Sms", {
        smscode: DataTypes.STRING,
        smscode_expires: {type:DataTypes.DATE,defaultValue: DataTypes.NOW},
        phone:DataTypes.STRING
    })
}