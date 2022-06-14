/**
 * Created by Administrator on 2015/4/22.
 */
var roles = {
    customer: 'customer',
    boss: 'boss'
}

var acl = [
    // {url: '/projectPlan', roles: [roles.customer]},
    {url: '/project/list', roles: []},
    {url: '/project/plan/list', roles: []},

    {url: '/project/createProject', roles: []},
    {url: '/project/editProject', roles: []},
    {url: '/project/createProjectPlan', roles: []},
    {url: '/project/editProjectPlan', roles: []},
    {url: '/project/deleteProject', roles: []},
    {url: '/project/deleteProjectPlan', roles: []},
    {url: '/project/getById', roles: []},
    {url: '/project/getProjectPlan', roles: []},
]

exports = module.exports = function grantedAuthority(){
    function handler(req, res, next){
        var roleName = req.rolename||'';
        var path = req.path;
        path = path[path.length - 1] == '/' ? path.slice(0, path.length - 1) : path;
        if(hasGranted(path,roleName)){
            next();
        }else{
            res.sendStatus(403);
        }
    }
    return handler;
};

/**
 *
 * @param req
 * @param acl
 * @returns {boolean}
 */
hasGranted = function(path,roleName){
    for(var i = 0; i < acl.length; i ++){
        var authority = acl[i];
        if(path === authority.url){
            var roleArray = authority.roles;
            if(roleArray.length == 0){
                return true;//资源没有关联到角色视为拥有访问权限
            }
            for(var j = 0; j < roleArray.length; j ++){
                if(roleArray[j] === roleName) return true;
            }
        }

    }
    return false;
};
