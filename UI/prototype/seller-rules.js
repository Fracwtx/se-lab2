(function(root){
 'use strict';
 function validateProduct(data,submit){
  const errors={}, lengths={title:100,description:2000};
  const names={title:'标题',description:'描述',category:'分类',price:'价格',location:'交付地点'};
  for(const key of Object.keys(names))if(submit&&!String(data[key]??'').trim())errors[key]='请填写'+names[key];
  for(const [key,max]of Object.entries(lengths))if(Array.from(String(data[key]||'')).length>max)errors[key]=names[key]+'不能超过'+max+'字';
  const price=String(data.price??'').trim();
  if(price&&(!/^\d+(\.\d{1,2})?$/.test(price)||Number(price)<=0||Number(price)>100000))errors.price='价格须大于0且不超过100000元，最多两位小数';
  if(data.category&&!['数码电子','图书文具','生活用品','运动户外','其他'].includes(data.category))errors.category='请选择有效分类';
  const count=(data.images||[]).length;
  if(count>5||(submit&&count<1))errors.images='提交审核须上传1–5张图片';
  return errors;
 }
 function canHandle(status,now,deadline){return status==='待卖家确认'&&now<deadline;}
 const api={validateProduct,canHandle};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SellerRules=api;
})(typeof window!=='undefined'?window:globalThis);
