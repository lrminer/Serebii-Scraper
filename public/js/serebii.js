$.get("/scrape", function() {}).then(loadPage);

function loadPage(id) {
  $.get("/api/articles")
    .then(data => {
      console.log(data);
      data.forEach(item => {
        console.log(item._id);
        const article = $("<article>")
          .attr("id", item._id)
          .addClass("")
          .data("id", item._id);
        const heading = $("<h2>")
          .addClass("article-heading")
          .append(
            $("<a>")
              .addClass("article-link")
              .attr("href", "https://www.serebii.net" + item.link)
              .text(item.heading)
          );

        const date = $("<h3>")
          .addClass("article-date")
          .text(item.date);

        const image = $("<img>")
          .addClass("article-image")
          .attr("src", "https://www.serebii.net" + item.image);

        const description = $("<p>")
          .addClass("article-description")
          .text(item.description);

        article.append(heading, date, image, description);

        // might need to check if item.comments > 0; hint: empty arrays are truthy
        const articleComments = $("<div>").addClass("article-comments");
        item.comments.forEach(comment => {
          const commentDiv = $("<div>")
            .addClass("comment-div")
            .append(
              $("<h4>").text("Author: " + comment.author),
              $("<h4>").text("Subject: " + comment.subject),
              $("<h4>").text("Message: " + comment.message)
            );

          articleComments.append(commentDiv);
        });
        const button = $("<a>")
          .addClass("btn btn-success comment-button btn-block link-comment-form")
          .attr("href", "#form-div")
          .text("Post a comment");
        articleComments.append(button);
        article.append(articleComments);

        $("#display").append(article);
      });
    })
    .then(() => {
      // bring the viewer to the article they just made a post for once the page has been reloaded
      // console.log(window.location.href.slice(-25));
      const goToThisId = window.location.href.slice(-24);

      var elmnt = document.getElementById(goToThisId);
      elmnt.scrollIntoView();
    });
}

$(document).on("click", "article", function() {
  const form = $("#comment-form");
  form.empty();
  // console.log($(this).data('id'))
  console.log($(this).attr("id"));
  const articleId = $(this).attr("id");

  const heading = $("<h2>")
    .addClass("comment")
    .text(
      $(this)
        .children("h2")
        .text()
    );
  // console.log(heading);

  const id = $(this).data("id");
  console.log(id);

  const label1 = $("<h3>")
    .text("Author: ")
    .addClass("comment");
  const author = $("<input>")
    .attr("type", "text")
    .addClass("comment comment-author");

  const label2 = $("<h3>")
    .text("Subject: ")
    .addClass("comment");
  const subject = $("<input>")
    .attr("type", "text")
    .addClass("comment comment-subject");

  const label3 = $("<h3>")
    .text("Message: ")
    .addClass("comment");
  const message = $("<textarea>")
    .attr("rows", "4")
    .attr("cols", "50")
    .attr("type", "text")
    .addClass("comment comment-message");

  const button = $("<input>")
    .attr("type", "button")
    .addClass("comment comment-button")
    .val("Submit");
  //click event for button... cb will actually be a post request to /api/articles/:id
  button.on("click", function() {
    // console.log("hello world");
    const dataToSend = {
      author: $(this)
        .siblings(".comment-author")
        .val(),
      subject: $(this)
        .siblings(".comment-subject")
        .val(),
      message: $(this)
        .siblings(".comment-message")
        .val()
    };
    console.log(dataToSend);
    $.post("/api/articles/" + id, dataToSend, function(response) {
      console.log(response);
    })
      .then(function() {
        window.location.href = "/#" + articleId;
      })
      .then(function() {
        document.location.reload();
      });
  });

  form.append(
    heading,
    label1,
    author,
    label2,
    subject,
    label3,
    message,
    button
  );
});
