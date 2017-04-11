// Objectives:
// x retrieve messages from server
// x send messages to server
// secure against xss attacks in messages as well as user names and room names etc.
// x allow for chat rooms
// x 'befriend users' functionality by clicking on usernames
  // x bold all messages from those users

window.url = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
var $chatContainer;
var rooms = {};
var $roomName;
var messages = [];
var username;
var friends = [];

// onLoad event handler function
  // initial call to refresh handler (get messages)

// attach on ready document handler into document.ready listener
$(document).ready(function() {
  var $main = $('#main');
  $chatContainer = $('#chats');

  // attach event handler on send message button
  $('#send-message').click(sendMessage);

  // attach event handler on refresh button
  $('#refresh').click(function() {getMessages();});

  // attach event handler on room drop-down list
  $('select').change(function() {
    $roomName = $(this).find(':selected').text();
    if ($roomName === 'Add New Room...') {
      $roomName = prompt('New room name');
    } else {
      getMessages($roomName);
    }
  });

  $chatContainer.click('.username', function(event) {
    var userClicked = event.target.text;
    if (userClicked !== undefined) {
      if (friends.indexOf(userClicked) === -1) {
        friends.push(userClicked);
      }
    }
  });

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
  var data = {};
  data.text = $('#user-message').val();
  data.username = username;
  data.roomname = $roomName;

  $.ajax({
    url: window.url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(data) {
      console.log('Message successfully sent.');
    },
    error: function(data) {
      console.error('Message failed to post with data: ' + data);
    }
  });
};

var getMessages = function(roomname) {
/*
  $.getJSON(window.url, function(data) {
    messages = data.results;
  }).done(renderMessages);
*/
  // @tapOut
  var query = {order: '-createdAt'};  // Return msgs in desc order of time.

  if (roomname !== 'Select a Room') {  // If user selects a room, only get msgs from that room.
    query.where = {roomname: roomname};
  }

  $.ajax({
    url: url,
    data: query,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      messages = data.results;
      $chatContainer.empty();
      renderMessages();
    },
    error: function(data) {
      console.error('getMessage failure with data ' + data);
    }
  });
};

// <div class="message">
//   <a class="user" data-user=author-name>user-name-here</a>
//   <time class="timestamp"></time>
//   <div class='message-body'>message-body-here</div>
// </div>

var renderMessages = function() {
  _.forEach(messages, function(messageObj) {
    // console.log("inside forEach");
    var $messageDiv = $('<div class="chat"></div>');
    var $userName = $('<a class="username"></a>');
    var $messageBody = $('<div class="message-body"></div>');
    var $time = $('<time class="timestamp"></time>');

    $userName.text(messageObj.username);
    $messageBody.text(messageObj.text);
    $time.text(messageObj.createdAt);

    if(friends.indexOf(messageObj.username) !== -1) {
      $messageDiv.addClass('friend');
    }

    $messageDiv.append($userName, $messageBody, $time);
    $chatContainer.append($messageDiv);

    // populate rooms object
    if(!rooms[messageObj.roomname] && messageObj.roomname !== undefined) {
      rooms[messageObj.roomname] = messageObj.roomname;
      var $room = $('<option></option>');
      $room.text(messageObj.roomname);
      $('#room-selector select').append($room);
    }
  });
};

