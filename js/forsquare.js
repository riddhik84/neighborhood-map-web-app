function showForsquareInfo(lat, lang, name){
  return new Promise (function(resolve, reject){
    $('#placeInfo').text("");
    //Checks venue info and finds its id
    $.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lang + '&name='+ name +
      '&intent=match&client_id=QAT51K41NI4IEPHSXHJV4EHRFP0T4NMJ34JP5C1ZJ43EN5DL' +
      '&client_secret=OOXSGNRFXJ04MXXJT00D12W4L4PWAL45VIOJNAUNBOBZ0J5G&v=20170801',
      function(data) {}).done(
      function(data) {
        id = data.response.venues[0].id;
        if (id.length !== 0){
          viewModel.venueName('Venue name: ');
          viewModel.venueNameText(data.response.venues[0].name);
          viewModel.venueAddress('Venue address: ');
          viewModel.venueAddressText(data.response.venues[0].location.formattedAddress);
          //Shows phone number if defined
          if (typeof data.response.venues[0].contact.formattedPhone != 'undefined'){
            viewModel.venuePhone('Venue phone number: ');
            viewModel.venuePhoneNumber(data.response.venues[0].contact.formattedPhone);
          }
         viewModel.finalText(info);
          resolve(id);
        }
      }
    ).fail(function() {
      alert ( "Cannot load venue information!" );
    });
  }).then( function (id) {
//Creates second request to retrieve image
    $.getJSON('https://api.foursquare.com/v2/venues/' + id + '/photos?&limit=1&client_id=QAT51K41NI4IEPHSXHJV4EHRFP0T4NMJ34JP5C1ZJ43EN5DL' +
      '&client_secret=OOXSGNRFXJ04MXXJT00D12W4L4PWAL45VIOJNAUNBOBZ0J5G&v=20170801',
      function (data) {})
      .done(function(data) {
      if(typeof data.response.photos.items[0] != 'undefined') {
        photoUrl = data.response.photos.items[0].prefix + 'original' + data.response.photos.items[0].suffix;
      } else {
        photoUrl = "";
      }
      if (typeof photoUrl !== 'undefined') {
        //Appends information on the venue to the document
        if (photoUrl.length > 0) {
          viewModel.venuePhoto ('Venue photo: ');
          viewModel.venuePhotoImg(photoUrl);
        } else {
          viewModel.venuePhoto ('Venue photo: No Forsquare photos for this location.');
          viewModel.venuePhotoImg("");
        }
      }
      return Promise.resolve(photoUrl);
    }).fail(function() {
      alert ( "Cannot load venue image!" );
    });
  });
}

