// Objectives:
// x retrieve messages from server
// send messages to server
// secure against xss attacks in messages as well as user names and room names etc.
// allow for chat rooms
// 'befriend users' functionality by clicking on usernames
  // bold all messages from those users

window.url = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
var $chatContainer;
var rooms = {};
var messages = [];
var username;

// onLoad event handler function
  // initial call to refresh handler (get messages)

// attach on ready document handler into document.ready listener
$(document).ready(function() {
  var $main = $('#main');
  $chatContainer = $('#chats');

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
  if (!username) {
    username = window.location.search.split('=')[1];
  }
  var body = $('#user-message').val;
  console.log(body);
};

var getMessages = function() {
  $.getJSON(window.url, function(data) {
    messages = data.results;
  }).done(renderMessages);
};

// <div class="message">
//   <a class="user" data-user=author-name>user-name-here</a>
//   <time class="timestamp"></time>
//   <div class='message-body'>message-body-here</div>
// </div>

var renderMessages = function() {
  _.forEach(messages, function(messageObj) {
    // console.log("inside forEach");
    var $messageDiv = $('<div class="message"></div>');
    var $userName = $('<a class="user"></a>');
    var $messageBody = $('<div class="message-body"></div>');
    var $time = $('<time class="timestamp"></time>');

    $userName.text(messageObj.username);
    $messageBody.text(messageObj.text);
    $time.text(messageObj.createdAt);

    $messageDiv.append($userName, $messageBody, $time);
    $chatContainer.append($messageDiv);

    // populate rooms object
    if(!rooms[messageObj.roomname]) {
      rooms[messageObj.roomname] = messageObj.roomname;
      var $room = $('<option></option>');
      $room.text(messageObj.roomname);
      $('#room-selector select').append($room);
    }
  });
};

