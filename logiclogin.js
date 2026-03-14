if(location.pathname!="/"){
document.body.innerHTML="";
}

// <![CDATA[
      var cursor = null;
      if (items && items.length > 0) {
        cursor = parseInt(items[items.length - 1].timestamp) + 1;
      }

      var bodyFromEntry = function(entry) {
        var text = (entry &&
                    ((entry.content && entry.content.$t) ||
                     (entry.summary && entry.summary.$t))) ||
            '';
        if (entry && entry.gd$extendedProperty) {
          for (var k in entry.gd$extendedProperty) {
            if (entry.gd$extendedProperty[k].name == 'blogger.contentRemoved') {
              return '<span class="deleted-comment">' + text + '</span>';
            }
          }
        }
        return text;
      }

      var parse = function(data) {
        cursor = null;
        var comments = [];
        if (data && data.feed && data.feed.entry) {
          for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
            var comment = {};
            // comment ID, parsed out of the original id format
            var id = /blog-(\d+).post-(\d+)/.exec(entry.id.$t);
            comment.id = id ? id[2] : null;
            comment.body = bodyFromEntry(entry);
            comment.timestamp = Date.parse(entry.published.$t) + '';
            if (entry.author && entry.author.constructor === Array) {
              var auth = entry.author[0];
              if (auth) {
                comment.author = {
                  name: (auth.name ? auth.name.$t : undefined),
                  profileUrl: (auth.uri ? auth.uri.$t : undefined),
                  avatarUrl: (auth.gd$image ? auth.gd$image.src : undefined)
                };
              }
            }
            if (entry.link) {
              if (entry.link[2]) {
                comment.link = comment.permalink = entry.link[2].href;
              }
              if (entry.link[3]) {
                var pid = /.*comments\/default\/(\d+)\?.*/.exec(entry.link[3].href);
                if (pid && pid[1]) {
                  comment.parentId = pid[1];
                }
              }
            }
            comment.deleteclass = 'item-control blog-admin';
            if (entry.gd$extendedProperty) {
              for (var k in entry.gd$extendedProperty) {
                if (entry.gd$extendedProperty[k].name == 'blogger.itemClass') {
                  comment.deleteclass += ' ' + entry.gd$extendedProperty[k].value;
                } else if (entry.gd$extendedProperty[k].name == 'blogger.displayTime') {
                  comment.displayTime = entry.gd$extendedProperty[k].value;
                }
              }
            }
            comments.push(comment);
          }
        }
        return comments;
      };

      var paginator = function(callback) {
        if (hasMore()) {
          var url = config.feed + '?alt=json&v=2&orderby=published&reverse=false&max-results=50';
          if (cursor) {
            url += '&published-min=' + new Date(cursor).toISOString();
          }
          window.bloggercomments = function(data) {
            var parsed = parse(data);
            cursor = parsed.length < 50 ? null
                : parseInt(parsed[parsed.length - 1].timestamp) + 1
            callback(parsed);
            window.bloggercomments = null;
          }
          url += '&callback=bloggercomments';
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      };
      var hasMore = function() {
        return !!cursor;
      };
      var getMeta = function(key, comment) {
        if ('iswriter' == key) {
          var matches = !!comment.author
              && comment.author.name == config.authorName
              && comment.author.profileUrl == config.authorUrl;
          return matches ? 'true' : '';
        } else if ('deletelink' == key) {
          return config.baseUri + '/comment/delete/'
               + config.blogId + '/' + comment.id;
        } else if ('deleteclass' == key) {
          return comment.deleteclass;
        }
        return '';
      };

      var replybox = null;
      var replyUrlParts = null;
      var replyParent = undefined;

      var onReply = function(commentId, domId) {
        if (replybox == null) {
          // lazily cache replybox, and adjust to suit this style:
          replybox = document.getElementById('comment-editor');
          if (replybox != null) {
            replybox.height = '250px';
            replybox.style.display = 'block';
            replyUrlParts = replybox.src.split('#');
          }
        }
        if (replybox && (commentId !== replyParent)) {
          replybox.src = '';
          document.getElementById(domId).insertBefore(replybox, null);
          replybox.src = replyUrlParts[0]
              + (commentId ? '&parentID=' + commentId : '')
              + '#' + replyUrlParts[1];
          replyParent = commentId;
        }
      };

      var hash = (window.location.hash || '#').substring(1);
      var startThread, targetComment;
      if (/^comment-form_/.test(hash)) {
        startThread = hash.substring('comment-form_'.length);
      } else if (/^c[0-9]+$/.test(hash)) {
        targetComment = hash.substring(1);
      }

      // Configure commenting API:
      var configJso = {
        'maxDepth': config.maxThreadDepth
      };
      var provider = {
        'id': config.postId,
        'data': items,
        'loadNext': paginator,
        'hasMore': hasMore,
        'getMeta': getMeta,
        'onReply': onReply,
        'rendered': true,
        'initComment': targetComment,
        'initReplyThread': startThread,
        'config': configJso,
        'messages': msgs
      };

      var render = function() {
        if (window.goog && window.goog.comments) {
          var holder = document.getElementById('comment-holder');
          window.goog.comments.render(holder, provider);
        }
      };

      // render now, or queue to render when library loads:
      if (window.goog && window.goog.comments) {
        render();
      } else {
        window.goog = window.goog || {};
        window.goog.comments = window.goog.comments || {};
        window.goog.comments.loadQueue = window.goog.comments.loadQueue || [];
        window.goog.comments.loadQueue.push(render);
      }
    })();



