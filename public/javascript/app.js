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
    console.log(id);
    const changeArt = {
        _id: id
    }
    $.ajax({
        method: 'PUT',
        url: '/api/saveArticle',
        data: changeArt
    }).then(function(doc) {
       console.log(doc);
    //    location.reload();
    });
});
