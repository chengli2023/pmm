var express = require('express');
var http = require('http');

var router = express.Router();
var path = require('path');
var utils = require('../../lib/utils');
var Promise = require('promise')
var crypto = require('crypto')
var sys = require('sys')
var util = require('util')
var db = require('../config/sequelizeConfig')

var projectService = require('../services/ProjectService')

router.$requestMapping = '/project';
const wrap = fn => (...args) => fn(...args).catch(args[2])
router.get('/list', wrap(async function (req, res, next) {
    const result = await projectService.getProjectList();
    return res.json(result)
}));

router.get('/plan/list', wrap(async function (req, res, next) {
    const result = await projectService.getProjectPlanList(req.query["id"]);
    return res.json(result)
}));

router.post('/createProject', wrap(async function (req, res, next) {
    const created = await projectService.createProject(req.body);
    return res.json()
}));

router.post('/editProject', wrap(async function (req, res, next) {
    const edited = await projectService.editProject(req.body);
    return res.json()
}));

router.post('/createProjectPlan', wrap(async function (req, res, next) {
    const created = await projectService.createProjectPlan(req.body);
    return res.json()
}));
router.post('/editProjectPlan', wrap(async function (req, res, next) {
    const edited = await projectService.editProjectPlan(req.body);
    return res.json()
}));

router.post('/deleteProject', wrap(async function (req, res, next) {
    const result = await projectService.deleteProject(req.body.projectId);
    return res.json(result)
}));
router.post('/deleteProjectPlan', wrap(async function (req, res, next) {
    const result = await projectService.deleteProjectPlan(req.body.projectPlanId);
    return res.json(result)
}));
router.get('/getById', wrap(async function (req, res, next) {
    const result = await projectService.getProjectById(req.query.projectId);
    return res.json(result)
}));

router.get('/getProjectPlan', wrap(async function (req, res, next) {
    const result = await projectService.getProjectPlanById(req.query["id"]);
    return res.json(result)
}));


module.exports = router;
