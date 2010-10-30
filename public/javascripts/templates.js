makerFactory.templates = {
  infoWindow : '<div class="popup">{{#has_img}}<img src="{{img_url}}">{{/has_img}}' +
    '<a href="{{href}}">{{title}}</a><br>' +
    '<span>LOCATION:</span> {{location}}<br>' +
    '<span>QUANTITY:</span> {{quantity}}</div>',

  bidErrors : '<div class="errorExplanation">' +
      '<p>DANG IT:</p>' +
      '<ul>' +
        '{{#errors}}<li>' +
          '{{text}}' +
        '</li>{{/errors}}' +
      '</ul>' +
    '</div>'
};
