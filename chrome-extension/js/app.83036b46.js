(function(){"use strict";var e={866:function(e,t,n){var o=n(9242),r=n(840),i=n(2483);const s=[{path:"/",name:"Welcome",component:()=>Promise.resolve().then(n.bind(n,840))}];(0,i.p7)({history:(0,i.PO)("/"),routes:s});(0,o.ri)(r["default"]).mount("#app")},840:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var o=n(3396);const r={key:0,class:"waiting-container"},i={class:"w1"},s=(0,o._)("h2",null,null,-1);function a(e,t,n,a,c,u){const l=(0,o.up)("UnderscoreComponent"),p=(0,o.up)("MeetComponent");return(0,o.wg)(),(0,o.iD)(o.HY,null,[c.isRecording?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("h1",null,[(0,o.Uk)("Meet Wingman - "),(0,o._)("span",i,[(0,o.Uk)("Waiting for some signal"),(0,o.Wm)(l)])]),s])),c.isRecording?((0,o.wg)(),(0,o.j4)(p,{key:1,captions:c.captions},null,8,["captions"])):(0,o.kq)("",!0)],64)}n(7658);var c=n(7139);const u={id:"meet"},l={style:{"margin-top":"-20px"}},p={id:"meet-cc",contenteditable:"true",autofocus:""},d={contenteditable:"false"},m={class:"time"},f={style:{"padding-left":"10px"}};function g(e,t,n,r,i,s){return(0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("h1",null,"Meeting in progress: "+(0,c.zw)(n.meetingName),1),(0,o._)("p",l,"Current time: "+(0,c.zw)(n.meetingTime),1),(0,o._)("div",p,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.captions,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,c.C_)([{odd:t%2===0},"speach"]),key:t},[(0,o._)("h2",d,[(0,o._)("span",m,(0,c.zw)(s.date(e.unix)),1),(0,o.Uk)(" "+(0,c.zw)(e.speaker),1)]),(0,o._)("div",f,(0,c.zw)(e.text),1)],2)))),128))])])}var h={name:"MeetComponent",components:{},data(){return{captionsComputed:{captions:[],textChanges:[{operations:[{index:0,initChar:0,endChar:12,operation:"remove"}]}]}}},props:{captions:Array,meetingName:String,meetingTime:String},methods:{date(e){return new Date(e).toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})},processText(e,t){return console.log(t),e}},mounted(){const e=this;let t=new MutationObserver((function(t){e.textChanges[0].operations.push({index:0,initChar:0,endChar:12,operation:"remove"}),console.log(t),console.log(e.textChanges[0].operations.length)}));t.observe(document.getElementById("meet-cc"),{subtree:!0,characterData:!0,characterDataOldValue:!0})},computed:{}},v=n(89);const b=(0,v.Z)(h,[["render",g],["__scopeId","data-v-e51b19b0"]]);var w=b;const x={key:0,class:"console-underscore",id:"console"};function y(e,t,n,r,i,s){return i.underscoreVisible?((0,o.wg)(),(0,o.iD)("span",x,"_")):(0,o.kq)("",!0)}var k={name:"UnderscoreComponent",props:{currentText:String},data(){return{underscoreVisible:!1}},methods:{startTextCursorInterval:function(){const e=this;setInterval((function(){e.underscoreVisible=!e.underscoreVisible}),500)}},mounted(){this.startTextCursorInterval()}};const C=(0,v.Z)(k,[["render",y],["__scopeId","data-v-d857eb64"]]);var _=C,O={name:"App",components:{UnderscoreComponent:_,MeetComponent:w},data(){return{isRecording:!0,captions:[]}},mounted(){},setup(){if("/example"===window.location.pathname)console.log("mock here");else{const e=chrome.runtime,t=chrome.storage;t.local.get(["example"],(function(e){console.log("Value currently is "+e.key)})),e.onMessage.addListener((function(e,t,n){console.log("hello from: ",e,t),n({farewell:"byeee"})})),console.log("setup real data");const n=new BroadcastChannel("gmeet-messages");n.addEventListener("message",(e=>{console.log(e)}))}},processGmeetEvent(e){const t=new Date(e.date);if("speaker"===e.kind&&this.captions.push({speaker:e.name,time:t.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}),texts:[]}),"text"===e.kind){if(0===this.captions.length)return;if(null!=e.old){const t=this.captions[this.captions.length-1].texts.lastIndexOf(e.old);t>=0?this.captions[this.captions.length-1].texts[t]=e.new:this.captions[this.captions.length-1].texts.push(e.new)}else this.captions[this.captions.length-1].texts.push(e.new)}}};const T=(0,v.Z)(O,[["render",a]]);var D=T}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var s=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var a=!0,c=0;c<o.length;c++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(a=!1,i<s&&(s=i));if(a){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,s=o[0],a=o[1],c=o[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(c)var l=c(n)}for(t&&t(o);u<s.length;u++)i=s[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},o=self["webpackChunkmeet_copilot"]=self["webpackChunkmeet_copilot"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(866)}));o=n.O(o)})();
//# sourceMappingURL=app.83036b46.js.map