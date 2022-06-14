/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Youhuiquan", {
        title:DataTypes.STRING(50),
        content:DataTypes.TEXT,
        starttime:DataTypes.DATE,
        endtime:DataTypes.DATE,
        isnewuser:DataTypes.BOOLEAN,
        status:{type: DataTypes.INTEGER,defaultValue:0},
        views:{type: DataTypes.INTEGER,defaultValue:0},
        hexiaoci:{type: DataTypes.INTEGER,defaultValue:0},
        type:DataTypes.STRING
    },{
        comment: "",
        createdAt: 'create_time',
        updatedAt: 'update_time'

        /*getterMethods: {
            password: function() { return this._password },
            password_confirmation: function() { return this._password_confirmation }
        },

        setterMethods: {
            password: function(v) { this._password = v },
            password_confirmation: function(v) { this._password_confirmation = v }
        }*/
    })
}