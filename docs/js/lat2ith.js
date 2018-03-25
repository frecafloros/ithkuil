const segmentation = (t) =>{
  const morpheme;
  const reg = /[_\u00af\/\u02c7\u02d8\u02dc\^]{1}|[a\u00e2e\u00ea\u00ebi\u00eeo\u00f4\u00f6u\u00fb\u00fc\u00e1\u00e9\u00ed\u00f3\u00fa\u00e0\u00e8\u00ec\u00f2\u00f9\']{1,}|[bc\u010d\u00e7dfgh\u02b0jkl\u013cmnn\u030cpqrr\u030css\u030ct\u0163vwxyzz\u030c\u017c\'\-]{1,}/gi;
  morpheme = t.match(reg);
  for(let a of morpheme){
    if(a[0] === '\''){
      a = a.slice(1)
    }
  }
  return morpheme;
}

const meaning = () =>{
}
 
const characterize = () =>{
}

$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    const morpheme = segmentation(t);
    console.log(morpheme);
    meaning();
    characterize();
    $('#outith').text(t);
  });
});
