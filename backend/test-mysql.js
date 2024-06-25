import mysql from 'mysql2';
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'newuser',
  password : 'Sk@241195%',
  database : 'employees',
  
});
 
try{
    connection.connect();
}catch(e){
    console.log(e);
}


// eslint-disable-next-line no-unused-vars
connection.query('SELECT * from departments', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  connection.end();
});
 
