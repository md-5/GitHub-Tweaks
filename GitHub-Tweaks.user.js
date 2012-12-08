// ==UserScript==
// @name        GitHub Tweaks
// @namespace   md_5
// @description Including quoting and tagging of replies.
// @include     *://github.com/*
// @version     2
// ==/UserScript==

$('.discussion-bubble-inner').each(function() {
    var self = $(this);
    var author = self.find('.comment-header-author').text();
    var commentId = self.find('.comment-header-action-text a').attr('href');
    if (commentId != null && commentId.indexOf('comment') != -1) {
        var actionList = self.find('.comment-header-right').first();
        actionList.append("<ul class='comment-header-actions'><li><a class='comment-header-action-text gm-tag' href='#' data-user='" + author + "' data-comment='" + commentId + "'>@</a></li></ul>");
    }
});

$('.gm-tag').click(function() {
    var user = $(this).data('user');
    var comment = $(this).data('comment');
    var textBox = $('.write-content.is-default textarea');
    textBox.focus();
    var quote = "";

    var location = window.location.href;
    if (location.indexOf('#') != -1) { 
        location = location.substring(0, location.indexOf('#'));
    }

    $(comment + ' .comment-body p').each(function() {
        quote += '\n>' + $(this).text();
    });

    textBox.val(textBox.val() + '@' + user  + ' ' + location + comment + quote + '\n\n');
    return false;
});
