// Objectives:
// retrieve messages from server
// send messages to server
// secure against xss attacks in messages as well as user names and room names etc.
// allow for chat rooms
// 'befriend users' functionality by clicking on usernames
  // bold all messages from those users

window.url = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';

var messages = [];

// onLoad event handler function
  // initial call to refresh handler (get messages)

// attach on ready document handler into document.ready listener
$(document).ready(function() {

  var $main = $('#main');
  // attach event handler on send message button
  $('#send-message').click(sendMessage);
  // attach event handler on refresh button
  $('#refresh').click(getMessages);


});

// var exampleMessage = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var sendMessage = function() {

};

var getMessages = function() {
  $.getJSON(window.url, function(data) {
    messages = data.results;
  });
};

var renderMessages = function() {

};

