$(function(){
  var elements = {
    'award_bid_links' : $('tr.award_bid a')
  };
  
  var dimJobsForAnonymous = function() {
    if(!makerfactory.loggedIn) {
      $(':enabled').attr('disabled', 'disabled');
      $('div.page').addClass('dimmed');
      var notice = $('<div>').addClass('flash_notice yellow');
      notice.html('Hello, you need to <a href="/register">register</a> or <a href="/login">log in</a> before you post a job.');
      $('div#flash').append(notice);
    }
    
  };
  
  var dimBidFormForAnonymous = function() {
    if(!makerfactory.loggedIn) {
      $(':enabled').attr('disabled', 'disabled');
      $('form.new_bid').addClass('dimmed');
      $('div.bid_instructions').html('<p>Hello, you need to <a href="/register">register</a> or <a href="/login">log in</a> before you can bid on this job.</p>');
      $('div#flash').append(notice);
    }
  };
  
  var bidSuccess = function(data, textStatus) {
    var success_text = 'YES YOU DONE SUBMITTED A BID';
    $('div.callout div.content h3').html('BID SUCCESSFUL');
    $('div.callout div.content div.bid_instructions').html(success_text);
    $('div.callout div.content form').empty();
    console.log('bid success');
  };
  
  var bindXhrBidPost = function() {
    $('form.new_bid').submit(function(event){
      event.preventDefault();
      var formEl = $(this);
      var data = formEl.serialize();
      // better validate
      $.post(formEl.attr('action'), data, bidSuccess);

      $(':enabled').attr('disabled', 'disabled');
      $('form.new_bid').addClass('dimmed');
      $('form.new_bid').prepend('<img src="/images/spinner.gif" class="spinner">');
      // if there is some kind of error
      // #hide/disable form
      // #disable button
      // #show spinner

    });
    
  };
  
  var bindAwardBidButtons = function() {
    var handleXHRsuccess = function(button) {
      button.hide(200, 'swing');
      var awarded = button.replaceWith('awarded!');
      awarded.show();
    };
    
    var buttons = elements.award_bid_links;
    buttons.each(function(){
      button = $(this);
      button.click(function(){
        button.unbind();
        $.post(button.attr('data-bid-award'), null, function(){
          handleXHRsuccess(button);
        });
      });
    });
  }
  
  var bindTRLinks = function() {
    $('tr').each(function(){
      var href = $(this).attr('data-href');
      if(href) $(this).click(function(){
        location.href = href;
      });
    });
  };
  
  if($('form.job_form').length) {
    dimJobsForAnonymous();
  }
  if($('form.new_bid').length) {
    dimBidFormForAnonymous();
    bindXhrBidPost();
  }
  if($('table').length) {
    bindTRLinks();
  }
  if(elements.award_bid_links.length) {
    bindAwardBidButtons();
  }


  
  // old map stuff
  var map = new GMap2($("#map").get(0));
  map.addMapType({type:G_AERIAL_MAP});
  map.setMapType(G_AERIAL_MAP);
  var portlandOR = new GLatLng(45.51498682492308, -122.6799488067627);
  map.setCenter(portlandOR, 18);
});