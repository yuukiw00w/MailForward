/*
 * queryにヒットした未読メールを見つけたらmarkReadしてto宛にGmailAppでsubject/bodyをsendする
 */
function forwardToMail(query, to, start = 0, max = 5) {
  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);
  messagesForThreads.forEach( function(messages) {
    messages.forEach( function(message) {
      if (message.isUnread()) {
        message.markRead();
        GmailApp.sendEmail(to, message.getSubject(), message.getBody());
      }
    });
  });
}

/*
 * queryにヒットした未読メールを見つけたらmarkReadしてto宛にGmailAppでsubject/bodyをsendする。bodyはhtmlBodyに入れて送る
 */
function forwardToHTMLMail(query, to, start = 0, max = 5) {
  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);
  messagesForThreads.forEach( function(messages) {
    messages.forEach( function(message) {
      if (message.isUnread()) {
        message.markRead();
        GmailApp.sendEmail(to, message.getSubject(), 'mail forward by gas', { htmlBody: message.getBody() });
      }
    });
  });
}

/*
 * queryにヒットした未読メールを見つけたらmarkReadしてmessageを入れてcallbackを呼ぶ
 */
function forwardCallback(query, callback, start = 0, max = 5) {
  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);
  messagesForThreads.forEach( function(messages) {
    messages.forEach( function(message) {
      if (message.isUnread()) {
        message.markRead();
        callback(message);
      }
    });
  });
}
