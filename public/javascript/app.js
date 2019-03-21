// === AutoScroll for when down arrow button is clicked === //

$("#scrollDownBtn").click(function() {
    // window.scrollTo('#articles');
    window.scrollTo({
        top: 725,
        behavior: 'smooth'
    });
});

// === Heart Click Updates the DB === //

    // === Save articles === //
$('#heartBtn').on('click', function() {
    const id = $(this).parents('.media').data();
    const data = {
        _id: id
    }
    $.ajax({
        method: 'PUT',
        url: '/api/saveArticle',
        data: data
    }).then(function(doc) {
       console.log(doc);
    //    location.reload();
    });
});
