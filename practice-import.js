/* Read-only parser for unverified browser-local training practice bundles.
 * No browser storage, network calls, or grade verification.
 */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.WMPracticeImport=api;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  var format='wm-training-practice-bundle-v1';
  var specs=[
    {id:'motor-controls',label:'Motor Controls',format:'wm-motor-practice-v1'},
    {id:'basic-wiring',label:'Basic Wiring',format:'wm-basic-practice-v1'}
  ];
  function object(value){return value!==null&&typeof value==='object'&&!Array.isArray(value)}
  function parseBundle(value){
    if(!object(value)||value.format!==format)throw new Error('Not a supported combined practice export.');
    if(value.source!=='browser-local'||value.verified!==false)throw new Error('Only unverified browser-local practice exports are supported.');
    if(typeof value.exportedAt!=='string'||!Number.isFinite(Date.parse(value.exportedAt)))throw new Error('Missing or invalid export date.');
    if(!object(value.trainers))throw new Error('Missing trainer records.');
    var trainers=specs.map(function(spec){
      var record=value.trainers[spec.id];
      if(!object(record)||record.format!==spec.format||!Array.isArray(record.attempts))throw new Error('Invalid '+spec.label+' records.');
      if(record.attempts.length>200)throw new Error(spec.label+' exceeds the 200-attempt export limit.');
      var passed=0,signatures=new Set();
      var attempts=record.attempts.map(function(a){
        if(!object(a)||(a.result!=='pass'&&a.result!=='fail'))throw new Error('Invalid '+spec.label+' attempt.');
        if(a.result==='pass')passed++;
        if(typeof a.signature==='string'&&a.signature.length)signatures.add(a.signature);
        return {
          result:a.result,
          at:typeof a.at==='string'&&Number.isFinite(Date.parse(a.at))?a.at:null,
          reason:typeof a.reason==='string'?a.reason.slice(0,120):'Not recorded'
        };
      });
      return {id:spec.id,label:spec.label,total:attempts.length,passed:passed,failed:attempts.length-passed,
        rate:attempts.length?Math.round(100*passed/attempts.length):null,
        unique:signatures.size,attempts:attempts.slice(-10).reverse()};
    });
    return {exportedAt:value.exportedAt,verified:false,source:'browser-local',trainers:trainers};
  }
  return {parseBundle:parseBundle};
});
