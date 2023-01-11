import{path as n,prop as e,compose as r,head as t,find as o,propEq as s,join as i,pluck as a,filter as d,reduce as u,sortBy as c,reject as g,map as h,append as l}from"ramda";function p(){return p=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n},p.apply(this,arguments)}async function f(e){let r=!0,t=[],o="";for(;r;){const i=await(s={query:e.query,variables:p({},e.variables,{cursor:o})},fetch("https://arweave.net/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then(n=>n.ok?n.json():Promise.reject(n)).then(n=>{if(n.data.errors)throw new Error(JSON.stringify(n.data.errors,null,2));return n}).then(n(["data","transactions"])));i.edges&&i.edges.length&&(t=t.concat(i.edges),o=i.edges[i.edges.length-1].cursor),r=i.pageInfo.hasNextPage}var s;return t}async function y(n){return function(n){return function(n){return Promise.resolve({query:"query ($ids: [ID!], $cursor: String) {\n      transactions(first: 1, after: $cursor, \n        ids: $ids) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            id\n            tags {\n              name\n              value\n            }\n          }\n        }\n      }\n    }",variables:{ids:[n]}})}(n).then(f).then(r(e("node"),t)).then(v)}(n).then(e("groupId")).then(b).then(I)}function v(n){const t=r(e("value"),e=>o(s("name",e),n.tags)),u=t("Published")?Number(t("Published")):Date.now(),c=i(", ",a("value",d(n=>/^Topic:/.test(n.name),n.tags)));return{id:n.id,type:t("Type"),title:t("Title"),description:t("Description"),metaId:t("META"),groupId:t("Group-Id"),forks:t("Forks"),published:u,stamps:0,topics:c}}function I(n){function t(n,e){return n&&n.length>0?(n.forEach(n=>{n.children=n.id===e.forks?l({id:e.id,group:e.groupId,node:e,children:[]},n.children):t(n.children,e)}),n):[]}return r(u(function(n,e){return""===e.forks?(n.id=e.id,n.group=e.groupId,n.node=e,n.children=[]):n.children=n.id===e.forks?l({id:e.id,group:e.groupId,node:e,children:[]},n.children):t(n.children,e),n},{}),c(e("published")),g(s("forks",void 0)))(n)}function b(n){return f({query:'query ($groupIds: [String!]!, $cursor: String) {\n      transactions(first: 100, after: $cursor, tags: [\n        { name: "Group-Id", values: $groupIds }\n       ]) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            id \n            tags {\n              name\n              value\n            }\n          }\n        }\n      }\n    }',variables:{groupIds:[n]}}).then(h(r(v,e("node"))))}export{y as default};
//# sourceMappingURL=index.modern.mjs.map
