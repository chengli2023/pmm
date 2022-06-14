/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Project", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        projectName: DataTypes.TEXT,
        pd: DataTypes.TEXT,
        proposer:DataTypes.TEXT,
        checker:DataTypes.STRING(50),
        pm:DataTypes.STRING(50),
        status:DataTypes.STRING(100)
    },{
        comment: "",
        freezeTableName: true,//禁用sequelize的表命自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt,
        underscored: true//列名用下划线形式
    })
}

