(this["webpackJsonppixel-pixy"]=this["webpackJsonppixel-pixy"]||[]).push([[0],{78:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),o=n.n(r),i=n(19),c=n.n(i),s=(n(78),n(4)),l=n(119),u=n(114),h=n(124),f=n(115),d=n(116),j=n(16),b=n(68),O=n(118),v=function(e){e.colorSelected;var t=e.onColorPicked,n=e.colorHistory;e.setColorHistory;return Object(a.jsx)(b.a,{className:"ColorPickerHistory",direction:"row",justify:"start",wrap:!0,gap:"xxsmall",children:n.map((function(e,n){return Object(a.jsx)(b.a,{height:"xxsmall",width:"xxsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(O.a,{fill:"vertical",size:"small",onClick:function(){return t(e)},style:{backgroundColor:e.toHex(),border:"none"}},n)},e.toHex())}))})},x=function(e){var t=e.pinnedColors,n=void 0===t?[]:t,r=e.onColorPicked;return Object(a.jsx)(b.a,{className:"ColorPickerHistory",direction:"row",justify:"start",wrap:!0,gap:"xxsmall",children:n.slice(0,8).map((function(e,t){return Object(a.jsx)(b.a,{height:"xxsmall",width:"xxsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(O.a,{fill:"vertical",size:"small",onClick:function(){return r(e)},style:{backgroundColor:e.toHex(),border:"none"}},t)},e.toHex())}))})},p=n(66),g=n(17),C=n(12),m=function(){function e(t,n,a){Object(g.a)(this,e),this.hsl=void 0,this.hsl=[t,n,a]}return Object(C.a)(e,null,[{key:"fromHSLString",value:function(t){var n=t.indexOf(",")>-1?",":" ",a=t.substr(4).split(")")[0].split(n),r=a[0],o=parseFloat(a[1].substr(0,a[1].length-1))/100,i=parseFloat(a[2].substr(0,a[2].length-1))/100,c=0;return r.indexOf("deg")>-1?r=r.substr(0,r.length-3):r.indexOf("rad")>-1?c=Math.round(parseFloat(r.substr(0,r.length-3))*(180/Math.PI)):r.indexOf("turn")>-1&&(c=Math.round(360*parseFloat(r.substr(0,r.length-4)))),c>=360&&(c%=360),new e(c,o,i)}},{key:"fromRGB",value:function(t,n,a){t/=255,n/=255,a/=255;var r,o=Math.min(t,n,a),i=Math.max(t,n,a),c=i-o,s=0;return s=0===c?0:i===t?(n-a)/c%6:i===n?(a-t)/c+2:(t-n)/c+4,(s=Math.round(60*s))<0&&(s+=360),r=(i+o)/2,new e(s,0===c?0:c/(1-Math.abs(2*r-1)),r)}}]),Object(C.a)(e,[{key:"toHSLString",value:function(){var e=Object(s.a)(this.hsl,3);return"hsl("+e[0]+","+100*e[1]+"%,"+100*e[2]+"%)"}},{key:"toRGB",value:function(){return y.fromHSL.apply(y,Object(j.a)(this.hsl))}},{key:"clone",value:function(){return Object(p.a)(e,Object(j.a)(this.hsl))}},{key:"h",get:function(){return this.hsl[0]},set:function(e){this.hsl[0]=e}},{key:"s",get:function(){return this.hsl[1]},set:function(e){this.hsl[1]=e}},{key:"l",get:function(){return this.hsl[2]},set:function(e){this.hsl[2]=e}}]),e}(),y=function(){function e(t,n,a){Object(g.a)(this,e),this.rgb=void 0,this.rgb=[t,n,a]}return Object(C.a)(e,null,[{key:"fromHSL",value:function(t,n,a){if(t<0||t>359)throw new RangeError("Hue should be between 0 and 359 inclusive");if(n<0||n>1)throw new RangeError("Saturation is a percentage and should be between 0 and 1 inclusive");if(a<0||a>1)throw new RangeError("Lightness is a percentage and should be between 0 and 1 inclusive");var r=(1-Math.abs(2*a-1))*n,o=r*(1-Math.abs(t/60%2-1)),i=a-r/2,c=0,s=0,l=0;return 0<=t&&t<60?(c=r,s=o,l=0):60<=t&&t<120?(c=o,s=r,l=0):120<=t&&t<180?(c=0,s=r,l=o):180<=t&&t<240?(c=0,s=o,l=r):240<=t&&t<300?(c=o,s=0,l=r):300<=t&&t<360&&(c=r,s=0,l=o),new e(c=Math.round(255*(c+i)),s=Math.round(255*(s+i)),l=Math.round(255*(l+i)))}},{key:"fromHex",value:function(t){if(!Number.isInteger(t))throw new TypeError("Number should be an integer, got: ".concat(t));if(t<0||t>26)throw new RangeError("Number should be between 0-16777215 inclusive");var n=t.toString(16);return e.fromHexString("#"+n)}},{key:"fromRGBString",value:function(t){var n=t.indexOf(",")>-1?",":" ",a=t.substr(4).split(")")[0].split(n),r=[];for(var o in a){var i=a[o];i.indexOf("%")>-1&&(r[o]=255*Math.round(parseFloat(i.substr(0,i.length-1))/100))}return new e(r[0],r[1],r[2])}},{key:"fromHexString",value:function(t){if(7!==t.length)throw new TypeError("Hex string is not 7 characters long. Got: "+t);if("#"!==t[0])throw new TypeError("Hex color string should start with #. Got: "+t[0]);return new e(parseInt("0x"+t[1]+t[2],16),parseInt("0x"+t[3]+t[4],16),parseInt("0x"+t[5]+t[6],16))}}]),Object(C.a)(e,[{key:"toHex",value:function(){var e=Object(s.a)(this.rgb,3),t=e[0],n=e[1],a=e[2],r=t.toString(16),o=n.toString(16),i=a.toString(16);return 1===r.length&&(r="0"+r),1===o.length&&(o="0"+o),1===i.length&&(i="0"+i),"#"+r+o+i}},{key:"toHSL",value:function(){return m.fromRGB.apply(m,Object(j.a)(this.rgb))}},{key:"r",get:function(){return this.rgb[0]},set:function(e){this.rgb[0]=e}},{key:"g",get:function(){return this.rgb[1]},set:function(e){this.rgb[1]=e}},{key:"b",get:function(){return this.rgb[2]},set:function(e){this.rgb[2]=e}}],[{key:"Equals",value:function(e,t){var n=Object(s.a)(e.rgb,3),a=n[0],r=n[1],o=n[2],i=Object(s.a)(t.rgb,3),c=i[0],l=i[1],u=i[2];return a===c&&r===l&&o===u}}]),e}();y.NO_COLOR="NO_COLOR";var k,w,S=function(e){var t=e.setColorAndTurnOffPicker,n=e.color,o=(e.palette,e.pickerMode),i=e.pinnedColors,c=e.colorHistory,s=e.setColorHistory;return Object(r.useEffect)((function(){if(0===c.filter((function(e){return y.Equals(e,n)})).length){var e=Object(j.a)(c);e.unshift(n),e.length>8&&(e=e.slice(0,8)),s(e)}}),[n]),"history"===o?Object(a.jsx)(v,{setColorHistory:s,colorHistory:c,onColorPicked:t,colorSelected:n}):Object(a.jsx)(x,{onColorPicked:t,pinnedColors:i})},M=n(13),A=n(122),E=(n(84),function(e){var t=e.onCanvasCreated,n=e.onTouchEvent,o=e.pixelDimensions,i=Object(r.useRef)(null);Object(r.useEffect)((function(){var e=i.current;e&&t(e)}),[t]);var c=function(e){var t=i.current;t&&n(t,e)};return Object(a.jsx)("canvas",{className:"CanvasContainer",style:{backgroundSize:"".concat(100/o/2,"%")},ref:i,width:o,height:o,onTouchEnd:c,onTouchMove:c})}),R=(n(85),function(e){var t=e.pixelDimensions,n=e.rootCanvas,o=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=o.current,n=null===e||void 0===e?void 0:e.getContext("2d");if(n&&e){n.clearRect(0,0,e.width,e.height),n.strokeStyle="lightgrey",n.lineWidth=1;for(var a=e.width/t,r=0;r<t;r++)n.moveTo(Math.round(r*a),0),n.lineTo(Math.round(r*a),e.height),n.stroke();for(var i=e.height/t,c=0;c<t;c++)n.moveTo(0,Math.round(c*i)),n.lineTo(e.width,Math.round(c*i)),n.stroke();return function(){n.clearRect(0,0,e.width,e.height)}}})),Object(a.jsx)("canvas",{ref:o,className:"Grid",width:n.clientWidth,height:n.clientHeight},t)}),F=function(e){var t=e.isGridShown,n=e.pixelDimensions,o=e.onCanvasCreated,i=e.onCanvasTouch,c=e.stackProps,l=Object(r.useState)(),u=Object(s.a)(l,2),h=u[0],f=u[1];return Object(a.jsxs)(A.a,Object(M.a)(Object(M.a)({},c),{},{children:[Object(a.jsx)(E,{onCanvasCreated:function(e){f(e),o(e)},pixelDimensions:n,onTouchEvent:i}),h&&t&&Object(a.jsx)(R,{pixelDimensions:n,rootCanvas:h})]}))},T=n(123),P=n(121),H=n(101),B=function(e){var t=e.onClose,n=e.children,r=e.heading;return Object(a.jsx)(P.a,{modal:!0,full:"horizontal",onClickOutside:t,children:Object(a.jsxs)(b.a,{pad:"small",fill:!0,children:[Object(a.jsxs)(b.a,{direction:"row",fill:"horizontal",justify:"between",children:[Object(a.jsx)(b.a,{justify:"center",children:Object(a.jsx)(T.a,{children:r})}),Object(a.jsx)(b.a,{direction:"row",justify:"end",children:Object(a.jsx)(O.a,{icon:Object(a.jsx)(H.a,{}),onClick:function(){return t()}})})]}),Object(a.jsx)(b.a,{children:n})]})})},L=function(e){var t=e.onAccept,n=e.onCancel,r=e.onClose,o=e.message,i=void 0===o?"Are you sure?":o,c=e.cancelButtonText,s=void 0===c?"Cancel":c,l=e.acceptButtonText,u=void 0===l?"Accept":l;return Object(a.jsxs)(B,{onClose:r,heading:"Confirm?",children:[Object(a.jsx)(T.a,{alignSelf:"center",children:i}),Object(a.jsxs)(b.a,{direction:"row",justify:"between",gap:"small",children:[Object(a.jsx)(O.a,{label:s,onClick:n,alignSelf:"start"}),Object(a.jsx)(O.a,{primary:!0,label:u,onClick:t,alignSelf:"end"})]})]})},N=n(18),D=n(11),z=n(43),_=n(46),G=n(24);k=Symbol.iterator,w=Symbol.toStringTag;var q=function(){function e(t){if(Object(g.a)(this,e),this.map=new Map,this[w]=void 0,t){var n,a=Object(G.a)(t);try{for(a.s();!(n=a.n()).done;){var r=Object(s.a)(n.value,2),o=Object(s.a)(r[0],2),i=o[0],c=o[1],l=r[1];this.set([i,c],l)}}catch(u){a.e(u)}finally{a.f()}}}return Object(C.a)(e,[{key:"clear",value:function(){this.map.clear()}},{key:"delete",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return(null===(t=this.map.get(a))||void 0===t?void 0:t.delete(r))||!1}},{key:"clone",value:function(){return new e(this)}},{key:"forEach",value:function(e,t){this.toRefMap().forEach(e,t)}},{key:"toRefMap",value:function(){var e=new Map;return this.map.forEach((function(t,n,a){t.forEach((function(t,a,r){var o=[n,a];e.set(o,t)}))})),e}},{key:"get",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return null===(t=this.map.get(a))||void 0===t?void 0:t.get(r)}},{key:"has",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return(null===(t=this.map.get(a))||void 0===t?void 0:t.has(r))||!1}},{key:"set",value:function(e,t){var n=Object(s.a)(e,2),a=n[0],r=n[1];return this.map.has(a)||this.map.set(a,new Map),this.map.get(a).set(r,t),this}},{key:k,value:function(){return this.toRefMap()[Symbol.iterator]()}},{key:"entries",value:function(){return this.toRefMap().entries()}},{key:"keys",value:function(){return this.toRefMap().keys()}},{key:"values",value:function(){return this.toRefMap().values()}},{key:"toString",value:function(){var e,t=[],n=Object(G.a)(this);try{for(n.s();!(e=n.n()).done;){var a=Object(s.a)(e.value,2),r=a[0],o=a[1];t.push("".concat(r[0],", ").concat(r[1],", ").concat(o))}}catch(i){n.e(i)}finally{n.f()}return t.join("\n")}},{key:"size",get:function(){return this.toRefMap().size}}]),e}(),I=function(e){Object(z.a)(n,e);var t=Object(_.a)(n);function n(e){var a;return Object(g.a)(this,n),(a=t.call(this,e)).undoBuffer=void 0,a.cellExists=function(e,t){return a.getPixelMap().has([e,t])},a.undoBuffer=new U(a.getPixelMap().clone()),a}return Object(C.a)(n,[{key:"mutableMap",value:function(e){Object(N.a)(Object(D.a)(n.prototype),"mutableMap",this).call(this,e),this.undoBuffer.addCurrent(this.getPixelMap().clone())}},{key:"setColorAt",value:function(e,t,a){Object(N.a)(Object(D.a)(n.prototype),"setColorAt",this).call(this,e,t,a),this.undoBuffer.addCurrent(this.getPixelMap().clone())}},{key:"undo",value:function(){var e=this.undoBuffer.undo();this.setPixelMap(e)}},{key:"redo",value:function(){var e=this.undoBuffer.redoOne();void 0!==e&&this.setPixelMap(e)}},{key:"fillWithColor",value:function(e,t,n){var a=this.getColorAt(e,t),r=new q;this.getPixelMap().clone().forEach((function(e,t){var n=Object(s.a)(t,2),a=n[0],o=n[1];r.set([a,o],!1)})),this.floodFill(e,t,n,a,r),this.undoBuffer.addCurrent(this.getPixelMap().clone())}},{key:"floodFill",value:function(e,t,a,r,o){if(this.cellExists(e,t)&&!0!==o.get([e,t])){var i=this.getColorAt(e,t);n.AreColorsEqual(i,r)&&(Object(N.a)(Object(D.a)(n.prototype),"setColorAt",this).call(this,e,t,a),o.set([e,t],!0),!1===o.get([e,t+1])&&this.floodFill(e,t+1,a,r,o),!1===o.get([e,t-1])&&this.floodFill(e,t-1,a,r,o),!1===o.get([e+1,t])&&this.floodFill(e+1,t,a,r,o),!1===o.get([e-1,t])&&this.floodFill(e-1,t,a,r,o))}}}]),n}(function(){function e(t){Object(g.a)(this,e),this.pixelMap=new q,this.canvas=void 0;for(var n=0;n<t;n++)for(var a=0;a<t;a++){var r=[n,a],o=y.NO_COLOR;this.pixelMap.set(r,o)}}return Object(C.a)(e,[{key:"drawToCanvas",value:function(){if(void 0===this.canvas)throw new Error("Cannot draw to canvas, no canvas set");e.DrawToCanvas(this,this.canvas)}},{key:"tryDrawToCanvas",value:function(){try{return this.drawToCanvas(),!0}catch(e){return!1}}},{key:"setCanvas",value:function(t){if(!e.AreDimensionsCompatible(this,t))throw new RangeError("PaintCanvas and HTMLCanvas should be square and the same dimensions. Got PaintCanvas: ".concat(this.dimension()," canvas: ").concat(t.width,"x").concat(t.height));this.canvas=t}},{key:"hasCanvas",value:function(){return void 0!==this.canvas}},{key:"getCanvas",value:function(){return this.canvas}},{key:"getPixelMap",value:function(){return this.pixelMap}},{key:"setPixelMap",value:function(e){if(e.size!==this.pixelMap.size)throw new RangeError("Cannot set pixel map. Pixel maps are not the same dimensions");this.pixelMap=e.clone()}},{key:"setPixelsFromImage",value:function(e){var t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Could not get context for canvas");t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0),this.setPixelsFromCanvas(t)}},{key:"setPixelsFromCanvas",value:function(e){var t=e.getContext("2d");if(!t)throw new Error("Could not get context for canvas");var n=e.width/this.dimension(),a=e.height/this.dimension();this.mutableMap((function(e){var r=Object(s.a)(e,2),o=r[0],i=r[1],c=t.getImageData(o*n,i*a,1,1).data,l=Object(s.a)(c,4),u=l[0],h=l[1],f=l[2];return 0===l[3]?y.NO_COLOR:new y(u,h,f)}))}},{key:"clear",value:function(){this.mutableMap((function(){return y.NO_COLOR}))}},{key:"setColorAt",value:function(e,t,n){if(!this.pixelMap.has([e,t]))throw RangeError("Pixel at ".concat(e,",").concat(t," does not exist"));this.pixelMap.set([e,t],n)}},{key:"getColorAt",value:function(e,t){var n=this.pixelMap.get([e,t]);if(void 0===n)throw RangeError("Pixel at ".concat(e,",").concat(t," does not exist"));return n}},{key:"map",value:function(e){var t,n=new Array,a=Object(G.a)(this.pixelMap.entries());try{for(a.s();!(t=a.n()).done;){var r=Object(s.a)(t.value,2),o=e(r[0],r[1]);n.push(o)}}catch(i){a.e(i)}finally{a.f()}return n}},{key:"mutableMap",value:function(e){var t,n=Object(G.a)(this.pixelMap.entries());try{for(n.s();!(t=n.n()).done;){var a=Object(s.a)(t.value,2),r=a[0],o=e(r,a[1]);this.pixelMap.set(r,o)}}catch(i){n.e(i)}finally{n.f()}}},{key:"forEach",value:function(e){var t,n=Object(G.a)(this.pixelMap.entries());try{for(n.s();!(t=n.n()).done;){var a=Object(s.a)(t.value,2);e(a[0],a[1])}}catch(r){n.e(r)}finally{n.f()}}}],[{key:"DrawToCanvas",value:function(e,t){var n=t.getContext("2d");if(!n)throw new Error("Could not get context for canvas");e.forEach((function(e,t){var a=Object(s.a)(e,2),r=a[0],o=a[1];t!==y.NO_COLOR?(n.fillStyle=t.toHex(),n.fillRect(r,o,1,1)):n.clearRect(r,o,1,1)}))}},{key:"AreDimensionsCompatible",value:function(e,t){var n=t.width,a=t.height,r=e.dimension();return n===a&&r===n}}]),Object(C.a)(e,[{key:"dimension",value:function(){return Math.sqrt(this.pixelMap.size)}},{key:"touchEvent",value:function(e,t){var n=this.touchToCoords(e),a=n.quantX,r=n.quantY,o=this.getColorAt(a,r);"NO_COLOR"===t&&"NO_COLOR"===o||(("NO_COLOR"!==t||"NO_COLOR"===o)&&("NO_COLOR"===t||"NO_COLOR"!==o)?"NO_COLOR"!==t&&"NO_COLOR"!==o&&(y.Equals(t,o)||this.setColorAt(a,r,t)):this.setColorAt(a,r,t))}},{key:"touchToCoords",value:function(e){var t=function(e){var t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY,a=e.target.getBoundingClientRect(),r=function(e,t,n){return Math.min(n,Math.max(e,t))},o=r(t-a.left,0,a.width-1),i=r(n-a.top,0,a.height-1);return{relativeX:o/a.width,relativeY:i/a.height}}(e),n=t.relativeX,a=t.relativeY,r=n*this.dimension(),o=a*this.dimension();return{quantX:Math.floor(r),quantY:Math.floor(o)}}}]),e}());I.AreColorsEqual=function(e,t){return"NO_COLOR"===e&&"NO_COLOR"===t||("NO_COLOR"!==e||"NO_COLOR"===t)&&(("NO_COLOR"===e||"NO_COLOR"!==t)&&!("NO_COLOR"===e||"NO_COLOR"===t||!y.Equals(e,t)))};var U=function(e){Object(z.a)(n,e);var t=Object(_.a)(n);function n(){var e;Object(g.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).redoBuffer=new Array,e}return Object(C.a)(n,[{key:"undo",value:function(){var e=this.top();return void 0!==e&&this.getBufferLength()>1&&this.redoBuffer.push(e),Object(N.a)(Object(D.a)(n.prototype),"undo",this).call(this)}},{key:"addCurrent",value:function(e){this.redoBuffer=[],Object(N.a)(Object(D.a)(n.prototype),"addCurrent",this).call(this,e)}},{key:"getUndoSize",value:function(){return Object(N.a)(Object(D.a)(n.prototype),"getUndoSize",this).call(this)}},{key:"getRedoSize",value:function(){return this.redoBuffer.length}},{key:"redoOne",value:function(){var e=this.redoBuffer.pop();return void 0!==e&&Object(N.a)(Object(D.a)(n.prototype),"addCurrent",this).call(this,e),e}},{key:"clear",value:function(){this.redoBuffer=[],Object(N.a)(Object(D.a)(n.prototype),"clear",this).call(this)}}]),n}(function(){function e(t,n){Object(g.a)(this,e),this.base=t,this.maxSize=n,this.buffer=void 0,this.buffer=[t]}return Object(C.a)(e,[{key:"top",value:function(){return this.buffer[this.buffer.length-1]}},{key:"undo",value:function(){this.buffer.pop();var e=this.buffer[this.buffer.length-1];return e||(this.buffer=[this.base],this.base)}},{key:"addCurrent",value:function(e){this.buffer.push(e),this.maxSize&&this.maxSize<this.buffer.length&&(this.buffer=this.buffer.slice(-this.maxSize-2))}},{key:"getUndoSize",value:function(){return Math.max(this.buffer.length-2,0)}},{key:"getBufferLength",value:function(){return this.buffer.length}},{key:"clear",value:function(){this.buffer=[]}}]),e}()),W=n(103),X=n(104),Y=n(22),J=n.n(Y),K=n(33),Q=n(102),V=function(e){var t=e.canvas,n=Object(r.useRef)(null),o=function(){var e=Object(K.a)(J.a.mark((function e(a){var r,o,i,c;return J.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Z(t),e.prev=1,e.next=4,new Promise((function(e,t){r.toBlob((function(n){n?e(n):t(new Error("Unable to convert canvas to blob"))}),"image/png")}));case 4:if(o=e.sent,"https:"===document.location.protocol){e.next=7;break}throw new Error("Could not share. Page is not HTTPS.");case 7:if(void 0!==navigator.share){e.next=9;break}throw new Error("Share unsupported in this browser");case 9:if(i=Object.freeze([new File([o],"my-pixel-art.png",{type:o.type})]),navigator.canShare&&navigator.canShare({files:i})){e.next=12;break}throw new Error("File sharing unsupported in this browser");case 12:return e.next=14,navigator.share({title:"My pixel art",files:i}).catch((function(e){if("AbortError"!==e.name)throw e;console.debug("User cancelled share")}));case 14:e.next=22;break;case 16:e.prev=16,e.t0=e.catch(1),console.debug("Could not use share api, using image download"),console.debug(e.t0),c=r.toDataURL("image/png"),n.current&&(n.current.href=c,n.current.click());case 22:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(O.a,{icon:Object(a.jsx)(Q.a,{}),onClick:o}),Object(a.jsx)("a",{ref:n,href:"/",style:{display:"none"},download:"my-pixel-art.png"})]})};function Z(e){var t=document.createElement("canvas");t.width=1024,t.height=1024;var n=t.getContext("2d");return n.imageSmoothingEnabled=!1,n.drawImage(e,0,0,t.width,t.height),t}var $=function(e){var t=e.canvas,n=e.onAddButtonClicked,r=e.setSettingsMenuShown,o=e.gridArea;return Object(a.jsx)(b.a,{gridArea:o,pad:{left:"small",right:"small"},children:Object(a.jsxs)(h.a,{columns:{count:3,size:["auto","auto","auto"]},fill:!0,gap:"small",children:[Object(a.jsx)(b.a,{align:"start",children:Object(a.jsx)(O.a,{icon:Object(a.jsx)(W.a,{}),onClick:function(){return r(!0)}})}),Object(a.jsx)(b.a,{align:"center",children:Object(a.jsx)(O.a,{icon:Object(a.jsx)(X.a,{}),onClick:n})}),Object(a.jsx)(b.a,{align:"end",children:Object(a.jsx)(V,{canvas:t})})]})})},ee=n(117),te={"1x1":1,"8x8":8,"10x10":10,"12x12":12,"14x14":14,"16x16":16,"18x18":18,"20x20":20,"22x22":22,"24x24":24},ne={1:"1x1",8:"8x8",10:"10x10",12:"12x12",14:"14x14",16:"16x16",18:"18x18",20:"20x20",22:"22x22",24:"24x24"},ae=["1x1","8x8","10x10","12x12","14x14","16x16","18x18","20x20","22x22","24x24"],re=function(e){var t=e.dimension,n=e.onDimensionChange;return Object(a.jsx)(ee.a,{name:"Select Dimensions",placeholder:"8x8",value:ne[t],options:ae,onChange:function(e){var t=e.option;return n(te[t])}})},oe=function(e){var t=e.setLoadedImage,n=Object(r.useRef)(null),o=Object(r.useState)("No File Chosen"),i=Object(s.a)(o,2),c=i[0],l=i[1];return Object(a.jsxs)(b.a,{direction:"row",gap:"small",children:[Object(a.jsx)(O.a,{label:"Choose File",onClick:function(){var e=n.current;e&&e.click()}}),Object(a.jsx)(T.a,{alignSelf:"center",onClick:function(){var e=n.current;e&&e.click()},children:c}),Object(a.jsx)("input",{ref:n,style:{display:"none"},onChange:function(){var e=Object(K.a)(J.a.mark((function e(n){var a,r,o,i;return J.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=new Promise((function(e,t){if(n.target.files&&n.target.files[0]){var a=URL.createObjectURL(n.target.files[0]),r=new Image;r.src=a,r.onload=function(){return e(r)}}})),e.next=3,o;case 3:i=e.sent,l((null===(a=n.target.files)||void 0===a||null===(r=a[0])||void 0===r?void 0:r.name)||"No File Chosen"),t(i);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),type:"file",accept:"image/*"})]})},ie=function(e){var t=e.currentDimension,n=e.onCancel,o=e.onCreateNew,i=Object(r.useState)(),c=Object(s.a)(i,2),l=c[0],u=c[1],f=Object(r.useState)(t),d=Object(s.a)(f,2),j=d[0],v=d[1];return Object(r.useEffect)((function(){v(t)}),[t]),Object(a.jsxs)(B,{onClose:n,heading:"New Drawing",children:[Object(a.jsxs)(b.a,{pad:{top:"small",bottom:"small"},gap:"small",children:[Object(a.jsx)(T.a,{children:"Canvas Dimensions"}),Object(a.jsx)(re,{onDimensionChange:v,dimension:j})]}),Object(a.jsxs)(b.a,{pad:{top:"small",bottom:"small"},gap:"small",children:[Object(a.jsx)(T.a,{children:"Upload Image (optional)"}),Object(a.jsx)(oe,{setLoadedImage:u})]}),Object(a.jsxs)(h.a,{columns:{count:2,size:["auto","auto"]},gap:"small",pad:{top:"medium",bottom:"small"},children:[Object(a.jsx)(O.a,{label:"Cancel",onClick:n}),Object(a.jsx)(O.a,{primary:!0,label:"Create New",onClick:function(){return o(j,l)}})]})]})},ce=n(105),se={c64:["#000000","#FFFFFF","#880000","#AAFFEE","#DD8855","#664400","#FF7777","#333333","#CC44CC","#00CC55","#0000AA","#EEEE77","#777777","#AAFF66","#0088FF","#BBBBBB"],cga:["#000000","#0000AA","#00AA00","#00AAAA","#555555","#5555FF","#55FF55","#55FFFF","#AA0000","#AA00AA","#AA5500","#AAAAAA","#FF5555","#FF55FF","#FFFF55","#FFFFFF"],teletext:["#000000","#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ffffff"]},le={c64:"Commodore 64",cga:"DOS CGA/ EGA",teletext:"Teletext"},ue=["Commodore 64","DOS CGA/ EGA","Teletext"],he={"Commodore 64":"c64","DOS CGA/ EGA":"cga",Teletext:"teletext"},fe=function(e){var t=e.palette,n=e.onPaletteChange,r=le;return Object(a.jsx)(ee.a,{name:"Select Palette",placeholder:r.c64,value:le[t],options:ue,onChange:function(e){var t=e.option;return n(he[t])}})},de=function(e){var t=e.onCancel,n=e.setColor,o=e.palette,i=e.pinnedColors,c=e.setPinnedColors,s=e.setPalette,l=se[o].map(y.fromHexString),u=function(e,t,n){var a=Object(r.useRef)(),o=Object(r.useRef)(!1),i=function(){a.current&&clearTimeout(a.current),a.current=void 0};return{onPressDown:function(n){a.current=setTimeout((function(){o.current=!0,e(n),i()}),t)},onPressUp:function(e){void 0!==a.current&&(i(),null===n||void 0===n||n(e))},wasLongPress:o}}((function(e){var t=je(e);if(void 0!==t){var n=l[t];if(!!i.find((function(e){return y.Equals(e,n)}))){var a=Object(j.a)(i).filter((function(e){return!y.Equals(n,e)}));c(a)}else{var r=Object(j.a)(i);r.push(n),c(r)}}}),500,(function(e){if(void 0!==e){var a=je(e);if(void 0!==a){var r=l[a];n(r),t()}}})),h=u.onPressDown,f=u.onPressUp;return Object(a.jsxs)(B,{onClose:t,heading:"Palette",children:[Object(a.jsx)(b.a,{fill:!0,pad:{top:"small",bottom:"small"},gap:"small",children:Object(a.jsx)(b.a,{direction:"row",wrap:!0,justify:"between",alignSelf:"center",onTouchStart:h,onTouchEnd:f,children:Object.values(l).map((function(e,t){var r=!!i.find((function(t){return y.Equals(t,e)}));return Object(a.jsx)(b.a,{height:"xsmall",width:"xsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(O.a,{primary:!0,fill:"vertical",size:"large",onClick:function(){return n(e)},"data-index":t,color:e.toHex(),icon:r?Object(a.jsx)(ce.a,{}):void 0,style:{borderRadius:"0",border:"none"}},t)},t)}))})}),Object(a.jsx)(b.a,{pad:{top:"small",bottom:"small"},gap:"small",children:Object(a.jsx)(fe,{palette:o,onPaletteChange:s})})]})};function je(e){var t=e.target.dataset.index;if(t)return parseInt(t,10)}var be=n(125),Oe=function(e){var t=e.onClickOutside,n=e.resetMode,r=e.isDarkMode;return Object(a.jsx)(B,{onClose:t,heading:"Settings",children:Object(a.jsx)(be.a,{toggle:!0,onChange:function(e){return n(e.target.checked)},label:"Dark Mode",checked:r})})},ve=n(106),xe=n(107),pe=n(108),ge=n(109),Ce=n(110),me=n(111),ye=n(112),ke=n(113),we=n(9),Se=function(e){return Object(a.jsx)(we.StyledIcon,Object(M.a)(Object(M.a)({viewBox:"0 0 6.35 6.35",a11yTitle:"Dropper"},e),{},{children:Object(a.jsxs)("g",{fill:"none",stroke:"#000",strokeWidth:".52917",children:[Object(a.jsx)("path",{d:"m5.5002.60932c-.20131-.12441-.4432-.27888-.67352-.22451-.30901.072947-.38019.55202-.67352.67352-.13828.057276-.44901 0-.44901 0l-.22451.22451.22451.22451-2.9186 2.9186-.44901 1.347.22451.22451 1.347-.44901 2.9186-2.9186.22451.22451.22451-.22451s-.057276-.31073 1e-7-.44901c.1215-.29333.60057-.36451.67352-.67352.054371-.23032-.10009-.47221-.22451-.67352-.05564-.090027-.13448-.16887-.22451-.22451z"}),Object(a.jsx)("path",{d:"m3.7042 1.5073 1.1225 1.1225"})]})}))},Me=function(e){return Object(a.jsxs)(we.StyledIcon,Object(M.a)(Object(M.a)({viewBox:"0 0 6.35 6.35",a11yTitle:"Palette"},e),{},{children:[Object(a.jsx)("path",{xmlns:"http://www.w3.org/2000/svg",d:"m5.926 3.1543c-.037745.39288-.36536.56457-.83971.54908-.38933-.01271-1.2873-.15741-1.475.24331-.22247.47492.58533.95042.5725 1.4362-.011288.42757-.61548.57263-1.0208.57263-1.526 0-2.763-1.2542-2.763-2.8012 2e-8-1.5471 1.237-2.8012 2.763-2.8012 1.526 0 2.911 1.2612 2.763 2.8012z",fillOpacity:"0",strokeWidth:".52917"}),Object(a.jsx)("circle",{cx:"1.5769",cy:"3.5063",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"1.8923",cy:"2.1661",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"3.8408",cy:"1.7492",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"2.7456",cy:"1.4877",r:"0.3784252",stroke:"none"})]}))},Ae=n(67),Ee=function(e){var t=e.onClick,n=e.isHighlighted,r=Object(Ae.a)(e,["onClick","isHighlighted"]);return Object(a.jsx)(O.a,Object(M.a)({onClick:t,style:{borderRadius:"18px",boxShadow:n?"0 0 2px 2px green":"none"}},r))},Re=function(e){var t=e.onToolChange,n=e.onPickerModeClick,r=e.onUndoClick,o=e.onRedoClick,i=e.onPaletteButtonClick,c=e.onGridButtonClick,s=e.onTrashClick,l=e.isGridShown,u=e.color,f=e.pickerMode,d=e.tool;return Object(a.jsx)(b.a,{height:"xsmall",children:Object(a.jsxs)(h.a,{fill:!0,columns:["auto","auto"],rows:["flex","flex"],areas:[{name:"left-top",start:[0,0],end:[0,0]},{name:"left-bot",start:[0,1],end:[0,1]},{name:"right-top",start:[1,0],end:[1,0]},{name:"right-bot",start:[1,1],end:[1,1]}],children:[Object(a.jsxs)(b.a,{gridArea:"left-top",direction:"row",children:[Object(a.jsx)(Ee,{primary:!0,onClick:function(){return t("paint")},isHighlighted:"paint"===d,icon:Object(a.jsx)(ve.a,{}),color:u.toHex()}),Object(a.jsx)(Ee,{onClick:function(){return t("eraser")},isHighlighted:"eraser"===d,icon:Object(a.jsx)(xe.a,{})}),Object(a.jsx)(Ee,{primary:!0,onClick:function(){return t("fill")},isHighlighted:"fill"===d,icon:Object(a.jsx)(pe.a,{}),color:u.toHex()}),Object(a.jsx)(O.a,{onClick:i,icon:Object(a.jsx)(Me,{})}),Object(a.jsx)(Ee,{onClick:function(){return t("dropper")},isHighlighted:"dropper"===d,icon:Object(a.jsx)(Se,{})})]}),Object(a.jsxs)(b.a,{gridArea:"left-bot",direction:"row",children:[Object(a.jsx)(Ee,{icon:Object(a.jsx)(ge.a,{}),onClick:function(){return n("history")},isHighlighted:"history"===f}),Object(a.jsx)(Ee,{icon:Object(a.jsx)(ce.a,{}),onClick:function(){return n("pinned")},isHighlighted:"pinned"===f})]}),Object(a.jsxs)(b.a,{gridArea:"right-top",direction:"row",justify:"end",children:[Object(a.jsx)(O.a,{icon:Object(a.jsx)(Ce.a,{}),onClick:r}),Object(a.jsx)(O.a,{icon:Object(a.jsx)(me.a,{}),onClick:o})]}),Object(a.jsxs)(b.a,{gridArea:"right-bot",direction:"row",justify:"end",children:[Object(a.jsx)(O.a,{onClick:s,icon:Object(a.jsx)(ye.a,{})}),Object(a.jsx)(Ee,{onClick:c,isHighlighted:l,icon:Object(a.jsx)(ke.a,{})})]})]})})},Fe=function(e,t){var n=Object(r.useState)(e),a=Object(s.a)(n,2),o=a[0],i=a[1];return[o,Object(r.useCallback)((function(e){switch(e){case"fill":i("fill");break;case"paint":i("paint")}t(e)}),[t])]},Te=function(){var e=Object(r.useState)(16),t=Object(s.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(y.fromHexString("#5555ff")),c=Object(s.a)(i,2),j=c[0],b=c[1],O=Object(r.useState)(void 0),v=Object(s.a)(O,2),x=v[0],p=v[1],g=Object(r.useState)("paint"),C=Object(s.a)(g,2),m=C[0],k=C[1],w=Fe("paint",k),M=Object(s.a)(w,2),A=M[0],E=M[1],R=Object(r.useState)("pinned"),T=Object(s.a)(R,2),P=T[0],H=T[1],B=Object(r.useState)(!1),N=Object(s.a)(B,2),D=N[0],z=N[1],_=Object(r.useState)(!1),G=Object(s.a)(_,2),q=G[0],U=G[1],W=Object(r.useState)("cga"),X=Object(s.a)(W,2),Y=X[0],J=X[1],K=Object(r.useState)(!1),Q=Object(s.a)(K,2),V=Q[0],Z=Q[1],ee=Object(r.useState)(!1),te=Object(s.a)(ee,2),ne=te[0],ae=te[1],re=Object(r.useState)(!1),oe=Object(s.a)(re,2),ce=oe[0],se=oe[1],le=Object(r.useState)(),ue=Object(s.a)(le,2),he=ue[0],fe=ue[1],je=Object(r.useState)([]),be=Object(s.a)(je,2),ve=be[0],xe=be[1],pe=Object(r.useState)([]),ge=Object(s.a)(pe,2),Ce=ge[0],me=ge[1],ye=Object(r.useMemo)((function(){return new I(n)}),[n]),ke=function(e){b(e),k(A)},we=!!x;return Object(a.jsxs)(l.a,{theme:u.a,style:{height:"100%"},themeMode:ce?"dark":"light",children:[Object(a.jsxs)(h.a,{fill:!0,areas:[{name:"header",start:[0,0],end:[0,0]},{name:"canvas",start:[0,1],end:[0,1]},{name:"body",start:[0,2],end:[0,2]},{name:"footer",start:[0,3],end:[0,3]}],columns:["full"],rows:["xxsmall","auto","flex","xxsmall"],children:[Object(a.jsx)(f.a,{gridArea:"header",justify:"center",children:"Pixel Pixy"}),Object(a.jsx)(F,{stackProps:{gridArea:"canvas",interactiveChild:"first"},isGridShown:D,isPaletteMenuShown:q,onCanvasCreated:function(e){fe(e),ye.setCanvas(e)},onCanvasTouch:function(e,t){switch(m){case"dropper":k(A);var n=ye.touchToCoords(t),a=ye.getColorAt(n.quantX,n.quantY);if(a===y.NO_COLOR)break;b(a);break;case"paint":ye.setCanvas(e),ye.touchEvent(t,j),ye.drawToCanvas();break;case"eraser":ye.setCanvas(e),ye.touchEvent(t,y.NO_COLOR),ye.drawToCanvas();break;case"fill":ye.setCanvas(e);var r=ye.touchToCoords(t);ye.fillWithColor(r.quantX,r.quantY,j),ye.drawToCanvas()}},pixelDimensions:n}),Object(a.jsxs)(d.a,{gridArea:"body",pad:"small",elevation:"xsmall",children:[Object(a.jsx)(Re,{color:j,tool:m,isGridShown:D,onPickerModeClick:H,onToolChange:E,onGridButtonClick:function(){return z(!D)},onPaletteButtonClick:function(){return U(!q)},onRedoClick:function(){ye.redo(),ye.drawToCanvas()},onUndoClick:function(){ye.undo(),ye.drawToCanvas()},onTrashClick:function(){return p({onAccept:function(){p(void 0),ye.clear(),ye.drawToCanvas()},message:"Are you sure you want to clear the canvas?",acceptButtonText:"Clear",onCancel:function(){p(void 0)},onClose:function(){return p(void 0)}})},pickerMode:P}),Object(a.jsx)(S,{setColorHistory:me,colorHistory:Ce,pickerMode:P,color:j,palette:Y,pinnedColors:ve,setColorAndTurnOffPicker:ke})]}),he&&Object(a.jsx)($,{gridArea:"footer",canvas:he,onAddButtonClicked:function(){return Z(!0)},setSettingsMenuShown:ae})]}),q&&Object(a.jsx)(de,{pinnedColors:ve,setPinnedColors:xe,onCancel:function(){return U(!1)},setColor:ke,palette:Y,setPalette:J}),we&&Object(a.jsx)(L,{onClose:x.onClose,onAccept:x.onAccept,onCancel:x.onCancel,cancelButtonText:x.cancelButtonText,acceptButtonText:x.acceptButtonText,message:x.message}),V&&Object(a.jsx)(ie,{currentDimension:n,onCancel:function(){return Z(!1)},onCreateNew:function(e,t){ye.clear(),e!==n&&o(e),void 0!==t&&ye.setPixelsFromImage(t),ye.drawToCanvas(),Z(!1)}}),ne&&Object(a.jsx)(Oe,{isDarkMode:ce,onClickOutside:function(){return ae(!1)},resetMode:se})]})};window.oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1},c.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(Te,{})}),document.getElementById("root"))}},[[89,1,2]]]);
//# sourceMappingURL=main.9e420a84.chunk.js.map