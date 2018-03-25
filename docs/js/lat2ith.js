const segmentation = (t) =>{
  const reg = /[_\u203e\u00af\/\u02c7\u02d8\u02dc\^]{1}|[a\u00e2e\u00ea\u00ebi\u00eeo\u00f4\u00f6u\u00fb\u00fc\u00e1\u00e9\u00ed\u00f3\u00fa\u00e0\u00e8\u00ec\u00f2\u00f9\u2019']{1,}|[bc\u010d\u00e7dfgh\u02b0jkl\u013cmnn\u030cpqr\u0159s\u0161t\u0163vwxyz\u017e\u017c\u2019'\-]{1,}/gi;
  let seg = t.match(reg);

  // slot IV, VII, VIII, X, XIV以外非対応
  let morpheme = [t,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]; //origin, slot I-XV
  if(seg[0].match(/[_\u203e\u00af\/\u02c7\u02d8\u02dc\^]/)){
    morpheme[14] = seg[0];
    seg.shift();
  }
  if(seg.length >= 4){
    morpheme[4] = seg[0];
    seg.shift();
  }
  morpheme[7] = seg[0];
  morpheme[8] = seg[1];
  morpheme[10] = seg[2];

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
    meaning();
    characterize();
    $('#outith').text(t);
  });
});
