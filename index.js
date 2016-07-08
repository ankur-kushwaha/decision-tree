var jsonfile = require('jsonfile')
var _ = require('lodash');
var file = 'data2.json'
jsonfile.readFile(file, function(err, obj) {
    createData(obj);
})

function createData(arr) {
    var out = {};
    var keys = _.keys(arr[0]);
    var key1 = keys[3];

    var o = {};

    arr.forEach(function(rec) {
        var val0 = rec[key1];
        if (o[val0]) {
            o[val0] = o[val0] + 1;
        } else {
            o[val0] = 1;
        }
    });

    out.name="testing";
    out.children=[];

    _.forOwn(calFraction(o), function(value, key) {
      var obj={};
      obj.name=key +" "+ value;
      out.children.push(obj);
    } );
    console.dir(out);
    jsonfile.writeFile("out.json", out,{spaces:2}, function (err) {
    console.error(err)
  })
}

function calFraction(obj) {
    var values = _.values(obj);
    var total = 0;
    values.forEach(function(d) {
        total = total + Number(d);
    })
    var keys = _.keys(obj);
    keys.forEach(function(d) {
        obj[d] = Math.round((obj[d] / total) * 100);
    });
    return obj;
}
