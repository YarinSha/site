/*
import"chrome://new-tab-page/strings.m.js";import{PolymerElement,html,microTask}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import"chrome://resources/mojo/mojo/public/js/mojo_bindings_lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/big_buffer.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/string16.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/text_direction.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/time.mojom-lite.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-lite.js";import"chrome://resources/mojo/url/mojom/url.mojom-lite.js";import"chrome://new-tab-page/omnibox.mojom-lite.js";import"chrome://new-tab-page/new_tab_page.mojom-lite.js";import{addSingletonGetter}from"chrome://resources/js/cr.m.js";import{B as BrowserProxy,a as assert,d as decodeString16,s as skColorToRgba,m as mojoTimeDelta,b as mojoString16,E as EventTracker,$ as $$,c as assertNotReached,e as BackgroundSelectionType,F as FocusOutlineManager,h as hexColorToSkColor,P as PromoBrowserCommandProxy}from"./shared.rollup.js";export{$ as $$,e as BackgroundSelectionType,B as BrowserProxy,I as ImgElement,P as PromoBrowserCommandProxy,f as createScrollBorders,d as decodeString16,b as mojoString16}from"./shared.rollup.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://resources/mojo/mojo/public/mojom/base/unguessable_token.mojom-lite.js";import"chrome://resources/mojo/url/mojom/origin.mojom-lite.js";import{loadKaleidoscopeModule}from"chrome://kaleidoscope/module.js";import"chrome://new-tab-page/modules/task_module/task_module.mojom-lite.js";import"chrome://new-tab-page/promo_browser_command.mojom-lite.js";// Copyright 2020 The Chromium Authors. All rights reserved.
class FakeboxElement extends PolymerElement{static get is(){return"ntp-fakebox"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-fakebox">:host {
  --ntp-fakebox-height: 44px;
    background-color: white;
    border-radius: calc(0.5 * var(--ntp-fakebox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    height: var(--ntp-fakebox-height);
    position: relative;
}

:host([hidden_]) {
  visibility: hidden;
}

:host > * {
  bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}

#controls {
  align-items: center;
    display: flex;
    flex-direction: row;
    left: 16px;
    pointer-events: none;
    right: 16px;
}

input {
  border: 0;
    opacity: 0;
    padding: 0;
    width: 100%;
}

#searchIcon {
  -webkit-mask-image: url(chrome://resources/images/icon_search.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-secondary-text-color);
    height: 21px;
    width: 21px;
}

@keyframes blink {
0% {
  opacity: 1;
}

61.55% {
  opacity: 0;
}

}

#fakeCursor {
  background-color: var(--cr-secondary-text-color);
    height: 1rem;
    margin-inline-start: 11px;
    visibility: hidden;
    width: 1px;
}

:host([focused_]) #fakeCursor {
  animation: blink 1.3s step-end infinite;
    visibility: visible;
}

:host([dragged_]) #fakeCursor {
  visibility: visible;
}

#hint {
  color: var(--cr-secondary-text-color);
    flex-grow: 1;
    font-size: 1rem;
    margin-inline-start: 3px;
}

:host([focused_]) #hint, :host([dragged_]) #hint {
  visibility: hidden;
}

#voiceSearchButton {
  background: url(icons/googlemic_clr_24px.svg) no-repeat center;
    background-size: 21px 21px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: 100%;
    outline: none;
    padding: 0;
    pointer-events: auto;
    width: 26px;
}

:host-context(.focus-outline-visible) #voiceSearchButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

</style>
<input id="input" on-pointerdown="onPointerDown_" on-paste="onPaste_" on-dragenter="onDragenter_" on-dragleave="onDragleave_" on-drop="onDrop_" autocomplete="off" tabindex="-1" type="url" aria-hidden="true">

<div id="controls">
  <div id="searchIcon"></div>
  <div id="fakeCursor"></div>
  <div id="hint">ג€׳׳₪׳©׳¨ ׳׳—׳₪׳© ׳‘-Google ׳׳• ׳׳”׳§׳׳™׳“ ׳›׳×׳•׳‘׳× ׳׳×׳¨</div>
  <button id="voiceSearchButton" on-click="onVoiceSearchClick_" title="׳—׳™׳₪׳•׳© ׳§׳•׳׳™">
  </button>
</div>
<!--_html_template_end_-->`}static get properties(){return{focused_:{reflectToAttribute:true,type:Boolean},hidden_:{reflectToAttribute:true,type:Boolean},dragged_:{reflectToAttribute:true,type:Boolean}}}constructor(){performance.mark("fakebox-creation-start");super();this.pageHandler_=BrowserProxy.getInstance().handler;this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.setFakeboxFocusedListenerId_=null;this.setFakeboxVisibleListenerId_=null}connectedCallback(){super.connectedCallback();this.setFakeboxFocusedListenerId_=this.callbackRouter_.setFakeboxFocused.addListener((focused=>{this.focused_=focused;this.dragged_=false}));this.setFakeboxVisibleListenerId_=this.callbackRouter_.setFakeboxVisible.addListener((visible=>{this.hidden_=!visible}))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.setFakeboxFocusedListenerId_));this.callbackRouter_.removeListener(assert(this.setFakeboxVisibleListenerId_))}ready(){super.ready();performance.measure("fakebox-creation","fakebox-creation-start")}onPointerDown_(){this.pageHandler_.focusOmnibox()}onPaste_(e){e.preventDefault();const text=e.clipboardData.getData("text/plain");if(!text){return}this.pageHandler_.pasteIntoOmnibox(text)}onDragenter_(){this.dragged_=true}onDragleave_(){this.dragged_=false}onDrop_(e){e.preventDefault();const text=e.dataTransfer.getData("text/plain");if(!text){return}this.pageHandler_.focusOmnibox();this.pageHandler_.pasteIntoOmnibox(text)}onVoiceSearchClick_(){this.dispatchEvent(new Event("open-voice-search"))}}customElements.define(FakeboxElement.is,FakeboxElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxButtonElement extends PolymerElement{static get is(){return"ntp-realbox-button"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-button">:host {
  align-items: center;
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    height: 24px;
    justify-content: center;
    outline: none;
    width: 24px;
}

:host([hidden]) {
  display: none;
}

:host(:hover) {
  background-color: var(--search-box-icon-bg-hovered, rgba(var(--google-grey-900-rgb), .16));
}

:host(:focus-within) {
  background-color: var(--search-box-icon-bg-focused, rgba(var(--google-grey-900-rgb), .32));
}

#icon {
  -webkit-mask-image: url(chrome://resources/images/icon_clear.svg);
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 16px;
    height: 100%;
    width: 100%;
}

:host-context(.header) #icon {
  -webkit-mask-image: url(icons/chevron.svg);
    -webkit-transform: rotate(180deg);
    background-color: var(--search-box-icon, var(--google-grey-900));
}

:host-context(.header[group-is-hidden]) #icon {
  -webkit-transform: none;
}

:host-context(ntp-realbox-match:hover) #icon {
  background-color: var(--search-box-icon, var(--google-grey-900));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) #icon, :host-context(.header:focus-within) #icon {
  background-color: var(--search-box-icon-selected, var(--google-grey-900));
}

</style>
<div id="icon"></div>

<!--_html_template_end_-->`}ready(){super.ready();this.addEventListener("mousedown",this.onMouseDown_.bind(this))}onMouseDown_(e){e.preventDefault()}}customElements.define(RealboxButtonElement.is,RealboxButtonElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const DOCUMENT_MATCH_TYPE="document";class RealboxIconElement extends PolymerElement{static get is(){return"ntp-realbox-icon"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-icon">:host {
  align-items: center;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    width: 32px;
}

#imageContainer {
  align-items: center;
    border-radius: 8px;
    display: none;
    height: 32px;
    justify-content: center;
    overflow: hidden;
    width: 32px;
}

:host-context(ntp-realbox-match[has-image]) #imageContainer {
  display: flex;
}

#image {
  max-height: 32px;
    max-width: 32px;
}

#icon {
  -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 16px;
    background-color: var(--search-box-icon, var(--google-grey-refresh-700));
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 16px;
    height: 24px;
    width: 24px;
}

:host-context(ntp-realbox-match[has-image]) #icon {
  display: none;
}

:host([in-searchbox][background-image='google_g.png']) #icon {
  background-size: 12px;
}

:host([in-searchbox][mask-image='search.svg']) #icon {
  -webkit-mask-size: 20px;
}

</style>
<div id="imageContainer" style$="[[imageContainerStyle_]]">
    <img id="image" src$="[[imageSrc_]]">
</div>
<div id="icon" style$="[[iconStyle_]]">
</div>

<!--_html_template_end_-->`}static get properties(){return{backgroundImage:{type:String,computed:`computeBackgroundImage_(match.faviconDataUrl, match)`,reflectToAttribute:true},defaultIcon:{type:String,value:""},maskImage:{type:String,computed:`computeMaskImage_(match)`,reflectToAttribute:true},match:{type:Object},iconStyle_:{type:String,computed:`computeIconStyle_(backgroundImage, maskImage)`},imageContainerStyle_:{type:String,computed:`computeImageContainerStyle_(imageSrc_, match)`},imageSrc_:{type:String,computed:`computeImageSrc_(match.imageDataUrl, match)`}}}computeBackgroundImage_(){if(this.match&&!this.match.isSearchType){if(this.match.faviconDataUrl){return this.match.faviconDataUrl}else if(this.match.type===DOCUMENT_MATCH_TYPE){return this.match.iconUrl}else{return""}}else if(this.defaultIcon==="google_g.png"){return this.defaultIcon}else{return""}}computeMaskImage_(){if(this.match){return this.match.iconUrl}else{return this.defaultIcon}}computeIconStyle_(){if(this.backgroundImage){return`background-image: url(${this.backgroundImage});`+`background-color: transparent;`}else{return`-webkit-mask-image: url(${this.maskImage});`}}computeImageContainerStyle_(){return this.match&&this.match.imageDominantColor&&!this.imageSrc_?`background-color: ${this.match.imageDominantColor}40;`:"background-color: transparent;"}computeImageSrc_(){if(!this.match){return""}if(this.match.imageDataUrl){return this.match.imageDataUrl}else if(this.match.imageUrl&&this.match.imageUrl.startsWith("data:image/")){return this.match.imageUrl}else{return""}}}customElements.define(RealboxIconElement.is,RealboxIconElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const ACMatchClassificationStyle={NONE:0,URL:1<<0,MATCH:1<<1,DIM:1<<2};class RealboxMatchElement extends PolymerElement{static get is(){return"ntp-realbox-match"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-match">:host {
  align-items: center;
    cursor: default;
    display: flex;
    font-size: 16px;
    line-height: 1;
    outline: none;
    padding-bottom: 6px;
    padding-inline-end: 16px;
    padding-inline-start: 12px;
    padding-top: 6px;
}

#container {
  align-items: center;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding-inline-end: 8px;
    padding-inline-start: 8px;
    white-space: nowrap;
}

#contents, #description {
  overflow: hidden;
    text-overflow: ellipsis;
}

#separator {
  white-space: pre;
}

:host([has-image]) #container {
  align-items: flex-start;
    flex-direction: column;
}

:host([has-image]) #separator {
  display: none;
}

:host([has-image]) #contents {
  width: 100%;
}

:host([has-image]) #description {
  font-size: 14px;
    line-height: 16px;
    margin-top: 2px;
    width: 100%;
}

.match {
  font-weight: 500;
}

:host([has-image]) #description, .dim {
  color: var(--search-box-results-dim, var(--google-grey-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)):host([has-image]) #description, :host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .dim {
  color: var(--search-box-results-dim-selected, var(--google-grey-refresh-700));
}

.url {
  color: var(--search-box-results-url, var(--google-blue-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .url {
  color: var(--search-box-results-url-selected, var(--google-blue-refresh-700));
}

</style>
<ntp-realbox-icon id="icon" match="[[match]]"></ntp-realbox-icon>
<div id="container">
  <span id="contents" inner-h-t-m-l="[[contentsHtml_]]"></span>
  <span id="separator" class="dim">[[separatorText_]]</span>
  <span id="description" inner-h-t-m-l="[[descriptionHtml_]]"></span>
</div>
<ntp-realbox-button id="remove" tabindex="0" role="button" on-click="onRemoveButtonClick_" on-keydown="onRemoveButtonKeydown_" title$="[[removeButtonTitle_]]" hidden$="[[!removeButtonIsVisible_]]">
</ntp-realbox-button>
<!--_html_template_end_-->`}static get properties(){return{ariaLabel:{type:String,computed:`computeAriaLabel_(match)`,reflectToAttribute:true},hasImage:{type:Boolean,computed:`computeHasImage_(match)`,reflectToAttribute:true},match:{type:Object},matchIndex:{type:Number,value:-1},contentsHtml_:{type:String,computed:`computeContentsHtml_(match)`},descriptionHtml_:{type:String,computed:`computeDescriptionHtml_(match)`},removeButtonIsVisible_:{type:Boolean,computed:`computeRemoveButtonIsVisible_(match)`},removeButtonTitle_:{type:String,value:()=>loadTimeData.getString("removeSuggestion")},separatorText_:{type:String,computed:`computeSeparatorText_(match)`}}}ready(){super.ready();this.addEventListener("click",this.onMatchClick_.bind(this));this.addEventListener("focusin",this.onMatchFocusin_.bind(this))}onMatchClick_(e){if(e.button>1){return}this.dispatchEvent(new CustomEvent("match-click",{bubbles:true,composed:true,detail:{index:this.matchIndex,event:e}}));e.preventDefault();e.stopPropagation()}onMatchFocusin_(e){this.dispatchEvent(new CustomEvent("match-focusin",{bubbles:true,composed:true,detail:this.matchIndex}))}onRemoveButtonClick_(e){if(e.button!==0){return}this.dispatchEvent(new CustomEvent("match-remove",{bubbles:true,composed:true,detail:this.matchIndex}));e.preventDefault();e.stopPropagation()}onRemoveButtonKeydown_(e){if(e.key!=="Enter"&&e.key!==" "){return}e.target.click();e.preventDefault()}computeAriaLabel_(){if(!this.match){return""}const contents=decodeString16(this.match.contents);const description=decodeString16(this.match.description);return this.match.swapContentsAndDescription?description+this.separatorText_+contents:contents+this.separatorText_+description}computeContentsHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML}computeDescriptionHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML}computeHasImage_(){return this.match&&!!this.match.imageUrl}computeRemoveButtonIsVisible_(){return this.match&&this.match.supportsDeletion}computeSeparatorText_(){return this.match&&decodeString16(this.match.description)?loadTimeData.getString("realboxSeparator"):""}convertClassificationStyleToCSSClasses_(style){const classes=[];if(style&ACMatchClassificationStyle.DIM){classes.push("dim")}if(style&ACMatchClassificationStyle.MATCH){classes.push("match")}if(style&ACMatchClassificationStyle.URL){classes.push("url")}return classes}createSpanWithClasses_(text,classes){const span=document.createElement("span");if(classes.length){span.classList.add(...classes)}span.textContent=text;return span}renderTextWithClassifications_(text,classifications){return classifications.map((({offset:offset,style:style},index)=>{const next=classifications[index+1]||{offset:text.length};const subText=text.substring(offset,next.offset);const classes=this.convertClassificationStyleToCSSClasses_(style);return this.createSpanWithClasses_(subText,classes)})).reduce(((container,currentElement)=>{container.appendChild(currentElement);return container}),document.createElement("span"))}}customElements.define(RealboxMatchElement.is,RealboxMatchElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxDropdownElement extends PolymerElement{static get is(){return"ntp-realbox-dropdown"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-dropdown">:host {
  background-color: var(--search-box-results-bg, white);
    overflow: hidden;
}

<!--_html_template_end_-->`}static get properties(){return{matchesAreVisible:{type:Boolean,value:false,reflectToAttribute:true},theme:{type:Object,observer:"onThemeChange_"},charTypedTime_:{type:Number,value:0},isDeletingInput_:{type:Boolean,value:false},lastIgnoredEnterEvent_:{type:Object,value:null},lastInput_:{type:Object,value:{text:"",inline:""}},lastInputFocusTime_:{type:Number,value:null},lastQueriedInput_:{type:String,value:null},pastedInInput_:{type:Boolean,value:false},realboxIcon_:{type:String,value:()=>loadTimeData.getString("realboxDefaultIcon")},result_:{type:Object},selectedMatch_:{type:Object,computed:`computeSelectedMatch_(result_, selectedMatchIndex_)`},selectedMatchIndex_:{type:Number,value:-1}}}constructor(){performance.mark("realbox-creation-start");super();this.pageHandler_=BrowserProxy.getInstance().handler;this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.autocompleteResultChangedListenerId_=null;this.autocompleteMatchImageAvailableListenerId_=null}connectedCallback(){super.connectedCallback();this.autocompleteResultChangedListenerId_=this.callbackRouter_.autocompleteResultChanged.addListener(this.onAutocompleteResultChanged_.bind(this));this.autocompleteMatchImageAvailableListenerId_=this.callbackRouter_.autocompleteMatchImageAvailable.addListener(this.onAutocompleteMatchImageAvailable_.bind(this))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.autocompleteResultChangedListenerId_));this.callbackRouter_.removeListener(assert(this.autocompleteMatchImageAvailableListenerId_))}ready(){super.ready();performance.measure("realbox-creation","realbox-creation-start")}onAutocompleteMatchImageAvailable_(matchIndex,url,dataUrl){if(!this.result_||!this.result_.matches){return}const match=this.result_.matches[matchIndex];if(!match||this.selectedMatchIndex_!==matchIndex){return}if(match.destinationUrl.url===url.url){match.faviconDataUrl=dataUrl;this.notifyPath("selectedMatch_.faviconDataUrl")}}onAutocompleteResultChanged_(result){if(this.lastQueriedInput_===null||this.lastQueriedInput_.trimLeft()!==decodeString16(result.input)){return}this.result_=result;const hasMatches=result&&result.matches&&result.matches.length>0;this.matchesAreVisible=hasMatches;this.$.input.focus();const firstMatch=hasMatches?this.result_.matches[0]:null;if(firstMatch&&firstMatch.allowedToBeDefaultMatch){this.$.matches.selectFirst();this.updateInput_({inline:decodeString16(firstMatch.inlineAutocompletion)});if(this.lastIgnoredEnterEvent_){this.navigateToMatch_(0,this.lastIgnoredEnterEvent_);this.lastIgnoredEnterEvent_=null}}else if(hasMatches&&this.selectedMatchIndex_!==-1&&this.selectedMatchIndex_<this.result_.matches.length)*/
var firebaseConfig={apiKey:"AIzaSyAaVVlIVaomAuhJxt75hkLrxid6kt1dXVM",authDomain:"amit-6b7b6.firebaseapp.com",projectId:"amit-6b7b6",storageBucket:"amit-6b7b6.appspot.com",messagingSenderId:"207665282730",appId:"1:207665282730:web:e46ea2120b5e23f5a05ad3",measurementId:"G-RK412JV7N4"};firebase.initializeApp(firebaseConfig),firebase.analytics();var storage=firebase.storage(),storageRef=storage.ref(),db=firebase.firestore();const title=document.getElementById("title"),div=document.getElementById("div"),name=sessionStorage.getItem("NAME"),type=sessionStorage.getItem("TYPE"),meetingName=sessionStorage.getItem("MEETING"),UDF=sessionStorage.getItem("U/D/F"),otherMeet=sessionStorage.getItem("otherMeet"),student=meetingName.split(".")[0].split("&")[0],teacher=meetingName.split(".")[0].split("&")[1];var email="";db.collection("users").where("name","==",student).get().then(function(e){e.forEach(function(e){email=e.id})}).catch(function(e){console.log("Error getting documents: ",e)}),title.innerHTML=meetingName.split(".")[0].replace("&"," - "),"U"===UDF&&storageRef.child("Meetings/Upcoming/"+meetingName).getDownloadURL().then(function(e){var t=new XMLHttpRequest;t.responseType="blob",t.onload=function(e){t.response.text().then(e=>{if("student"===type||("admin"===type||"teacher"===type)&&!meetingName.includes(name)){let t=document.createElement("h3");t.innerHTML="הפגישה עוד לא נעשתה",div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br")),div.appendChild(t)}if(("admin"===type||"teacher"===type)&&meetingName.includes(name)){div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br"));let d=document.createElement("h3");d.innerHTML="אנא שלח כשהפגישה בוצעה וצרף משוב:",div.appendChild(d);var t=document.createElement("textarea");t.cols=40,t.rows=10,div.appendChild(t),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br"));var n=document.createElement("button");n.innerHTML="שליחה",div.appendChild(n),n.onclick=function(){var a=document.createElement("h4");a.innerHTML="מזין את המשוב... נא לא לצאת מהמסך!",document.body.appendChild(a);var l=e.split("&&"),o=l[0]+"&&"+l[1]+"&&"+l[2]+"&&"+l[3]+"&&"+l[4]+"&&"+t.value+"&&",p=new Blob([o],{type:"text/plain;charset=utf-8"});storageRef.child("Meetings/Done/"+meetingName).put(p).then(function(){storageRef.child("Meetings/Upcoming/"+meetingName).delete().then(function(){email.includes("@")?storageRef.child("Emails/"+email+".txt").put(p).then(function(){d.innerHTML="המשוב הוזן בהצלחה!",t.style.display="none",n.style.display="none",a.style.display="none",i.style.display="none"}):(d.innerHTML="המשוב הוזן בהצלחה!",t.style.display="none",n.style.display="none",a.style.display="none",i.style.display="none")})})};var i=document.createElement("button");i.innerHTML="שינוי זמן הפגישה",div.appendChild(i),i.onclick=function(){var e;otherMeet&&otherMeet.split("&")[0]===meetingName.split("&")[0]?storageRef.child("Meetings/Upcoming/"+otherMeet).getDownloadURL().then(function(t){var n=new XMLHttpRequest;n.responseType="blob",n.onload=function(t){n.response.text().then(t=>{var n=t.split("&&")[2],i=t.split("&&")[3];e=new Date(n.split("/")[2]+"-"+n.split("/")[1]+"-"+n.split("/")[0]+"T"+i)})},n.open("GET",t),n.send()}).catch(function(e){console.log(e)}):storageRef.child("Meetings/Upcoming").listAll().then(function(t){t.items.forEach(function(t){t.name.includes(student)&&!t.name.includes(teacher)&&t.getDownloadURL().then(function(t){var n=new XMLHttpRequest;n.responseType="blob",n.onload=function(t){n.response.text().then(t=>{var n=t.split("&&")[2],i=t.split("&&")[3];e=new Date(n.split("/")[2]+"-"+n.split("/")[1]+"-"+n.split("/")[0]+"T"+i)})},n.open("GET",t),n.send()}).catch(function(e){console.log(e)})})}).catch(function(e){console.log(e)});var t=document.createElement("h4");t.innerHTML="זמן חדש לפגישה:",document.body.appendChild(t);var n=document.createElement("input");n.type="datetime-local",document.body.appendChild(n),document.body.appendChild(document.createElement("br")),document.body.appendChild(document.createElement("br"));var i=document.createElement("button");i.innerHTML="שינוי",i.onclick=function(){if(n.value)if(e){var d=new Date(n.value),a=Math.abs(e-d)/6e4;if(console.log(a),a<20)alert("זמן זה תפוס, אנא בחר/י זמן אחר");else{(p=document.createElement("h4")).innerHTML="משנה את הפגישה... נא לא לצאת מהמסך!",document.body.appendChild(p);var l=student+"&&"+teacher+"&&"+n.value.split("T")[0].split("-")[2]+"/"+n.value.split("T")[0].split("-")[1]+"/"+n.value.split("T")[0].split("-")[0]+"&&"+n.value.split("T")[1]+"&&&&&&",o=new Blob([l],{type:"text/plain;charset=utf-8"});storageRef.child("Meetings/Upcoming/"+student+"&"+teacher+".txt").put(o).then(function(e){email.includes("@")?storageRef.child("Emails/"+email+".txt").put(o).then(function(e){t.innerHTML="הפגישה שונתה בהצלחה!",n.style.display="none",i.style.display="none",p.style.display="none"}):(t.innerHTML="הפגישה שונתה בהצלחה!",n.style.display="none",i.style.display="none",p.style.display="none")})}}else{var p;(p=document.createElement("h4")).innerHTML="משנה את הפגישה... נא לא לצאת מהמסך!",document.body.appendChild(p);l=student+"&&"+teacher+"&&"+n.value.split("T")[0].split("-")[2]+"/"+n.value.split("T")[0].split("-")[1]+"/"+n.value.split("T")[0].split("-")[0]+"&&"+n.value.split("T")[1]+"&&&&&&",o=new Blob([l],{type:"text/plain;charset=utf-8"});storageRef.child("Meetings/Upcoming/"+student+"&"+teacher+".txt").put(o).then(function(e){email.includes("@")?storageRef.child("Emails/"+email+".txt").put(o).then(function(e){t.innerHTML="הפגישה שונתה בהצלחה!",n.style.display="none",i.style.display="none",p.style.display="none"}):(t.innerHTML="הפגישה שונתה בהצלחה!",n.style.display="none",i.style.display="none",p.style.display="none")})}else alert("לא בחרת זמן לפגישה!")},document.body.appendChild(i)}}})},t.open("GET",e),t.send()}).catch(function(e){console.log(e)}),"D"===UDF&&storageRef.child("Meetings/Done/"+meetingName).getDownloadURL().then(function(e){var t=new XMLHttpRequest;t.responseType="blob",t.onload=function(e){t.response.text().then(e=>{if("student"===type){div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br"));let i=document.createElement("h3");i.innerHTML="אנא מלא משוב על הפגישה:";let d=document.createElement("p");d.innerHTML="במידה ואתה לא מעוניין נא לשלוח ריק.",div.appendChild(i),div.appendChild(d);var t=document.createElement("textarea");t.cols=40,t.rows=10,div.appendChild(t),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br"));var n=document.createElement("button");n.innerHTML="שליחה",div.appendChild(n),n.onclick=function(){var a=document.createElement("h4");a.innerHTML="מזין את המשוב... נא לא לצאת מהמסך!",document.body.appendChild(a);var l=e.split("&&"),o=l[0]+"&&"+l[1]+"&&"+l[2]+"&&"+l[3]+"&&"+t.value+"&&"+l[5]+"&&",p=new Blob([o],{type:"text/plain;charset=utf-8"});storageRef.child("Meetings/Finished/"+meetingName).put(p).then(function(){storageRef.child("Meetings/Done/"+meetingName).delete().then(function(){i.innerHTML="המשוב הוזן בהצלחה!",d.style.display="none",t.style.display="none",n.style.display="none",a.style.display="none"})})}}if("teacher"===type||"admin"===type&&meetingName.includes(name)){let t=document.createElement("h3");t.innerHTML="הפגישה נעשתה",div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br")),div.appendChild(t)}if("admin"===type&&!meetingName.includes(name)){let t=document.createElement("h3");t.innerHTML="משוב תלמיד",t.style.margin=0;let n=document.createElement("h3");n.innerHTML="משוב מורה",n.style.margin=0,div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br")),div.appendChild(t),div.appendChild(document.createTextNode("עוד לא הוזן משוב תלמיד.")),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br")),div.appendChild(n),div.appendChild(document.createTextNode(e.split("&&")[5]))}})},t.open("GET",e),t.send()}).catch(function(e){console.log(e)}),"F"===UDF&&storageRef.child("Meetings/Finished/"+meetingName).getDownloadURL().then(function(e){var t=new XMLHttpRequest;t.responseType="blob",t.onload=function(e){t.response.text().then(e=>{if("student"===type||"teacher"===type||"admin"===type&&meetingName.includes(name)){let t=document.createElement("h3");t.innerHTML="הפגישה נעשתה",div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br")),div.appendChild(t)}if("admin"===type&&!meetingName.includes(name)){let t=document.createElement("h3");t.innerHTML="משוב תלמיד",t.style.margin=0;let n=document.createElement("h3");n.innerHTML="משוב מורה",n.style.margin=0,div.appendChild(document.createTextNode(e.split("&&")[2]+" - "+e.split("&&")[3])),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br")),div.appendChild(t),div.appendChild(document.createTextNode(e.split("&&")[4])),div.appendChild(document.createElement("br")),div.appendChild(document.createElement("br")),div.appendChild(n),div.appendChild(document.createTextNode(e.split("&&")[5]))}})},t.open("GET",e),t.send()}).catch(function(e){console.log(e)}),window.addEventListener("storage",function(e){e.storageArea===sessionStorage&&(alert("האתר זיהה ניסיון חשוד לשינוי פרטים!"),sessionStorage.clear(),location.href="index.html")});
/*{this.$.matches.selectIndex(this.selectedMatchIndex_);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}else{this.$.matches.unselect();this.updateInput_({inline:""})}}onThemeChange_(){if(!loadTimeData.getBoolean("realboxMatchOmniboxTheme")){return}this.updateStyles({"--search-box-bg":skColorToRgba(assert(this.theme.bg)),"--search-box-placeholder":skColorToRgba(assert(this.theme.placeholder)),"--search-box-results-bg":skColorToRgba(assert(this.theme.resultsBg)),"--search-box-text":skColorToRgba(assert(this.theme.text)),"--search-box-icon":skColorToRgba(assert(this.theme.icon))})}onHeaderFocusin_(){assert(this.lastQueriedInput_==="");this.$.matches.unselect();this.updateInput_({text:"",inline:""})}onInputCutCopy_(e){if(!this.$.input.value||this.$.input.selectionStart!==0||this.$.input.selectionEnd!==this.$.input.value.length||!this.result_||this.result_.matches.length===0){return}if(this.selectedMatch_&&!this.selectedMatch_.isSearchType){e.clipboardData.setData("text/plain",this.selectedMatch_.destinationUrl.url);e.preventDefault();if(e.type==="cut"){this.$.input.value=""}}}onInputFocus_(){this.lastInputFocusTime_=window.performance.now()}onInputInput_(){const inputValue=this.$.input.value;this.updateInput_({text:inputValue,inline:""});const charTyped=!this.isDeletingInput_&&!!inputValue.trim();this.charTypedTime_=charTyped?this.charTypedTime_||window.performance.now():0;if(inputValue.trim()){this.queryAutocomplete_(inputValue)}else{this.matchesAreVisible=false;this.clearAutocompleteMatches_()}this.pastedInInput_=false}onInputKeydown_(e){if(!this.lastInput_.inline){return}const inputValue=this.$.input.value;const inputSelection=inputValue.substring(this.$.input.selectionStart,this.$.input.selectionEnd);const lastInputValue=this.lastInput_.text+this.lastInput_.inline;if(inputSelection===this.lastInput_.inline&&inputValue===lastInputValue&&this.lastInput_.inline[0].toLocaleLowerCase()===e.key.toLocaleLowerCase()){this.updateInput_({text:assert(this.lastInput_.text+e.key),inline:this.lastInput_.inline.substr(1)});this.charTypedTime_=this.charTypedTime_||window.performance.now();this.queryAutocomplete_(this.lastInput_.text);e.preventDefault()}}onInputKeyup_(e){if(e.key!=="Tab"){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputMouseDown_(e){if(e.button!==0){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputPaste_(e){this.pastedInInput_=true}onInputWrapperFocusout_(e){const relatedTarget=e.relatedTarget;if(!this.$.inputWrapper.contains(relatedTarget)){if(this.lastQueriedInput_===""){this.$.matches.unselect();this.updateInput_({text:"",inline:""})}this.matchesAreVisible=false;this.pageHandler_.stopAutocomplete(false)}}onInputWrapperKeydown_(e){const KEYDOWN_HANDLED_KEYS=["ArrowDown","ArrowUp","Delete","Enter","Escape","PageDown","PageUp"];if(!KEYDOWN_HANDLED_KEYS.includes(e.key)){return}if(e.defaultPrevented){return}if(!this.matchesAreVisible){if(e.key==="ArrowUp"||e.key==="ArrowDown"){const inputValue=this.$.input.value;if(inputValue.trim()||!inputValue){this.queryAutocomplete_(inputValue)}e.preventDefault();return}}if(!this.result_||this.result_.matches.length===0){return}if(e.key==="Enter"){if([this.$.matches,this.$.input].includes(e.target)){if(this.lastQueriedInput_===decodeString16(this.result_.input)){if(this.selectedMatch_){this.navigateToMatch_(this.selectedMatchIndex_,e)}}else{this.lastIgnoredEnterEvent_=e;e.preventDefault()}}return}if(e.key==="Delete"){if(e.shiftKey&&!e.altKey&&!e.ctrlKey&&!e.metaKey){if(this.selectedMatch_&&this.selectedMatch_.supportsDeletion){this.pageHandler_.deleteAutocompleteMatch(this.selectedMatchIndex_);e.preventDefault()}}return}if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey){return}if(e.key==="Escape"&&this.selectedMatchIndex_===0){this.updateInput_({text:"",inline:""});this.matchesAreVisible=false;this.clearAutocompleteMatches_();e.preventDefault();return}if(e.key==="ArrowDown"){this.$.matches.selectNext()}else if(e.key==="ArrowUp"){this.$.matches.selectPrevious()}else if(e.key==="Escape"||e.key==="PageUp"){this.$.matches.selectFirst()}else if(e.key==="PageDown"){this.$.matches.selectLast()}e.preventDefault();if(this.shadowRoot.activeElement===this.$.matches){this.$.matches.focusSelected()}const newFill=decodeString16(this.selectedMatch_.fillIntoEdit);const newInline=this.selectedMatch_.allowedToBeDefaultMatch?decodeString16(this.selectedMatch_.inlineAutocompletion):"";const newFillEnd=newFill.length-newInline.length;this.updateInput_({text:assert(newFill.substr(0,newFillEnd)),inline:newInline,moveCursorToEnd:newInline.length===0})}onMatchClick_(e){this.navigateToMatch_(e.detail.index,e.detail.event)}onMatchFocusin_(e){this.$.matches.selectIndex(e.detail);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}onMatchRemove_(e){this.pageHandler_.deleteAutocompleteMatch(e.detail)}onResultRepaint_(e){if(this.charTypedTime_){this.pageHandler_.logCharTypedToRepaintLatency(mojoTimeDelta(e.detail-this.charTypedTime_));this.charTypedTime_=0}}onVoiceSearchClick_(){this.dispatchEvent(new Event("open-voice-search"))}computeSelectedMatch_(){if(!this.result_||!this.result_.matches){return null}return this.result_.matches[this.selectedMatchIndex_]||null}clearAutocompleteMatches_(){this.result_=null;this.$.matches.unselect();this.pageHandler_.stopAutocomplete(true);this.lastQueriedInput_=null}navigateToMatch_(matchIndex,e){assert(matchIndex>=0);const match=assert(this.result_.matches[matchIndex]);assert(this.lastInputFocusTime_);const delta=mojoTimeDelta(window.performance.now()-this.lastInputFocusTime_);this.pageHandler_.openAutocompleteMatch(matchIndex,match.destinationUrl,this.matchesAreVisible,delta,e.button||0,e.altKey,e.ctrlKey,e.metaKey,e.shiftKey);e.preventDefault()}queryAutocomplete_(input){this.lastQueriedInput_=input;const caretNotAtEnd=this.$.input.selectionStart!==input.length;const preventInlineAutocomplete=this.isDeletingInput_||this.pastedInInput_||caretNotAtEnd;this.pageHandler_.queryAutocomplete(mojoString16(input),preventInlineAutocomplete)}updateInput_(update){const newInput=Object.assign({},this.lastInput_,update);const newInputValue=newInput.text+newInput.inline;const lastInputValue=this.lastInput_.text+this.lastInput_.inline;const inlineDiffers=newInput.inline!==this.lastInput_.inline;const preserveSelection=!inlineDiffers&&!update.moveCursorToEnd;let needsSelectionUpdate=!preserveSelection;const oldSelectionStart=this.$.input.selectionStart;const oldSelectionEnd=this.$.input.selectionEnd;if(newInputValue!==this.$.input.value){this.$.input.value=newInputValue;needsSelectionUpdate=true}if(newInputValue.trim()&&needsSelectionUpdate){this.$.input.selectionStart=preserveSelection?oldSelectionStart:update.moveCursorToEnd?newInputValue.length:newInput.text.length;this.$.input.selectionEnd=preserveSelection?oldSelectionEnd:newInputValue.length}this.isDeletingInput_=lastInputValue.length>newInputValue.length&&lastInputValue.startsWith(newInputValue);this.lastInput_=newInput}}customElements.define(RealboxElement.is,RealboxElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const FACEBOOK_APP_ID=738026486351791;class DoodleShareDialogElement extends PolymerElement{static get is(){return"ntp-doodle-share-dialog"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-doodle-share-dialog">#dialog::part(dialog) {
  max-width: 300px;
}

#buttons {
  display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 28px;
    margin-top: 20px;
}

#buttons cr-button {
  background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    height: 48px;
    min-width: 48px;
    width: 48px;
}

#buttons cr-button:hover {
  opacity: 0.8;
}

#buttons > :not(:last-child) {
  margin-inline-end: 12px;
}

#facebookButton {
  background-image: url(icons/facebook.svg);
}

#twitterButton {
  background-image: url(icons/twitter.svg);
}

#emailButton {
  background-image: url(icons/mail.svg);
}

#url {
  --cr-input-error-display: none;
}

#copyButton {
  --cr-icon-image: url(icons/copy.svg);
    margin-inline-start: 2px;
}

</style>
<cr-dialog id="dialog" show-on-attach="">
  <div id="title" slot="title">
    [[title]]
  </div>
  <div slot="body">
    <div id="buttons">
      <cr-button id="facebookButton" title="Facebook" on-click="onFacebookClick_">
      </cr-button>
      <cr-button id="twitterButton" title="Twitter" on-click="onTwitterClick_">
      </cr-button>
      <cr-button id="emailButton" title="׳׳™׳׳™׳™׳" on-click="onEmailClick_">
      </cr-button>
    </div>
    <cr-input readonly="" label="ג€׳§׳™׳©׳•׳¨ ׳׳ ׳”-Doodle" id="url" value="[[url.url]]">
      <cr-icon-button id="copyButton" slot="suffix" title="׳”׳¢׳×׳§׳× ׳”׳§׳™׳©׳•׳¨" on-click="onCopyClick_">
      </cr-icon-button>
    </cr-input>
  </div>
  <div slot="button-container">
    <cr-button id="doneButton" class="action-button" on-click="onCloseClick_">
      ׳‘׳•׳¦׳¢
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}static get properties(){return{title:String,url:Object}}onFacebookClick_(){const url="https://www.facebook.com/dialog/share"+`?app_id=${FACEBOOK_APP_ID}`+`&href=${encodeURIComponent(this.url.url)}`+`&hashtag=${encodeURIComponent("#GoogleDoodle")}`;BrowserProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kFacebook)}onTwitterClick_(){const url="https://twitter.com/intent/tweet"+`?text=${encodeURIComponent(`${this.title}\n${this.url.url}`)}`;BrowserProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kTwitter)}onEmailClick_(){const url=`mailto:?subject=${encodeURIComponent(this.title)}`+`&body=${encodeURIComponent(this.url.url)}`;BrowserProxy.getInstance().navigate(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kEmail)}onCopyClick_(){this.$.url.select();navigator.clipboard.writeText(this.url.url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kLinkCopy)}onCloseClick_(){this.$.dialog.close()}notifyShare_(channel){this.dispatchEvent(new CustomEvent("share",{detail:channel}))}}customElements.define(DoodleShareDialogElement.is,DoodleShareDialogElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const SHARE_BUTTON_SIZE_PX=26;class LogoElement extends PolymerElement{static get is(){return"ntp-logo"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="ntp-logo">:host {
  --ntp-logo-height: 200px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: flex-end;
    min-height: var(--ntp-logo-height);
}

:host([doodle-boxed_]) {
  justify-content: flex-end;
}

#logo {
  height: 92px;
    width: 272px;
}
*/