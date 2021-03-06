
var sys = require('sys'),
    fs = require('fs'),
    haml = require('../lib/haml'),
    hamlJS = require('./haml-js/lib/haml'),
    page = fs.readFileSync('benchmarks/page.haml')
    times = 3000

function bm(label, fn) {
  var start = +new Date
  fn()
  var duration = ((+new Date) - start) / 1000
  sys.puts(label + ': ' + duration + ' seconds')
}

sys.puts(times + ' times')

bm('null', function(){
  var n = times
  while (n--) ;
})

bm('haml.js', function(){
  var n = times
  while (n--) haml.render(page)
})

bm('haml.js cache', function(){
  var n = times
  while (n--) haml.render(page, { cache: true, filename: 'page.haml' })
})

bm('haml-js', function(){
  var n = times
  while (n--) hamlJS.render(page)
})
