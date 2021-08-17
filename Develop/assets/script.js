$(document).ready(function(){


//Adding Date to Header
var today = moment().format('MMMM Do YYYY');
console.log(today)
$("#currentDay").append(today);

var now=parseInt(moment().format('HH'));
console.log(now)
})


