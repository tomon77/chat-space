$(function(){
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message__upper-message">
        <div class="chat-main__messages__message__upper-message__name">
        ${message.user_name}
        </div>
        <div class="chat-main__messages__message__upper-message__date">
        ${message.created_at}
        </div>
        </div>
        <div class="chat-main__messages__message__lower-message">
        <p class="chat-main__messages__message__lower-message__content">
        ${message.content}
        </p>
        <img src="${message.image}" class="chat-main__messages__message__lower-message__image" >
        </div>
        </div>`
    } else if (message.content) {
      var html = `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message__upper-message">
        <div class="chat-main__messages__message__upper-message__name">
        ${message.user_name}
        </div>
        <div class="chat-main__messages__message__upper-message__date">
        ${message.created_at}
        </div>
        </div>
        <div class="chat-main__messages__message__lower-message">
        <p class="chat-main__messages__message__lower-message__content">
        ${message.content}
        </p>
        </div>
        </div>`
    } else if (message.image) {
      var html = `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message__upper-message">
        <div class="chat-main__messages__message__upper-message__name">
        ${message.user_name}
        </div>
        <div class="chat-main__messages__message__upper-message__date">
        ${message.created_at}
        </div>
        </div>
        <div class="chat-main__messages__message__lower-message">
        <img src="${message.image}" class="chat-main__messages__message__lower-message__image" >
        </div>
        </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('form')[0].reset();
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('.chat-main__form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});


