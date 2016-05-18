var cartodb = require('cartodb');

var sql = new cartodb.SQL({
  user: 'nerikcarto',
  api_key: 'd63a7c700e69574171cf79915456bf6c39208306'
});

sql.execute('select * from flights limit 1', {format: 'csv'}).done(function(data) {
  console.log(data)
  console.log(data.rows[0])
})
