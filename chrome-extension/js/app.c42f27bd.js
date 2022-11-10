(function(){"use strict";var e={866:function(e,n,t){var o=t(9242),r=t(365),i=t(2483);const s=[{path:"/",name:"Welcome",component:()=>Promise.resolve().then(t.bind(t,365))}];(0,i.p7)({history:(0,i.PO)("/"),routes:s});(0,o.ri)(r["default"]).mount("#app")},365:function(e,n,t){t.r(n),t.d(n,{default:function(){return D}});var o=t(3396);const r={key:0,class:"waiting-container"},i={class:"w1"},s=(0,o._)("h2",null,null,-1);function a(e,n,t,a,c,u){const l=(0,o.up)("UnderscoreComponent"),p=(0,o.up)("MeetComponent");return(0,o.wg)(),(0,o.iD)(o.HY,null,[c.isRecording?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("h1",null,[(0,o.Uk)("Meet Wingman - "),(0,o._)("span",i,[(0,o.Uk)("Waiting for some signal"),(0,o.Wm)(l)])]),s])),c.isRecording?((0,o.wg)(),(0,o.j4)(p,{key:1,captions:c.captions},null,8,["captions"])):(0,o.kq)("",!0)],64)}t(7658);var c=t(7139);const u={id:"meet"},l={style:{"margin-top":"-20px"}},p={id:"meet-cc",contenteditable:"true",autofocus:""},d={contenteditable:"false"},m={class:"time"},f={style:{"padding-left":"10px"}};function g(e,n,t,r,i,s){return(0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("h1",null,"Meeting in progress: "+(0,c.zw)(t.meetingName),1),(0,o._)("p",l,"Current time: "+(0,c.zw)(t.meetingTime),1),(0,o._)("div",p,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.captions,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,c.C_)([{odd:n%2===0},"speach"]),key:n},[(0,o._)("h2",d,[(0,o._)("span",m,(0,c.zw)(s.date(e.unix)),1),(0,o.Uk)(" "+(0,c.zw)(e.speaker),1)]),(0,o._)("div",f,(0,c.zw)(e.text),1)],2)))),128))])])}var h={name:"MeetComponent",components:{},data(){return{captionsComputed:{captions:[],textChanges:[{operations:[{index:0,initChar:0,endChar:12,operation:"remove"}]}]}}},props:{captions:Array,meetingName:String,meetingTime:String},methods:{date(e){return new Date(e).toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})},processText(e,n){return console.log(n),e}},mounted(){const e=this;let n=new MutationObserver((function(n){e.textChanges[0].operations.push({index:0,initChar:0,endChar:12,operation:"remove"}),console.log(n),console.log(e.textChanges[0].operations.length)}));n.observe(document.getElementById("meet-cc"),{subtree:!0,characterData:!0,characterDataOldValue:!0})},computed:{}},v=t(89);const b=(0,v.Z)(h,[["render",g],["__scopeId","data-v-e51b19b0"]]);var w=b;const y={key:0,class:"console-underscore",id:"console"};function x(e,n,t,r,i,s){return i.underscoreVisible?((0,o.wg)(),(0,o.iD)("span",y,"_")):(0,o.kq)("",!0)}var k={name:"UnderscoreComponent",props:{currentText:String},data(){return{underscoreVisible:!1}},methods:{startTextCursorInterval:function(){const e=this;setInterval((function(){e.underscoreVisible=!e.underscoreVisible}),500)}},mounted(){this.startTextCursorInterval()}};const C=(0,v.Z)(k,[["render",x],["__scopeId","data-v-d857eb64"]]);var _=C,O={name:"App",components:{UnderscoreComponent:_,MeetComponent:w},data(){return{isRecording:!0,captions:[]}},mounted(){},setup(){if("/example"===window.location.pathname)console.log("mock here");else{const e=chrome.runtime;chrome.storage.sync.get(["example"],(function(e){console.log("Value currently is "+e.key)})),e.onMessage.addListener((function(e,n,t){console.log("hello from: ",e,n),t({farewell:"byeee"})})),console.log("setup real data");const n=new BroadcastChannel("gmeet-messages");n.addEventListener("message",(e=>{console.log(e)}))}},processGmeetEvent(e){const n=new Date(e.date);if("speaker"===e.kind&&this.captions.push({speaker:e.name,time:n.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}),texts:[]}),"text"===e.kind){if(0===this.captions.length)return;if(null!=e.old){const n=this.captions[this.captions.length-1].texts.lastIndexOf(e.old);n>=0?this.captions[this.captions.length-1].texts[n]=e.new:this.captions[this.captions.length-1].texts.push(e.new)}else this.captions[this.captions.length-1].texts.push(e.new)}}};const T=(0,v.Z)(O,[["render",a]]);var D=T}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,i){if(!o){var s=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var a=!0,c=0;c<o.length;c++)(!1&i||s>=i)&&Object.keys(t.O).every((function(e){return t.O[e](o[c])}))?o.splice(c--,1):(a=!1,i<s&&(s=i));if(a){e.splice(l--,1);var u=r();void 0!==u&&(n=u)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,i,s=o[0],a=o[1],c=o[2],u=0;if(s.some((function(n){return 0!==e[n]}))){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(c)var l=c(t)}for(n&&n(o);u<s.length;u++)i=s[u],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(l)},o=self["webpackChunkmeet_copilot"]=self["webpackChunkmeet_copilot"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(866)}));o=t.O(o)})();
//# sourceMappingURL=app.c42f27bd.js.map