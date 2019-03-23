// === AutoScroll for when down arrow button is clicked === //

$("#scrollDownBtn").click(function () {
    // window.scrollTo('#articles');
    window.scrollTo({
        top: 725,
        behavior: 'smooth'
    });
});

// === Heart Click Updates the DB === //

// === Save articles === //
// $('.heartBtn').on('click', function () {
//     const id = $(this).attr('data-id');
//     console.log(id);
//     const saveArt = {
//         _id: id,
//     }
//     $.ajax({
//         method: 'PUT',
//         url: '/api/saveArticle',
//         data: saveArt
//     }).then(function (resp) {
//         console.log(resp);
//         // location.reload();
//     });
// });

//  === Combining save/unsave to one function that toggles classes for the heart === //
$('.heartBtn').on('click', function () {

    // === grab the heart and toggle between classes === //
    $(this).toggleClass('fas far');

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
            // location.reload();
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
            // location.reload();
        })
    }
})

// === Clear All Articles === //
$('.clearArts').on('click', function(){
    $.ajax({
        method: "DELETE",
        url: '/api/deleteAll'
    }).then(function(resp){
        console.log(resp);
    })
    location.reload(true);
})

// === Note Functionality === //

    // === Add Note === //

