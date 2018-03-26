const segmentation = (t) =>{
  const reg = /[_\u203e\u00af\/\u02c7\u02d8\u02dc\^]{1}|[a\u00e2e\u00ea\u00ebi\u00eeo\u00f4\u00f6u\u00fb\u00fc\u00e1\u00e9\u00ed\u00f3\u00fa\u00e0\u00e8\u00ec\u00f2\u00f9\u2019']{1,}|[bc\u010d\u00e7dfgh\u02b0jkl\u013cmnn\u030cpqr\u0159s\u0161t\u0163vwxyz\u017e\u017c\u2019'\-]{1,}/gi;
  let seg = t.match(reg);

  // slot IV, VII, VIII, X, XIV以外非対応
  let morpheme = [t,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]; //origin, slot I-XV
  if(seg[0].match(/[_\u203e\u00af\/\u02c7\u02d8\u02dc\^]/)){
    morpheme[14] = seg[0];
    seg.shift();
  }
  /* そのうちstressの解析書く */
  if(seg.length >= 4){
    morpheme[4] = seg[0];
    seg.shift();
  }else{
    morpheme[4] = 'a';
  }
  morpheme[7] = seg[0];
  morpheme[8] = seg[1];
  morpheme[10] = seg[2];

  return morpheme;
}


