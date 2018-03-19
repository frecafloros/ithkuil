alert("hoge");

$(function(){
  $('#inlat').keyup(function(){
    var t = $(this).val();
    $('#outith').text(t);
  });
});
