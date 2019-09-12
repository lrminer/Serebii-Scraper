$.get("/api/articles", data => {
  console.log(data);
  data.forEach(item => {
    console.log(item._id);
    const article = $("<article>").data("id", item._id);
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
    item.comments.forEach(comment => {
      const commentDiv = $("<div>")
        .addClass('comment-div')
        .append(
          $("<h4>").text("Author: " + comment.author),
          $("<h4>").text("Subject: " + comment.subject),
          $("<h4>").text("Message: " + comment.message)
        );
      article.append(commentDiv);
    });

    const button = $("<button>")
      .addClass("btn btn-primary")
      .append(
        $("<a>")
          .text("Post a comment")
          .attr("href", "#form-div")
      );

    article.append(button);
    $("#display").append(article);
  });
});

$(document).on("click", "article", function() {
  const form = $("#comment-form");
  form.empty();
  // console.log($(this).data('id'))

  const heading = $("<h2>").text(
    $(this)
      .children("h2")
      .text()
  );
  // console.log(heading);

  const id = $(this).data("id");
  console.log(id);

  const label1 = $("<h3>").text("Author");
  const author = $("<input>")
    .attr("type", "text")
    .addClass("comment-author");

  const label2 = $("<h3>").text("Subject");
  const subject = $("<input>")
    .attr("type", "text")
    .addClass("comment-subject");

  const label3 = $("<h3>").text("Message");
  const message = $("<input>")
    .attr("type", "text")
    .addClass("comment-message");

  const button = $("<input>")
    .attr("type", "button")
    .addClass("comment-button")
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
