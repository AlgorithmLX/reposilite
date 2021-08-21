var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,a=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,s=(e,s)=>{for(var r in s||(s={}))n.call(s,r)&&a(e,r,s[r]);if(t)for(var r of t(s))o.call(s,r)&&a(e,r,s[r]);return e};import{r,d as l,u as i,o as d,a as c,b as u,c as p,e as m,n as g,f,g as b,h as v,p as h,i as y,E as w,S as k,j as I,k as x,w as T,l as E,v as L,m as S,Q as P,t as _,q as O,s as M,x as R,y as V,F as $,z as j,A as C,B as D,C as B,D as A,G as H,H as U,V as G,T as z}from"./vendor.7aa14e7c.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const N=r({isDark:!1});function q(){return{theme:N,fetchTheme:()=>{N.isDark="true"===localStorage.getItem("dark-theme")},toggleTheme:()=>{N.isDark=!N.isDark,localStorage.setItem("dark-theme",N.isDark)}}}const W=r({alias:"",token:""});function K(){const e=(e,t)=>{localStorage.setItem("alias",e),W.alias=e,localStorage.setItem("token",t),W.token=t};return{session:W,login:e,logout:()=>{e("","")},fetchSession:()=>{e(localStorage.getItem("alias"),localStorage.getItem("token"))},isLogged:()=>""!=W.alias}}const F=l({setup(){i({title:window.REPOSILITE_TITLE,description:window.REPOSILITE_DESCRIPTION});const{theme:e,fetchTheme:t}=q(),{fetchSession:n}=K();return d((()=>{t(),n()})),{theme:e}}});F.render=function(e,t,n,o,a,s){const r=c("router-view");return u(),p("div",{class:g({dark:e.theme.isDark})},[m(r,{class:"min-h-screen dark:bg-black dark:text-white"})],2)};const Y={},J={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Q=[f("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1)];Y.render=function(e,t){return u(),p("svg",J,Q)};const X={components:{GlobeIcon:Y}},Z={class:"bg-gray-100 dark:bg-black"},ee={class:"container mx-auto flex flex-row"},te=f("div",{class:"w-35"},[f("img",{class:"border-2 rounded-full dark:border-gray-700",src:"https://avatars.githubusercontent.com/u/75123628?s=200&v=4"})],-1),ne={class:"flex flex-col justify-center px-10"},oe=f("div",null,[f("p",null,"Public Maven repository for Bookkity organization")],-1),ae={class:"flex flex-row py-2"},se=f("a",{class:"px-3 text-gray-500",href:"https://github.com/bookkity"},"https://github.com/bookkity",-1);X.render=function(e,t,n,o,a,s){const r=c("GlobeIcon");return u(),p("div",Z,[f("div",ee,[te,f("div",ne,[oe,f("div",ae,[m(r),se])])])])};const re={},le={class:"mx-2 py-1.5 rounded-full bg-white dark:bg-gray-900 font-bold px-6 text-sm cursor-pointer"};re.render=function(e,t){return u(),p("div",le,[b(e.$slots,"default")])};function ie(e,t){const n=(e,t)=>({auth:{username:e,password:t}}),o=(o,a)=>(a=a||(e&&t?n(e,t):{}),console.log(a),v.get(Vue.prototype.$reposilite.basePath+o,s({},a)));return{client:{auth:{me:(e,t)=>o("/auth/me",n(e,t))},maven:{details:e=>o("/api/maven/details/"+(e||""))}}}}const de={inheritAttrs:!1,components:{VueFinalModal:w,ModalsContainer:k},setup(){const e=I(),{login:t}=K(),{client:n}=ie(),o=x(!1);return{alias:x(""),token:x(""),close:()=>o.value=!1,showLogin:o,signin:(o,a)=>{n.auth.me(o,a).then((e=>P(`Dashboard accessed as ${o}`,{position:"bottom-right"}))).then((e=>t(o,a))).then((t=>e.go("/"))).catch((e=>P(`${e.response.status}: ${e.response.data}`,{type:"danger"})))}}}};h("data-v-52e41180");const ce={class:"relative border bg-white dark:bg-gray-900 border-gray-100 dark:border-black m-w-20 py-5 px-10 rounded-2xl shadow-xl text-center"},ue=f("p",{class:"font-bold text-xl pb-4"},"Login",-1),pe={class:"flex flex-col w-96"},me={class:"text-right mt-1"};y(),de.render=function(e,t,n,o,a,s){const r=c("vue-final-modal");return u(),p("div",null,[m(r,S({modelValue:o.showLogin,"onUpdate:modelValue":t[5]||(t[5]=e=>o.showLogin=e)},e.$attrs,{classes:"flex justify-center items-center"}),{default:T((()=>[f("div",ce,[ue,f("form",pe,[E(f("input",{placeholder:"Alias","onUpdate:modelValue":t[0]||(t[0]=e=>o.alias=e),type:"text",class:"input"},null,512),[[L,o.alias]]),E(f("input",{placeholder:"Token","onUpdate:modelValue":t[1]||(t[1]=e=>o.token=e),type:"password",class:"input"},null,512),[[L,o.token]]),f("div",me,[f("button",{onClick:t[2]||(t[2]=e=>o.close()),class:"text-blue-400 text-xs"},"← Back to index")]),f("div",{class:"bg-gray-100 dark:bg-gray-800 py-2 my-3 rounded-md cursor-pointer",onClick:t[3]||(t[3]=e=>o.signin(o.alias,o.token))},"Sign in")]),f("button",{class:"absolute top-0 right-0 mt-5 mr-5",onClick:t[4]||(t[4]=e=>o.close())},"🗙")])])),_:1},16,["modelValue"]),f("div",{onClick:t[6]||(t[6]=e=>o.showLogin=!0)},[b(e.$slots,"button",{},void 0,!0)])])},de.__scopeId="data-v-52e41180";const ge={},fe={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},be=[f("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"},null,-1)];ge.render=function(e,t){return u(),p("svg",fe,be)};const ve={},he={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},ye=[f("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"},null,-1)];ve.render=function(e,t){return u(),p("svg",he,ye)};const we={components:{MenuButton:re,LoginModal:de,MoonIcon:ge,SunIcon:ve},setup(){const e=I(),{session:t,isLogged:n,logout:o}=K(),{theme:a,toggleTheme:s}=q();return{title:x(window.REPOSILITE_TITLE),theme:a,toggleTheme:s,isLogged:n,signout:()=>{o(),e.go("/")},session:t}}},ke={class:"flex flex-row"},Ie={key:0,class:"pt-1.1 px-2"},xe=R(" Welcome "),Te={class:"font-bold underline"},Ee=R(" Sign in "),Le=R(" Logout ");we.render=function(e,t,n,o,a,s){const r=c("MenuButton"),l=c("LoginModal"),i=c("SunIcon"),d=c("MoonIcon");return u(),p("nav",ke,[o.isLogged()?(u(),p("div",Ie,[xe,f("span",Te,_(o.session.alias),1)])):O("",!0),m(l,null,{button:T((()=>[o.isLogged()?O("",!0):(u(),M(r,{key:0},{default:T((()=>[Ee])),_:1}))])),_:1}),o.isLogged()?(u(),M(r,{key:1,onClick:t[0]||(t[0]=e=>o.signout())},{default:T((()=>[Le])),_:1})):O("",!0),f("div",{class:"pl-2 pt-1.3 cursor-pointer rounded-full bg-white dark:bg-gray-900",onClick:t[1]||(t[1]=e=>o.toggleTheme())},[o.theme.isDark?(u(),M(i,{key:0,class:"mr-1.9"})):(u(),M(d,{key:1,class:"mr-1.5"}))])])};const Se={components:{Hero:X,Menu:we},setup:()=>({title:window.REPOSILITE_TITLE})},Pe={class:"bg-gray-100 dark:bg-black dark:text-white"},_e={class:"container mx-auto flex flex-row py-10 justify-between"},Oe={class:"text-xl font-medium py-1"};Se.render=function(e,t,n,o,a,s){const r=c("router-link"),l=c("Menu"),i=c("Hero");return u(),p("header",Pe,[f("div",_e,[f("h1",Oe,[m(r,{to:"/"},{default:T((()=>[R(_(o.title),1)])),_:1})]),m(l,{class:"mt-0.5"})]),m(i,{class:"pt-2 pb-11"})])};const Me=[{name:"Maven",value:"\n<dependency>\n    <groupId>{groupId}</groupId>\n    <artifactId>{artifactId}</artifactId>\n    <version>{version}</version>\n</dependency>"},{name:"Gradle Groovy",value:'implementation "{groupId}:{artifactId}:{version}"'},{name:"Gradle Kotlin",value:'implementation("{groupId}:{artifactId}:{version}")'},{name:"SBT",value:'"{groupId}" %% "{artifactId}" %% "{version}"'}],Re={setup(){const e=r({selectedTab:Me[0].name});return s({tabs:Me},V(e))}},Ve={class:"bg-white dark:bg-gray-900 shadow-lg p-7 dark:border-4 rounded-xl border-gray-100 dark:border-black"},$e=f("div",{class:"flex flex-row justify-between"},[f("h1",{class:"font-bold"},"Artifact details")],-1),je=f("hr",{class:"dark:border-gray-800"},null,-1),Ce={class:"mt-6 p-4 mr-1 rounded-lg bg-gray-100 dark:bg-gray-900"},De={class:"text-sm max-w-21"};Re.render=function(e,t,n,o,a,s){const r=c("tab"),l=c("tabs"),i=c("tab-panel"),d=c("tab-panels");return u(),p("div",Ve,[$e,m(l,{modelValue:e.selectedTab,"onUpdate:modelValue":t[0]||(t[0]=t=>e.selectedTab=t),class:"pt-3"},{default:T((()=>[(u(!0),p($,null,j(o.tabs,((e,t)=>(u(),M(r,{class:"buildtool py-1 px-2 cursor-pointer",key:`t${t}`,val:e.name,label:e.name,indicator:!0},null,8,["val","label"])))),128))])),_:1},8,["modelValue"]),je,m(d,{modelValue:e.selectedTab,"onUpdate:modelValue":t[1]||(t[1]=t=>e.selectedTab=t),animate:!0},{default:T((()=>[(u(!0),p($,null,j(o.tabs,((e,t)=>(u(),M(i,{key:`tp${t}`,val:e.name},{default:T((()=>[f("div",Ce,[f("pre",De,_(e.value.trim()),1)])])),_:2},1032,["val"])))),128))])),_:1},8,["modelValue"])])};const Be={components:{Card:Re},setup(){const e=C(),{session:t}=K(),{client:n}=ie(t.alias,t.token),o=x("xyz"),a=x([]);return D((()=>e.params.qualifier),(async e=>{var t;o.value=((t=`/${e}`).endsWith("/")?t.slice(0,-1):t).split("/").slice(0,-1).join("/")||"/",n.maven.details(e).then((e=>a.value=e.data.files)).catch((e=>console.log(e)))}),{immediate:!0}),{parentPath:o,files:a}}},Ae={class:"bg-gray-100"},He={class:"bg-gray-100 dark:bg-black"},Ue={class:"container mx-auto"},Ge={class:"pt-7 pb-3 pl-2 font-semibold"},ze=f("span",{class:"font-normal text-xl text-gray-500"}," ⤴ ",-1),Ne={class:"dark:bg-black"},qe={class:"container mx-auto relative"},We={class:"lg:absolute pt-5 -top-5 right-8"},Ke={class:"pt-4"},Fe={class:"flex flex-row mb-1.5 py-3 rounded-full bg-white dark:bg-gray-900 xl:max-w-1/2 cursor-pointer"},Ye={key:0,class:"text-xm px-6 pt-1.75"},Je={key:1,class:"text-xm px-6 pt-1.75"},Qe={class:"font-semibold"};Be.render=function(e,t,n,o,a,s){const r=c("router-link"),l=c("Card");return u(),p("div",Ae,[f("div",He,[f("div",Ue,[f("p",Ge,[R(" Index of "+_(e.$route.path)+" ",1),m(r,{to:o.parentPath},{default:T((()=>[ze])),_:1},8,["to"])])])]),f("div",Ne,[f("div",qe,[f("div",We,[m(l)]),f("div",Ke,[(u(!0),p($,null,j(o.files,(t=>(u(),M(r,{key:t,to:e.append(e.$route.path,t.name)},{default:T((()=>[f("div",Fe,["DIRECTORY"==t.type?(u(),p("div",Ye,"⚫")):(u(),p("div",Je,"⚪")),f("div",Qe,_(t.name),1)])])),_:2},1032,["to"])))),128))])])])])};const Xe={components:{Hero:X,Browser:Be}};Xe.render=function(e,t,n,o,a,s){const r=c("Browser");return u(),M(r,{ref:""},null,512)};const Ze={setup:()=>({configurations:[{type:"Maven",snippet:`\n        <repository>\n            <name>${window.REPOSILITE_TITLE}</name>\n            <id>${window.REPOSILITE_ID}</id>\n            <url>${window.location}</url>\n        </repository>\n        `},{type:"Gradle Groovy",snippet:`\n        maven {\n            url "${window.location}"\n        }\n        `},{type:"Gradle Kotlin",snippet:`\n        maven {\n            url = uri("${window.location}")\n        }\n        `},{type:"SBT",snippet:`\n        resolvers += "${window.REPOSILITE_TITLE}" at "${window.location}"\n        `}],trim:e=>{const t=e.length-e.trimStart().length-1;return e.split("\n").map((e=>e.substring(t))).join("\n").trim()}})},et={class:"container mx-auto pt-10 pb-6 px-6"},tt={class:"text-lg font-bold"},nt={class:"my-4 py-4 px-6 rounded-lg shadow-md text-sm bg-gray-50 dark:bg-gray-900 justify-items-center"};Ze.render=function(e,t,n,o,a,s){return u(),p("div",et,[(u(!0),p($,null,j(o.configurations,(e=>(u(),p("div",{key:e.type,class:"px-7"},[f("h1",tt,_(e.type),1),f("pre",nt,_(o.trim(e.snippet)),1)])))),128))])};const ot={},at={class:"container mx-auto pt-10 px-6"},st=[f("i",null,"Endpoints :: soon™",-1)];ot.render=function(e,t){return u(),p("div",at,st)};const rt={components:{Header:Se,Overview:Xe,Usage:Ze,Endpoints:ot},setup(){const e=["Overview","Usage","Endpoints"],t=r({selectedMenuTab:e[0]});return s({menuTabs:e},V(t))}};h("data-v-7be34a3d");const lt={class:"bg-gray-100 dark:bg-black"},it={class:"container mx-auto"},dt=f("hr",{class:"dark:border-gray-700"},null,-1),ct={class:"overflow-auto"};y(),rt.render=function(e,t,n,o,a,s){const r=c("Header"),l=c("tab"),i=c("tabs"),d=c("Overview"),g=c("tab-panel"),b=c("Usage"),v=c("Endpoints"),h=c("tab-panels");return u(),p("div",null,[m(r),f("div",lt,[f("div",it,[m(i,{modelValue:e.selectedMenuTab,"onUpdate:modelValue":t[0]||(t[0]=t=>e.selectedMenuTab=t)},{default:T((()=>[(u(!0),p($,null,j(o.menuTabs,((e,t)=>(u(),M(l,{class:"item font-normal",key:`menu${t}`,val:e,label:e,indicator:!0},null,8,["val","label"])))),128))])),_:1},8,["modelValue"])]),dt,f("div",ct,[m(h,{modelValue:e.selectedMenuTab,"onUpdate:modelValue":t[1]||(t[1]=t=>e.selectedMenuTab=t),animate:!0},{default:T((()=>[m(g,{val:"Overview"},{default:T((()=>[m(d)])),_:1}),m(g,{val:"Usage"},{default:T((()=>[m(b)])),_:1}),m(g,{val:"Endpoints"},{default:T((()=>[m(v)])),_:1})])),_:1},8,["modelValue"])])])])},rt.__scopeId="data-v-7be34a3d";const ut=B({history:A(),routes:[{path:"/:qualifier(.*)",name:"Index",component:rt}]}),pt=!"{{REPOSILITE.BASE_PATH}}".includes("REPOSILITE.BASE_PATH");window.REPOSILITE_BASE_PATH=pt?"{{REPOSILITE.BASE_PATH}}":"/",window.REPOSILITE_ID=pt?"{{REPOSILITE.ID}}":"reposilite-repository",window.REPOSILITE_TITLE=pt?"{{REPOSILITE.TITLE}}":"Reposilite Repository",window.REPOSILITE_DESCRIPTION=pt?"{{REPOSILITE.DESCRIPTION}}":"Default description";const mt=H(F);mt.config.globalProperties.append=(e,t)=>e+(e.endsWith("/")?"":"/")+t,mt.config.globalProperties.drop=e=>(e.endsWith("/")?e.slice(0,-1):e).split("/").slice(0,-1).join("/"),mt.use(U()).use(G,v).use(z).use(ut).mount("#app");
