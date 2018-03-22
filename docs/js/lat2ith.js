const vowel = () =>{
}

const parse = (t) =>{
  for(let i=0; i<t.length; i++){
    //t.charAt(i);
    //が母音か子音かで
  }
}

const characterize = () => {
}

$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    parse(t);
    characterize();
    $('#outith').text(t);
  });
});
