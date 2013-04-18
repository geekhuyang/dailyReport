// Generated by CoffeeScript 1.6.1
(function() {
  var Response, redis;

  redis = require("redis");

  Response = require('../vo/response').Response;

  exports.createDepartment = function(departmentName, parentId, callback) {
    var client;
    client = redis.createClient();
    console.log("departmentName:" + departmentName + ", parentId:" + parentId);
    return client.incr("next_department_id", function(err, reply) {
      var result;
      client.hset("departments", "" + reply + ":name", departmentName);
      result = {
        name: departmentName
      };
      if (parentId) {
        client.hset("departments", "" + reply + ":pid", parentId);
        result["pid"] = parentId;
      }
      client.quit();
      if (callback) {
        return callback(new Response(1, 'success', reply));
      }
    });
  };

  exports.getAllDepartments = function(callback) {
    var client;
    client = redis.createClient();
    return client.hgetall("departments", function(err, reply) {
      client.quit();
      if (callback) {
        return callback(new Response(1, 'success', reply));
      }
    });
  };

}).call(this);
