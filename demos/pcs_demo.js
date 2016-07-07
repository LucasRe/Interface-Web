var exec = require('child_process').exec;

// Executando programa externo
// exec('gedit', function(error, stdout, stderr){
// });

// Capturando saida
exec('ls', function(error, stdout, stderr) {
  // MSG de saida
  console.log(stdout);

  // Erro
  if (error !== null) {
    console.log(typeof(error));
    console.log(typeof(stderr));
  };
});


var spawn = require('child_process').spawn,
  pwd = spawn('gedit');
setInterval(function() {
  console.log(
    pwd.pid
  )
}, 1000);
setTimeout(function() {
  console.log(
    pwd.kill())
}, 10000);

pwd.stdout.setEncoding('utf8');
pwd.stdout.on('data', function(data) {
  console.log(pid);
});
