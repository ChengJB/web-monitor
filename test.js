// function Test(name){
//   this.name=name
// }
// Test.prototype.say=function(){
//   console.log(this)
// }
// Test.prototype.var=this
// const test = new Test('test222')
// console.log(test.var)
// test.say()
/*
function Parent(){
  this.name='parent'
  this.play=[1,2]
}
function Child(){
  this.name='child'
}
Child.prototype=new Parent()
function Child2(){
  this.name='child2'
}
Child2.prototype=new Parent()

const child = new Child()
child.play.push(3)
const child2 = new Child2()
child2.play.push(4)
console.log(child.play,child2.play)
*/
//new 流程
//1.创建一个空对象
//2.将空对象的原型指向构造函数的原型
//3.将构造函数的this指向空对象
//4.执行构造函数
// //5.返回对象
// function test(){
//   console.log('this111:',this)
// }
// const test2={
//   test2:test
// }
// test()
// test2.test2()
const test = new XMLHttpRequest();
console.log(test);
