(function (window) {
  $.ajax({
    type:"GET",
    url: "http://jsonplaceholder.typicode.com/posts",
    success: function(data) {
            //console.log(data);
            let body = document.getElementsByTagName("body");
            body[0].innerHTML = "<h3>Posts and Comments</h3>";
            let regex = /\n/g;
            for(let i=0; i<data.length-1; i++) {
              let article = document.createElement("article");
              body[0].appendChild(article);
              // title
              let head = document.createElement("h2");
              head.setAttribute("data-posts", "title");
              head.innerText = data[i]["title"];
              article.appendChild(head);
              // paragraph
              let para = document.createElement("P");
              para.setAttribute("data-posts", "body");
              para.innerHTML = data[i]["body"].replace(regex, '<br />');
              article.appendChild(para);
              // button
              let button = document.createElement("button");
              button.setAttribute("data-posts", "id");
              button.setAttribute("value", data[i]["id"]);
              button.innerText = "Show comments";
              article.appendChild(button);
              // section for comments
              let section = document.createElement("section");
              section.setAttribute("class", "comments");
              section.setAttribute("id", "comments-"+data[i]["id"]);
              section.hidden = true;
              section.innerHTML = "<h3>Comments</h3>";
              article.appendChild(section);
            }
            for(let i=0; i<=data.length-1; i++) {
              generateComments(data[i]["id"]);
            }
        },
    error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status);
        },
   dataType: "jsonp"
 });
})(window);

function generateComments(postId) {
  let regex = /\n/g;
  $.ajax({
    type:"GET",
    url: "http://jsonplaceholder.typicode.com/comments?postId="+postId,
    success: function(data) {
            const COMMENT_SELECTOR = 'comments-'+postId;
            let section = document.getElementById(COMMENT_SELECTOR);
            //console.log(data);
            for(let i=0; i<data.length-1; i++) {
              let para = document.createElement("P");
              para.setAttribute("data-comments", "body");
              para.setAttribute("comment-id", data[i]["id"]);
              para.innerHTML = data[i]["body"].replace(regex, '<br />');
              section.appendChild(para);
              let address = document.createElement("address");
              address.setAttribute("data-comments", "name");
              section.appendChild(address);
              let a = document.createElement("a");
              a.setAttribute("data-comments", "email");
              a.setAttribute("href", "mailto:"+data[i]["email"]);
              a.innerText = data[i]["name"];
              address.appendChild(a);
            }
            // button toggle
            const BUTTON_SELECTOR = '[data-posts="id"]';
            let buttons = document.querySelectorAll(BUTTON_SELECTOR);
            buttons.forEach(function (button) {
              let sectionSelector = `#comments-${button.value}`;
              let commentSection = document.querySelector(sectionSelector);
              button.addEventListener('click', function (event) {
                if (commentSection.hidden) {
                  commentSection.hidden = false;
                  button.textContent = 'Hide comments';
                } else {
                  commentSection.hidden = true;
                  button.textContent = 'Show comments';
                }
                event.preventDefault();
              });
            });
        },
    error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status);
        },
   dataType: "jsonp"
  });
}
