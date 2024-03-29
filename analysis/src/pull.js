/* global require:true, console:true, process:true, __dirname:true */
'use strict'

var fs      = require('fs')
  , dataset = []
  , redis   = require('redis')
  , rport   = 6382
  , client

client = redis.createClient(rport)

client.on('connect', keys)

function keys () {
  client.keys("*", function (err, res) {
    res.forEach(data)
    client.quit()
  });
}

function data (k, i, arr) {
  client.hgetall(k, function (err, obj) {
    dataset.push(obj)
    if(i === arr.length-1) log(dataset)
  });
}

function log (obj) {
  console.log(JSON.stringify(obj))
}
