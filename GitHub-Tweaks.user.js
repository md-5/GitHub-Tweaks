// ==UserScript==
// @name GitHub Tweaks
// @namespace md_5
// @description Including quoting and tagging of replies.
// @include *://github.com/*
// @version 4
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(main);

function main() {
    jQ('.discussion-bubble-inner').each(function() {
        var self = jQ(this);
        var author = self.find('.comment-header-author').text();
        var commentId = self.find('.comment-header-action-text a').attr('href');
        if (commentId != null && commentId.indexOf('comment') != -1) {
            var actionList = self.find('.comment-header-right').first();
            actionList.append("<ul class='comment-header-actions'><li><a class='comment-header-action-text gm-tag' href='#' data-user='" + author + "' data-comment='" + commentId + "'>@</a></li></ul>");
        }
    });

    jQ('.gm-tag').click(function() {
        var user = jQ(this).data('user');
        var comment = jQ(this).data('comment');
        var textBox = jQ('.write-content.is-default textarea');
        textBox.focus();
        var quote = "";

        jQ(comment + ' .comment-body p').each(function() {
            quote += '\n>' + jQ(this).text();
        });

        textBox.val(textBox.val() + '@' + user + ' ' + jQ(location).attr('href').split('#')[0] + comment + quote + '\n\n');
        return false;
    });
}
