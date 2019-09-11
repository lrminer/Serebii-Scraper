$.get('/api/articles', data => {
    console.log(data);

    data.forEach(item => {
        const article = $('<article>');
        const heading = $('<h2>')
            .addClass('article-heading')
            .append(
                $('<a>')
                .addClass('article-link')
                .attr('href', 'https://www.serebii.net' + item.link)
                .text(item.heading));

        const date = $('<h3>')
            .addClass('article-date')
            .text(item.date);

        const image = $('<img>')
            .addClass('article-image')
            .attr('src', 'https://www.serebii.net' + item.image);

        const description = $('<p>')
                .addClass('article-description')
                .text(item.description);

        article.append(heading, date, image, description);
        $('#display').append(article);
    })

})