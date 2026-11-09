(function(root){
 const validReason=value=>typeof value==='string'&&value.trim().length>0;
 function review(status,decision,reason){if(status!=='待审核')return{error:'商品已撤回或已被处理，不能重复审核。'};if(!['通过','驳回'].includes(decision))return{error:'无效审核决定。'};if(decision==='驳回'&&!validReason(reason))return{error:'请填写驳回原因，不能仅输入空格。'};return{status:decision==='通过'?'已发布':'草稿'};}
 function violation(productStatus,reservationStatus,reason){if(!validReason(reason))return{error:'请填写违规原因，不能仅输入空格。'};if(productStatus==='违规下架')return{error:'本次处置已完成，请勿重复提交。'};if(productStatus==='已完成')return{productStatus:'已完成',reservationStatus,hidden:true};return{productStatus:'违规下架',reservationStatus:['待卖家确认','已确认'].includes(reservationStatus)?'已终止':reservationStatus,hidden:true};}
 const api={validReason,review,violation};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AdminRules=api;
})(typeof window!=='undefined'?window:globalThis);
