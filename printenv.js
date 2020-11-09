require('env2')('.env');
console.log(process.env);

console.log(process.env.REACT_APP_API);

console.log('>> Hello', process.env.HELLO);
