/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Dianpu", {
        name: DataTypes.STRING(50),
        address:DataTypes.TEXT,
        phone:DataTypes.STRING(11),
        gzh:DataTypes.STRING(30)
    },{
        comment: "",
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt,
        underscored: true//列名用下划线形式
    })
}

