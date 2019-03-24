// === AutoScroll for when down arrow button is clicked === //

$("#scrollDownBtn").on('click', function () {
    // window.scrollTo('#articles');
    window.scrollTo({
        top: 725,
        behavior: 'smooth'
    });
});

// === Heart Click Updates the DB === //
//  === Combining save/unsave to one function that toggles classes for the heart === //
$('.heartBtn').on('click', function () { 

    // === grab the heart and toggle between classes === //
    $(this).toggleClass('far fas');

    // === store the unique data-id from each article into the _id variable === //
    const _id = $(this).attr('data-id');

    // === far means no save yet; this will save arts === //
    if ($(this).hasClass('far')) {
        console.log(_id);
        const saveArt = {
            _id: _id
        }
        $.ajax({
            method: 'PUT',
            url: '/api/saveArticle',
            data: saveArt
        }).then(function (resp) {
            console.log(resp);
        });
    }

   // === fas means already saved; this will unsave saved arts === //
    else if ($(this).hasClass('fas')) {
        console.log(_id);
        const unsaveArt = { _id: _id };
        $.ajax({
            method: 'PUT',
            url: '/api/unsaveArticle',
            data: unsaveArt
        }).then(function (resp) {
            console.log(resp);
        })
    }
});


// === Clear All Articles === //
$('.clearArts').on('click', function () {
    $.ajax({
        method: "DELETE",
        url: '/api/deleteAll'
    }).then(function (resp) {
        console.log(resp);
    })
    location.reload(true);
})

// === Note Functionality === //

// === Click on Note To Bring Up Article with Notes === //
$('.noteBtn').on('click', function () {
    const _id = $(this).attr('data-id');
    $.ajax({
        method: "GET",
        url: "/api/notes/" + _id
    }).then(function (resp) {
        console.log(resp);
        if (resp.note) {
            $('.notesDisplay').empty();
            resp.note.forEach(function (e) {
                $('.notesDisplay').append(`<li class='comment' data-id='${e._id}'>${e.body}</li>`)
            })
        }
        else {
            $('.notesDisplay').empty();
            $('.notesDisplay').append(`<h4>No Notes Yet</h4> <hr>`)
        }
    })
});

// === Click on Add Note to Add a Note === //
$('.addNoteBtn').on('click', function() {
    const _id = $(this).parents('.modal').attr("data-id");
    // const article = $(this).parents('.modal').data();
    const noteBody = $('#note-' + _id).val().trim();
    console.log(noteBody);
    const data = { body: noteBody };
    $.ajax({
        method: 'POST',
        url: "/api/notes/" + _id,
        data: data
    }).then(function(resp){
        console.log(resp);
        
    })
    $('.modal').modal('hide');
    $('#note-' + _id).val('');

});