const semantics = (morpheme) =>{
  // slot IV (Vr)
  const set_vr = (() =>{
    switch(morpheme[4]){
      case 'a' : return [1, 1, 'sta'];
      case 'i' : return [1, 1, 'dyn'];
      case 'ui': return [1, 1, 'mnf'];
      case 'oi': return [1, 1, 'dsc'];
      case 'e' : return [1, 2, 'sta'];
      case 'ai': return [1, 2, 'dyn'];
      case 'ü' :
      case 'ou': return [1, 2, 'mnf'];
      case 'eo': return [1, 2, 'dsc'];
      case 'u' : return [1, 3, 'sta'];
      case 'ei': return [1, 3, 'dyn'];
      case 'ëi': return [1, 3, 'mnf'];
      case 'eö': return [1, 3, 'dsc'];
      case 'o' : return [2, 1, 'sta'];
      case 'au': return [2, 1, 'dyn'];
      case 'ae': return [2, 1, 'mnf'];
      case 'oe': return [2, 1, 'dsc'];
      case 'ö' : return [2, 2, 'sta'];
      case 'eu': return [2, 2, 'dyn'];
      case 'ea': return [2, 2, 'mnf'];
      case 'öe': return [2, 2, 'dsc'];
      case 'î' :
      case 'û' : return [2, 3, 'sta'];
      case 'iu': return [2, 3, 'dyn'];
      case 'oa': return [2, 3, 'mnf'];
      case 'ëu': return [2, 3, 'dsc'];
      case 'â' : return [3, 1, 'sta'];
      case 'ia':
      case 'ua': return [3, 1, 'dyn'];
      case 'üa':
      case 'aì': return [3, 1, 'mnf'];
      case 'üo':
      case 'oì': return [3, 1, 'dsc'];
      case 'ê' : return [3, 2, 'sta'];
      case 'ie':
      case 'ue': return [3, 2, 'dyn'];
      case 'iù':
      case 'uì': return [3, 2, 'mnf'];
      case 'üe':
      case 'eì': return [3, 2, 'dsc'];
      case 'ô' : return [3, 3, 'sta'];
      case 'io':
      case 'uo': return [3, 3, 'dyn'];
      case 'iö':
      case 'uö': return [3, 3, 'mnf'];
      case 'üö':
      case 'aù': return [3, 3, 'dsc'];
      default  : return [1, 1, 'sta'];
    }
  })();
  const ps = [set_vr[0], set_vr[1]];
  const function_ = set_vr[2];

  // slot VII (Cr)
  const root = morpheme[7];

  // slot VIII (Vc)
  const case_ = (() =>{
    switch(morpheme[8]){
      case 'a': return 'obl';
      case 'u': return 'ind';
      case 'e': return 'abs';
      case 'o': return 'erg';
      case 'ö': return 'eff';
      case 'i': return 'aff';
      case 'ü':
      case 'a’e': return 'dat';
      case 'ai': return 'ins';
      case 'ei': return 'act';
      case 'ui': return 'der';
      case 'oi': return 'sit';//11
      case 'â': return 'pos';
      case 'î':
      case 'û': return 'prp';
      case 'ê': return 'gen';
      case 'ô': return 'att';
      case 'ëi': return 'pdc';
      case 'öi': return 'itp';
      case 'ae': return 'ogn';//18
      /* 続きはあとでかく */
      default : return 'obl';
    }
  })();

  // slot X (Ca)
  // バグの温床
  const set_ca = ['l','ll','tļ','ļ','ļļ','řļ','sk','šk','kţ',
                  'r','rr','lļ','rl','rļ','řļ','st','šk','kç',
                  'm','mm','lm','rm','mļ','řm','sp','šp','pţ',
                  'n','nn','ln','rn','nļ','řn','sq','šq','qţ',
                  't','ļt','lt','rt','nt','řt','ňt','ňd','çt',
                  'k','ļk','lk','rk','ňk','řk','kt','xt','çk',
                  'p','ļp','lp','rp','mp','řp','pt','ft','çp',
                  'q','ļq','lq','rq','ňq','řq','qt','xht','çq',
                  'ţ','ţţ','lţ','rţ','nţ','řţ','sţ','šţ','tf',
                  'x','xx','lx','rx','ňx','mx','sx','šx','kf',
                  'f','ff','lf','rf','mf','řf','sf','šf','pf',
                  'xh','xxh','lxh','rxh','ňxh','mxh','sxh','šxh','qf',
                  'c','cc','lc','rc','ns','řc','sc','fk','fq',
                  'ż','żż','lż','rż','nz','řż','ţf','ţs','ţc',
                  'č','čč','lč','rč','nš','řč','šč','ţk','ţq',
                  'j','jj','lj','rj','nž','řj','fţ','ţš','ţč',
                  's','ss','ls','rs','fs','řs','ňs','ms','mss',
                  'š','šš','lš','rš','fš','řš','ňš','mš','mšš',
                  'z','zz','lz','rz','vz','řz','ňz','mz','mzz',
                  'ž','žž','lž','rž','vž','řž','ňž','mž','mžž',
                  'd','dv','ld','rd','nd','řd','md','zd','žd',
                  'g','gv','lg','rg','ňg','řg','ňkf','zg','žg',
                  'b','bv','lb','rb','mb','řb','ntf','zb','žb',
                  'ň','ňň','ňç','rň','ňv','ř ň','ňf','řtf','řkf',
                  'dh','ddh','ldh','rdh','ndh','řdh','mdh','ţx','ţxh',
                  'ç','çç','lç','rç','nç','řç','mç','fx','fxh',
                  'v','vv','lv','rv','mv','řv','ndv','xf','xţ',
                  'ř','řř','rbv','rdv','rgv','řxh','mţ','xhf','xhţ',
                  'ck','čk','ps','ks','gd','psk','pšk','ksk','kšk',
                  'ct','čt','pš','kš','bd','pst','pšt','tx','txh',
                  'cp','čp','bz','gz','pç','ksp','kšp','px','pxh',
                  'cq','čq','bž','gž','řqf','kst','kšt','psq','pšq',
                  'mt','mt’','skh','sk’','mth','pst’','psth','pšt’','pšth',
                  'mk','mk’','sth','st’','mkh','kst’','ksth','kšt’','kšth',
                  'ňp','ňp’','sph','sp’','ňph','psk’','pskh','pšk’','pškh',
                  'mq','mq’','sqh','sq’','mqh','ksp’','ksph','kšp’','kšph',
                  'pk','pk’','škh','šk’','pkh','fk’','fkh','psq’','psqh',
                  'tk','tk’','šth','št’','tkh','ţk’','ţkh','ksk’','kskh',
                  'tp','tp’','šph','šp’','tph','ţp’','ţph','pšq’','pšqh',
                  'kp','kp’','šqh','šq’','kph','xp’','xph','kšk’','kškh',
                  'pq','pq’','fg','bg','pqh','vg','fp','fq’','fqh',
                  'tq','tq’','ţg','dg','tqh','dhg','vd','ţq’','ţqh',
                  'qp','qp’','xhp','xp','sch','sc’','ňqf','gb','kkç/kçç',
                  'pļ','tç','xhp’','ţp','ščh','šč’','vb','dhz','ppç/pçç',
                  'fst','fc’','fc','lfs','xc’','ţc’','ltf','fst’','fsth',
                  'fšt','fč’','fč','lfš','xč’','ţč’','lkf','fšt’','fšth',
                  'fsk','fch','rfs','fsq','xch','ţch','xhph','fsk’','fskh',
                  'fšk','fčh','rfš','fšq','xčh','ţčh','qph','fšk’','fškh',
                  't’','ļt’','lt’','rt’','nt’','řt’','ţsk’','kt’','ňt’',
                  'k’','ļk’','lk’','rk’','ňk’','řk’','ţšk’','ft’','xt’',
                  'p’','ļp’','lp’','rp’','mp’','řp’','fsq’','pt’','fp’',
                  'q’','ļq’','lq’','rq’','ňq’','řq’','fšq’','xht’','qt’',
                  'th','ļth','lth','rth','nth','řth','ţskh','kth','ňth',
                  'kh','ļkh','lkh','rkh','ňkh','řkh','ţškh','fth','xth',
                  'ph','ļph','lph','rph','mph','řph','fsqh','pth','fph',
                  'qh','ļqh','lqh','rqh','ňqh','řqh','fšqh','xhth','qth',
                  'c’','cc’','lc’','rc’','nc’','řc’','mc’','ňc’','çt’',
                  'č’','čč’','lč’','rč’','nč’','řč’','mč’','ňč’','çk’',
                  'ch','cch','lch','rch','nch','řch','mch','ňch','çp’',
                  'čh','ččh','lčh','rčh','nčh','čřh','mčh','ňčh','çq’',
                  'pps/pss','rps','lps','rbz','lbz','řps','řbz','ňss','çth',
                  'ppš/pšš','rpš','lpš','rbž','lbž','řpš','řbž','ňšš','çkh',
                  'kks/ kss','rks','lks','rgz','lgz','řks','řgz','ňzz','çph',
                  'kkš/kšš','rkš','lkš','rgž','lgž','řkš','řgž','ňžž','çqh',
                  'kc','lkç','lsk','rsk','nsk','řsk','msk','ňsk','ssk',
                  'żd','lţs','lst','rst','nst','řst','mst','ňst','sst',
                  'pc','bbz/bzz','lsp','rsp','nsp','řsp','msp','ňsp','ssp',
                  'qc','ggz/gzz','lsq','rsq','nsq','řsq','msq','ňsq','ssq',
                  'kč','rçç','lšk','ršk','nšk','řšk','mšk','ňšk','ššk',
                  'jd','lţš','lšt','ršt','nšt','řšt','mšt','ňšt','ššt',
                  'pč','bbž/bžž','lšp','ršp','nšp','řšp','mšp','ňšp','ššp',
                  'qč','ggž/gžž','lšq','ršq','nšq','řšq','mšq','ňšq','ššq',
                  'bdh','xpf','lvz','rvz','rbdh','řpţ','lpf','rpf','bzd',
                  'gdh','ňdh','lvž','rvž','rgdh','řkţ','lpç','rpç','bžd',
                  'ţt','dhd','ldhz','rţs','rqţ','řqţ','ňkç','řpf','gzd',
                  'db','ttç/tçç','ldhž','rţš','rkç','řkç','mpç','řpç','gžd',
                  'bż','rpss','lzb','rzb','nzb','řzb','mzb','řpss','gzb',
                  'gż','rkss','lžb','ržb','nžb','řžb','mžb','řkss','gžb',
                  'bj','rpšš','lzg','rzg','nzg','řzg','mzg','řpšš','bzg',
                  'gj','rkšš','lžg','ržg','nžg','řžg','mžg','řkšš','bžg',
                  'kc’','ck’','lsk’','rsk’','nsk’','řsk’','msk’','ňsk’','ssk’',
                  'żb','ct’','lst’','rst’','nst’','řst’','mst’','ňst’','sst’',
                  'pc’','cp’','lsp’','rsp’','nsp’','řsp’','msp’','ňsp’','ssp’',
                  'qc’','cq’','lsq’','rsq’','nsq’','řsq’','msq’','ňsq’','ssq’',
                  'kč’','čk’','lšk’','ršk’','nšk’','řšk’','mšk’','ňšk’','ššk’',
                  'jb','čt’','lšt’','ršt’','nšt’','řšt’','mšt’','ňšt’','ššt’',
                  'pč’','čp’','lšp’','ršp’','nšp’','řšp’','mšp’','ňšp’','ššp’',
                  'qč’','čq’','lšq’','ršq’','nšq’','řšq’','mšq’','ňšq’','ššq’',
                  'kch','ckh','lskh','rskh','nskh','řskh','mskh','ňskh','sskh',
                  'żg','cth','lsth','rsth','nsth','řsth','msth','ňsth','ssth',
                  'pch','cph','lsph','rsph','nsph','řsph','msph','ňsph','ssph',
                  'qch','cqh','lsqh','rsqh','nsqh','řsqh','msqh','ňsqh','ssqh',
                  'kčh','čkh','lškh','rškh','nškh','řškh','mškh','ňškh','šškh',
                  'jg','čth','lšth','ršth','nšth','řšth','mšth','ňšth','ššth',
                  'pčh','čph','lšph','ršph','nšph','řšph','mšph','ňšph','ššph',
                  'qčh','čqh','lšqh','ršqh','nšqh','řšqh','mšqh','ňšqh','ššqh',
                  'tt','tt’','tth','lpt’','rpt’','řpt’','lpth','rpth','řpth',
                  'kk','kk’','kkh','lkt’','rkt’','řkt’','lkth','rkth','řkth',
                  'pp','pp’','pph','lpk’','rpk’','řpk’','lpkh','rpkh','řpkh',
                  'qq','qq’','qqh','ltk’','rtk’','řtk’','ltkh','rtkh','řtkh',
                  'dd','nçw','pçw','lft’','rft’','řft’','lfth','rfth','řfth',
                  'gg','ňçw','kfw','lxt’','rxt’','řxt’','lxth','rxth','řxth',
                  'bb','mçw','pfw','lfk’','rfk’','řfk’','lfkh','rfkh','řfkh',
                  'cf','čf','qfw','lţk’','rţk’','řţk’','lţkh','rţkh','řţkh',
                  'ţw','dhw','lţw','rţw','mţw','řţw','nţw','ldhw','rdhw',
                  'xw','ňw','lxw','rxw','mxw','řxw','ňxw','lňw','rňw',
                  'fw','vw','lfw','rfw','ňfw','řfw','mfw','lvw','rvw',
                  'xhw','çw','lxhw','rxhw','mxhw','tçw','ňxhw','lçw','rçw',
                  'sw','cw','lsw','rsw','msw','řsw','nsw','ňsw','ssw',
                  'šw','čw','lšw','ršw','mšw','řšw','nšw','ňšw','ššw',
                  'zw','żw','lzw','rzw','mzw','řzw','nzw','ňzw','zzw',
                  'žw','jw','lžw','ržw','mžw','řžw','nžw','ňžw','žžw',
                  'tw','ttw','thw','t’w','tt’w','tthw','ltw','rtw','ntw',
                  'kw','kkw','khw','k’w','kk’w','kkhw','lkw','rkw','ňkw',
                  'pw','ppw','phw','p’w','pp’w','pphw','lpw','rpw','mpw',
                  'qw','qqw','qhw','q’w','qq’w','qqhw','lqw','rqw','ňqw',
                  'ty','tty','lty','ţy','nty','řty','rty','pty','tky',
                  'ky','kky','lky','ży','ňky','řky','rky','kty','kpy',
                  'py','ppy','lpy','fy','npy','řpy','rpy','tpy','pky',
                  'my','fty','ptw','mw','ftw','ptr','ftr','pkw','fkw',
                  'dw','ddw','ldw','tv','ndw','řdw','bdw','dgw','rdw',
                  'gw','ggw','lgw','kv','ňgw','řgw','gdw','gbw','rgw',
                  'bw','bbw','lbw','pv','mbw','řbw','dbw','bgw','rbw',
                  'lw','ly','ry','rw','ļw','řy','tļw','řw','lř',
                  'dy','ddy','ldy','dhy','ndy','řdy','rdy','bdy','dgy',
                  'gy','ggy','lgy','jy','ňgy','řgy','rgy','gdy','gby',
                  'by','bby','lby','vy','mby','řby','rby','dby','bgy',
                  'ny','xty','ktw','nw','xtw','ktr','xtr','tkw','ţkw',
                  'tl','ttl','ltl','rtl','ntl','řtl','mtl','ļtl','kçw',
                  'kl','kkl','lkl','rkl','ňkl','řkl','mkl','ļkl','c’w',
                  'pl','ppl','lpl','rpl','mpl','řpl','ňpl','ļpl','tfw',
                  'ql','qql','lql','rql','ňql','řql','mql','ļql','č’w',
                  'dl','ddl','ldl','rdl','ndl','řdl','bdl','dgl','vbl',
                  'gl','ggl','lgl','rgl','ňgl','řgl','gdl','gbl','vgl',
                  'bl','bbl','lbl','rbl','mbl','řbl','dbl','bgl','vdl',
                  'ml','mř','ňl','nl','ţř','fř','př','tř','lr',
                  'skl','ckl','ckw','skw','sskw','çkw','sk’w','ck’w','sskl',
                  'stl','ctl','ctw','stw','sstw','çtw','st’w','ct’w','sstl',
                  'spl','cpl','cpw','spw','sspw','çpw','sp’w','cp’w','sspl',
                  'sql','cql','cqw','sqw','ssqw','çqw','sq’w','cq’w','ssql',
                  'škl','čkl','čkw','škw','šškw','xxw','šk’w','čk’w','šškl',
                  'štl','čtl','čtw','štw','šštw','ţţw','št’w','čt’w','šštl',
                  'špl','čpl','čpw','špw','ššpw','ffw','šp’w','čp’w','ššpl',
                  'šql','čql','čqw','šqw','ššqw','xxhw','šq’w','čq’w','ššql',
                  'tr','ttr','ltr','rtr','ntr','řtr','mtr','ļtr','rtn',
                  'kr','kkr','lkr','rkr','ňkr','řkr','mkr','ļkr','rkn',
                  'pr','ppr','lpr','rpr','mpr','řpr','ňpr','ļpr','rpn',
                  'qr','qqr','lqr','rqr','ňqr','řqr','mqr','ļqr','rqn',
                  'dr','ddr','ldr','rdr','ndr','řdr','bdr','dgr','vbr',
                  'gr','ggr','lgr','rgr','ňgr','řgr','gdr','gbr','vgr',
                  'br','bbr','lbr','rbr','mbr','řbr','dbr','bgr','vdr',
                  'mr','nř','ňr','nr','dhř','vř','bř','dř','gř',
                  'skr','ckr','cky','sky','ssky','čhw','skhw','ckhw','sskr',
                  'str','ctr','cty','sty','ssty','chy','sthw','cthw','sstr',
                  'spr','cpr','cpy','spy','sspy','chw','sphw','cphw','sspr',
                  'sqr','cqr','c’y','cy','çr','čhy','sqhw','cqhw','ssqr',
                  'škr','čkr','čky','šky','ššky','ļkw','škhw','čkhw','šškr',
                  'štr','čtr','čty','šty','ššty','ļtw','šthw','čthw','šštr',
                  'špr','čpr','čpy','špy','ššpy','ļpw','šphw','čphw','ššpr',
                  'šqr','čqr','č’y','čy','çř','ļqw','šqhw','čqhw','ššqr',
                  'sl','ssl','lsl','rsl','msl','řsl','nsl','ňsl','ţst',
                  'šl','ššl','lšl','ršl','mšl','řšl','nšl','ňšl','ţšt',
                  'zl','zzl','lzl','rzl','mzl','řzl','nzl','ňzl','ţsp',
                  'žl','žžl','lžl','ržl','mžl','řžl','nžl','ňžl','ţšp',
                  'fl','ffl','lfl','rfl','mfl','řfl','fxl','ňfl','pxl',
                  'ţl','ţţl','lţl','rţl','nţl','řţl','ţxl','mţl','txl',
                  'xl','xxl','lxl','rxl','ňxl','řxl','xfl','mxl','xţl',
                  'xhl','xxhl','lxhl','rxhl','ňxhl','qtl','xhfl','mxhl','xhţl',
                  'vl','vvl','lvl','rvl','mvl','řvl','lpţ','lkţ','mpļ',
                  'dhl','ddhl','ldhl','rdhl','ndhl','řdhl','cl','čl','ntļ',
                  'sv','sř','ksw','sxw','lsř','rsř','fsw','řsř','bzw',
                  'zv','zř','psw','sxhw','lzř','rzř','sfw','řzř','gzw',
                  'sm','sy','cm','zm','żm','çm','bm','dm','gm',
                  'šm','šy','čm','žm','jm','ļm','vm','dhm','kř',
                  'sn','zy','cn','zn','żn','çn','bn','dn','gn',
                  'šn','žy','čn','žn','jn','ļn','vn','dhn','ňř',
                  'sr','ssr','lsr','rsr','msr','řsr','nsr','ňsr','ţsk',
                  'šr','ššr','lšr','ršr','mšr','řšr','nšr','ňšr','ţšk',
                  'zr','zzr','lzr','rzr','mzr','řzr','nzr','ňzr','ţsq',
                  'žr','žžr','lžr','ržr','mžr','řžr','nžr','ňžr','ţšq',
                  'fr','ffr','lfr','rfr','mfr','řfr','fxr','ňfr','pxr',
                  'ţr','ţţr','lţr','rţr','nţr','řţr','ţxr','mţr','txr',
                  'xr','xxr','lxr','rxr','ňxr','řxr','xfr','mxr','xţr',
                  'xhr','xxhr','lxhr','rxhr','ňxhr','qtr','xhfr','mxhr','xhţr',
                  'vr','vvr','lvr','rvr','mvr','řvr','rpţ','rkţ','mpř',
                  'dhr','ddhr','ldhr','rdhr','ndhr','řdhr','cr','čr','ntř',
                  'šv','šř','kšw','šxw','lšř','ršř','fšw','řšř','bžw',
                  'žv','žř','pšw','šxhw','lžř','ržř','šfw','řžř','gžw',
                  'tm','ţm','ţn','tn','rsm','rsn','sň','rsň','nm',
                  'km','xm','xn','kn','rzm','rzn','zň','rzň','ňm',
                  'pm','fm','fn','pn','ršm','ršn','šň','ršň','mn',
                  'qm','xhm','xhn','qn','ržm','ržn','žň','ržň','ňn'];
  const index_ca = (() =>{
    /* そのうち例外処理書く */
    for(let i=0; i<set_ca.length; i++){
      if(morpheme[10] === set_ca[i]){
        return i;
      }
    }
  })();
  const set_configuration = ['uni', 'dpx', 'dct', 'agg', 'seg', 'cpn', 'coh', 'cst', 'mlt'];
  const set_affiliation = ['csl', 'aso', 'var', 'coa'];
  const set_perspective = ['m', 'u', 'n', 'a'];
  const set_extension = ['del', 'prx', 'icp', 'trm', 'dpl', 'gra'];
  const configuration = set_configuration[index_ca%9];
  const affiliation = set_affiliation[(index_ca/9|0)%4];
  const perspective = set_perspective[(index_ca/36|0)%4];
  const extension = set_extension[(index_ca/144|0)%6];
  const essence = (index_ca < 864)? 'nrm': 'rpv';
  //console.log([configuration, affiliation, perspective, extension, essence]);

  // slot XIV (tone)
  const version = (() =>{
    switch(morpheme[14]){
      case '\u203e':
      case '\u00af': return 'cpt';//2
      case '\/'    : return 'ine';//3
      case '_'     : return 'inc';//4
      case '\^'    : return 'pst';//5
      case '\u02c7':
      case '\u02d8':
      case '\u02dc': return 'efc';//6
      default      : return 'prc';//1
    }
  })();

  return [case_, configuration, affiliation, perspective, extension, essence, ps, function_, root, version];
}


const characterize = () =>{
}


$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    const morpheme = segmentation(t);
    const meaning = semantics(morpheme);
    console.log(meaning);
    characterize();
    $('#outith').text(meaning);
  });
});