if(location.pathname!="/"){
document.body.innerHTML="";
}

if (sessionStorage.getItem("isAuth") === "true") {
  document.getElementById("blog-locker").style.display = "none";
}


    // Hàm mở menu sidebar
    function toggleMenu(id){
      var menu = document.getElementById(id);
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }

    // LOGIC KHÓA MÀN HÌNH
     var passwordHash = "dbffa3f32bf3223c0510df12c822d591848e03c1b9073cc74a3753155e017647";
	 var soLanSai = 0;

		window.onload = function() {

  if (sessionStorage.getItem("isAuth") === "true") {
    var locker = document.getElementById("blog-locker");
    if (locker) locker.style.display = "none";
  }

  var f = document.getElementById("pass-field");
  if (f) f.value = "";

}

async function checkPass() {

  var entered = document.getElementById("pass-field").value;

  const encoder = new TextEncoder();
  const data = encoder.encode(entered);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray.map(b => b.toString(16).padStart(2,"0")).join("");

  console.log(hashHex);

  if (hashHex === passwordHash) {

    sessionStorage.setItem("isAuth","true");
    document.getElementById("blog-locker").style.display = "none";

  } else {

    soLanSai++;

    if (soLanSai >= 2) {

      alert("BẠN ĐÃ NHẬP SAI 2 LẦN! Truy cập bị từ chối.");
      window.location.href="https://blogger.googleusercontent.com/img/a/AVvXsEgyhBuunKnUwYTLOVo4AuW3qb3DY7oBvfgKsEUQhVAMXnC0lOoC9BL1rFFSmKXqF27OxOmuEtC0FeAtKoGTkrSgMP7G0saNhHAAaN6Qsxtetg-DJMA24frzEJPy1ciDNRK-ZjxGaHo4aB7VSjAMXgfLyFnQ1LtXlcuWpxgZ2cEehNFKyw-bvxdTTgiuOYME=w529-h588";

    } else {

      alert("Sai mã rồi! Bạn còn " + (2 - soLanSai) + " lần thử lại.");
      document.getElementById("pass-field").value="";
      document.getElementById("pass-field").focus();

    }
  }
}

    // Bắt phím Enter
    var pf=document.getElementById("pass-field");

if(pf){
pf.addEventListener("keyup",function(event){
if(event.key==="Enter"){checkPass();}
});
}
      if (event.key === "Enter") { checkPass(); }
    });

    // Xử lý URL mobile ?m=1
    if (location.href.indexOf("?m=1") !== -1) {
      var clean = location.href.replace("?m=1","");
      window.history.replaceState(null, null, clean);
    }


  // block12rightclick
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  
  document.onkeydown = function(e) {
    var isCtrlShift = e.ctrlKey && e.shiftKey;
    // F12
    if (e.keyCode == 123) return false;
    // Ctrl+Shift+I, J, C
    if (isCtrlShift && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false;
    // Ctrl+U (Xem source)
    if (e.ctrlKey && e.keyCode == 85) return false;
  };

  // 
  setInterval(function() {
    console.clear();
    console.log("%cDỪNG LẠI!", "color: red; font-size: 40px; font-weight: bold; -webkit-text-stroke: 1px black;");
    console.log("%cKhu vực bảo mật của PQ TOOLS. Đừng cố soi code vô ích!", "font-size: 16px; color: #ff4d4d;");
  }, 1000);

	//
	document.addEventListener("keydown", function(e) {

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }

  if (e.key === "F12") {
    e.preventDefault();
  }

});


// ]]>