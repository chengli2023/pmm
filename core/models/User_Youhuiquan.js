/**
 * Created by Administrator on 2015/5/30.
 */
var utils = require('../../lib/utils')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User_Youhuiquan", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userphone:DataTypes.STRING(11),
        status:DataTypes.INTEGER(1),
        logicnumber:{type:DataTypes.STRING(12),defaultValue:utils.genYouhuiquanNumber()},

        chiyou_count:{type: DataTypes.VIRTUAL}
    },{

        comment: "",
        createdAt: 'create_time',
        updatedAt: 'update_time'
    })
}