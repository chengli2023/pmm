/**
 * Created by Administrator on 2015/5/15.
 */
var Promise = require('promise')
var util = require('util')
var utils = require('../../lib/utils')
var db = require('../config/sequelizeConfig')

var Project = db.import('../models/Project')
var ProjectPlan = db.import('../models/ProjectPlan')


var exports = module.exports = {}

exports.getProjectList = async function () {
    return await Project.findAll()
}
exports.getProjectPlanList = async function (projectId) {
    return await ProjectPlan.findAll({where:{projectId}})
}
exports.getProjectById = async function (projectId) {
    const result = await Project.findOne({where:{id:projectId}})
    return result.dataValues;
}
exports.getProjectPlanById = async function (projectPlanId) {
    const result = await ProjectPlan.findOne({where:{id:projectPlanId}})
    return result.dataValues;
}


exports.createProject = async function (project) {
    const result = await Project.create({
        projectName:project.projectName,
        pd:project.pd,
        proposer:project.proposer,
        checker:project.checker,
        pm:project.pm,
        status:project.status
    });
    return result.dataValues;
}
exports.editProject = async function (project) {
    const result = await Project.update({
        projectName:project.projectName,
        pd:project.pd,
        proposer:project.proposer,
        checker:project.checker,
        pm:project.pm,
        status:project.status
    },{where:{id:project.id}});
    return result.dataValues;
}

exports.deleteProject = async function (projectId) {
    return await Project.destroy({where:{id:projectId}})
}

exports.createProjectPlan = async function (projectPlan) {
    const result = await ProjectPlan.create({
        projectId:projectPlan.projectId,
        bu:projectPlan.bu,
        developer:projectPlan.developer,
        dependTask:projectPlan.dependTask,
        workHour:projectPlan.workHour,
        plan:projectPlan.plan,
        releaseOrder:projectPlan.releaseOrder,
        comments:projectPlan.comments
    });
    return result.dataValues;
}
exports.editProjectPlan = async function (projectPlan) {
    const result = await ProjectPlan.update({
        bu:projectPlan.bu,
        developer:projectPlan.developer,
        dependTask:projectPlan.dependTask,
        workHour:projectPlan.workHour,
        plan:projectPlan.plan,
        releaseOrder:projectPlan.releaseOrder,
        comments:projectPlan.comments
    },{where:{id:projectPlan.id}});
    return result.length>0?true:false;
}

exports.deleteProjectPlan = async function (projectPlanId) {
    return await ProjectPlan.destroy({where:{id:projectPlanId}})
}
