/**
 * Created by Administrator on 2015/5/30.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ProjectPlan", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        projectId:DataTypes.INTEGER,
        bu: DataTypes.TEXT,
        developer:DataTypes.STRING(50),
        dependTask:DataTypes.TEXT,
        workHour:DataTypes.TEXT,
        plan:DataTypes.TEXT,
        releaseOrder:DataTypes.TEXT,
        comments:DataTypes.TEXT
    },{
        comment: "",
        createdAt: 'create_time',
        updatedAt: 'update_time'
    })
}

