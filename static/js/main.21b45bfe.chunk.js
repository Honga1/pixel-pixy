(this["webpackJsonppixel-pixy"]=this["webpackJsonppixel-pixy"]||[]).push([[0],{77:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),o=n.n(r),i=n(19),c=n.n(i),s=(n(77),n(4)),l=n(114),u=n(111),h=n(120),f=n(117),d=n(15),j=n(113),b=n(51),O=n(16),v=n(12),x=function(){function e(t,n,a){Object(O.a)(this,e),this.hsl=void 0,this.hsl=[t,n,a]}return Object(v.a)(e,null,[{key:"fromHSLString",value:function(t){var n=t.indexOf(",")>-1?",":" ",a=t.substr(4).split(")")[0].split(n),r=a[0],o=parseFloat(a[1].substr(0,a[1].length-1))/100,i=parseFloat(a[2].substr(0,a[2].length-1))/100,c=0;return r.indexOf("deg")>-1?r=r.substr(0,r.length-3):r.indexOf("rad")>-1?c=Math.round(parseFloat(r.substr(0,r.length-3))*(180/Math.PI)):r.indexOf("turn")>-1&&(c=Math.round(360*parseFloat(r.substr(0,r.length-4)))),c>=360&&(c%=360),new e(c,o,i)}},{key:"fromRGB",value:function(t,n,a){t/=255,n/=255,a/=255;var r,o=Math.min(t,n,a),i=Math.max(t,n,a),c=i-o,s=0;return s=0===c?0:i===t?(n-a)/c%6:i===n?(a-t)/c+2:(t-n)/c+4,(s=Math.round(60*s))<0&&(s+=360),r=(i+o)/2,new e(s,0===c?0:c/(1-Math.abs(2*r-1)),r)}}]),Object(v.a)(e,[{key:"toHSLString",value:function(){var e=Object(s.a)(this.hsl,3);return"hsl("+e[0]+","+100*e[1]+"%,"+100*e[2]+"%)"}},{key:"toRGB",value:function(){return p.fromHSL.apply(p,Object(d.a)(this.hsl))}},{key:"clone",value:function(){return Object(b.a)(e,Object(d.a)(this.hsl))}},{key:"h",get:function(){return this.hsl[0]},set:function(e){this.hsl[0]=e}},{key:"s",get:function(){return this.hsl[1]},set:function(e){this.hsl[1]=e}},{key:"l",get:function(){return this.hsl[2]},set:function(e){this.hsl[2]=e}}]),e}(),p=function(){function e(t,n,a){Object(O.a)(this,e),this.rgb=void 0,this.rgb=[t,n,a]}return Object(v.a)(e,null,[{key:"fromHSL",value:function(t,n,a){if(t<0||t>359)throw new RangeError("Hue should be between 0 and 359 inclusive");if(n<0||n>1)throw new RangeError("Saturation is a percentage and should be between 0 and 1 inclusive");if(a<0||a>1)throw new RangeError("Lightness is a percentage and should be between 0 and 1 inclusive");var r=(1-Math.abs(2*a-1))*n,o=r*(1-Math.abs(t/60%2-1)),i=a-r/2,c=0,s=0,l=0;return 0<=t&&t<60?(c=r,s=o,l=0):60<=t&&t<120?(c=o,s=r,l=0):120<=t&&t<180?(c=0,s=r,l=o):180<=t&&t<240?(c=0,s=o,l=r):240<=t&&t<300?(c=o,s=0,l=r):300<=t&&t<360&&(c=r,s=0,l=o),new e(c=Math.round(255*(c+i)),s=Math.round(255*(s+i)),l=Math.round(255*(l+i)))}},{key:"fromHex",value:function(t){if(!Number.isInteger(t))throw new TypeError("Number should be an integer, got: ".concat(t));if(t<0||t>26)throw new RangeError("Number should be between 0-16777215 inclusive");var n=t.toString(16);return e.fromHexString("#"+n)}},{key:"fromRGBString",value:function(t){var n=t.indexOf(",")>-1?",":" ",a=t.substr(4).split(")")[0].split(n),r=[];for(var o in a){var i=a[o];i.indexOf("%")>-1&&(r[o]=255*Math.round(parseFloat(i.substr(0,i.length-1))/100))}return new e(r[0],r[1],r[2])}},{key:"fromHexString",value:function(t){if(7!==t.length)throw new TypeError("Hex string is not 7 characters long. Got: "+t);if("#"!==t[0])throw new TypeError("Hex color string should start with #. Got: "+t[0]);return new e(parseInt("0x"+t[1]+t[2],16),parseInt("0x"+t[3]+t[4],16),parseInt("0x"+t[5]+t[6],16))}}]),Object(v.a)(e,[{key:"toHex",value:function(){var e=Object(s.a)(this.rgb,3),t=e[0],n=e[1],a=e[2],r=t.toString(16),o=n.toString(16),i=a.toString(16);return 1===r.length&&(r="0"+r),1===o.length&&(o="0"+o),1===i.length&&(i="0"+i),"#"+r+o+i}},{key:"toHSL",value:function(){return x.fromRGB.apply(x,Object(d.a)(this.rgb))}},{key:"r",get:function(){return this.rgb[0]},set:function(e){this.rgb[0]=e}},{key:"g",get:function(){return this.rgb[1]},set:function(e){this.rgb[1]=e}},{key:"b",get:function(){return this.rgb[2]},set:function(e){this.rgb[2]=e}}],[{key:"Equals",value:function(e,t){var n=Object(s.a)(e.rgb,3),a=n[0],r=n[1],o=n[2],i=Object(s.a)(t.rgb,3),c=i[0],l=i[1],u=i[2];return a===c&&r===l&&o===u}}]),e}();p.NO_COLOR="NO_COLOR";var g,m,C=function(e){var t=e.colorSelected,n=e.onColorPicked,o=Object(r.useState)([]),i=Object(s.a)(o,2),c=i[0],l=i[1];return Object(r.useEffect)((function(){if(0===c.filter((function(e){return p.Equals(e,t)})).length){var e=Object(d.a)(c);e.unshift(t),e.length>8&&(e=e.slice(0,8)),l(e)}}),[t]),Object(a.jsx)(f.a,{className:"ColorPickerHistory",direction:"row",justify:"start",wrap:!0,gap:"xxsmall",children:c.map((function(e,t){return Object(a.jsx)(f.a,{height:"xxsmall",width:"xxsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(j.a,{fill:"vertical",size:"small",onClick:function(){return n(e)},style:{backgroundColor:e.toHex(),border:"none"}},t)},e.toHex())}))})},k=function(e){var t=e.pinnedColors,n=void 0===t?[]:t,r=e.onColorPicked;return Object(a.jsx)(f.a,{className:"ColorPickerHistory",direction:"row",justify:"start",wrap:!0,gap:"xxsmall",children:n.slice(0,8).map((function(e,t){return Object(a.jsx)(f.a,{height:"xxsmall",width:"xxsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(j.a,{fill:"vertical",size:"small",onClick:function(){return r(e)},style:{backgroundColor:e.toHex(),border:"none"}},t)},e.toHex())}))})},y=function(e){var t=e.setColorAndTurnOffPicker,n=e.color,r=(e.palette,e.pickerMode),o=e.pinnedColors;return"history"===r?Object(a.jsx)(C,{onColorPicked:t,colorSelected:n}):Object(a.jsx)(k,{onColorPicked:t,pinnedColors:o})},w=n(13),S=n(118),M=(n(83),function(e){var t=e.onCanvasCreated,n=e.onTouchEvent,o=e.pixelDimensions,i=Object(r.useRef)(null);Object(r.useEffect)((function(){var e=i.current;e&&t(e)}),[t]);var c=function(e){var t=i.current;t&&n(t,e)};return Object(a.jsx)("canvas",{className:"CanvasContainer",style:{backgroundSize:"".concat(100/o/2,"%")},ref:i,width:o,height:o,onTouchEnd:c,onTouchMove:c})}),A=(n(84),function(e){var t=e.pixelDimensions,n=e.rootCanvas,o=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=o.current,n=null===e||void 0===e?void 0:e.getContext("2d");if(n&&e){n.clearRect(0,0,e.width,e.height),n.strokeStyle="lightgrey",n.lineWidth=1;for(var a=e.width/t,r=0;r<t;r++)n.moveTo(Math.round(r*a),0),n.lineTo(Math.round(r*a),e.height),n.stroke();for(var i=e.height/t,c=0;c<t;c++)n.moveTo(0,Math.round(c*i)),n.lineTo(e.width,Math.round(c*i)),n.stroke();return function(){n.clearRect(0,0,e.width,e.height)}}})),Object(a.jsx)("canvas",{ref:o,className:"Grid",width:n.clientWidth,height:n.clientHeight},t)}),R=function(e){var t=e.isGridShown,n=e.pixelDimensions,o=e.onCanvasCreated,i=e.onCanvasTouch,c=e.stackProps,l=Object(r.useState)(),u=Object(s.a)(l,2),h=u[0],f=u[1];return Object(a.jsxs)(S.a,Object(w.a)(Object(w.a)({},c),{},{children:[Object(a.jsx)(M,{onCanvasCreated:function(e){f(e),o(e)},pixelDimensions:n,onTouchEvent:i}),h&&t&&Object(a.jsx)(A,{pixelDimensions:n,rootCanvas:h})]}))},T=n(116),E=n(119),F=function(e){var t=e.onAccept,n=e.onCancel,r=e.message,o=void 0===r?"Are you sure?":r,i=e.cancelButtonText,c=void 0===i?"Cancel":i,s=e.acceptButtonText,l=void 0===s?"Accept":s;return Object(a.jsx)(T.a,{modal:!0,position:"center",responsive:!1,full:"horizontal",onClickOutside:n,children:Object(a.jsxs)(f.a,{gap:"small",pad:"small",children:[Object(a.jsx)(E.a,{alignSelf:"center",children:o}),Object(a.jsxs)(f.a,{direction:"row",justify:"between",gap:"small",children:[Object(a.jsx)(j.a,{label:c,onClick:n,alignSelf:"start"}),Object(a.jsx)(j.a,{primary:!0,label:l,onClick:t,alignSelf:"end"})]})]})})},P=n(17),B=n(11),H=n(41),L=n(45),D=n(26);g=Symbol.iterator,m=Symbol.toStringTag;var N=function(){function e(t){if(Object(O.a)(this,e),this.map=new Map,this[m]=void 0,t){var n,a=Object(D.a)(t);try{for(a.s();!(n=a.n()).done;){var r=Object(s.a)(n.value,2),o=Object(s.a)(r[0],2),i=o[0],c=o[1],l=r[1];this.set([i,c],l)}}catch(u){a.e(u)}finally{a.f()}}}return Object(v.a)(e,[{key:"clear",value:function(){this.map.clear()}},{key:"delete",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return(null===(t=this.map.get(a))||void 0===t?void 0:t.delete(r))||!1}},{key:"clone",value:function(){return new e(this)}},{key:"forEach",value:function(e,t){this.toRefMap().forEach(e,t)}},{key:"toRefMap",value:function(){var e=new Map;return this.map.forEach((function(t,n,a){t.forEach((function(t,a,r){var o=[n,a];e.set(o,t)}))})),e}},{key:"get",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return null===(t=this.map.get(a))||void 0===t?void 0:t.get(r)}},{key:"has",value:function(e){var t,n=Object(s.a)(e,2),a=n[0],r=n[1];return(null===(t=this.map.get(a))||void 0===t?void 0:t.has(r))||!1}},{key:"set",value:function(e,t){var n=Object(s.a)(e,2),a=n[0],r=n[1];return this.map.has(a)||this.map.set(a,new Map),this.map.get(a).set(r,t),this}},{key:g,value:function(){return this.toRefMap()[Symbol.iterator]()}},{key:"entries",value:function(){return this.toRefMap().entries()}},{key:"keys",value:function(){return this.toRefMap().keys()}},{key:"values",value:function(){return this.toRefMap().values()}},{key:"toString",value:function(){var e,t=[],n=Object(D.a)(this);try{for(n.s();!(e=n.n()).done;){var a=Object(s.a)(e.value,2),r=a[0],o=a[1];t.push("".concat(r[0],", ").concat(r[1],", ").concat(o))}}catch(i){n.e(i)}finally{n.f()}return t.join("\n")}},{key:"size",get:function(){return this.toRefMap().size}}]),e}(),z=function(e){Object(H.a)(n,e);var t=Object(L.a)(n);function n(e){var a;return Object(O.a)(this,n),(a=t.call(this,e)).undoBuffer=void 0,a.undoBuffer=new G(a.getPixelMap().clone()),a}return Object(v.a)(n,[{key:"mutableMap",value:function(e){Object(P.a)(Object(B.a)(n.prototype),"mutableMap",this).call(this,e),this.undoBuffer.addCurrent(this.getPixelMap().clone())}},{key:"setColorAt",value:function(e,t,a){Object(P.a)(Object(B.a)(n.prototype),"setColorAt",this).call(this,e,t,a),this.undoBuffer.addCurrent(this.getPixelMap().clone())}},{key:"undo",value:function(){var e=this.undoBuffer.undo();this.setPixelMap(e)}},{key:"redo",value:function(){var e=this.undoBuffer.redoOne();void 0!==e&&this.setPixelMap(e)}}]),n}(function(){function e(t){Object(O.a)(this,e),this.pixelMap=new N,this.canvas=void 0;for(var n=0;n<t;n++)for(var a=0;a<t;a++){var r=[n,a],o=p.NO_COLOR;this.pixelMap.set(r,o)}}return Object(v.a)(e,[{key:"drawToCanvas",value:function(){if(void 0===this.canvas)throw new Error("Cannot draw to canvas, no canvas set");e.DrawToCanvas(this,this.canvas)}},{key:"tryDrawToCanvas",value:function(){try{return this.drawToCanvas(),!0}catch(e){return!1}}},{key:"setCanvas",value:function(t){if(!e.AreDimensionsCompatible(this,t))throw new RangeError("PaintCanvas and HTMLCanvas should be square and the same dimensions. Got PaintCanvas: ".concat(this.dimension()," canvas: ").concat(t.width,"x").concat(t.height));this.canvas=t}},{key:"hasCanvas",value:function(){return void 0!==this.canvas}},{key:"getCanvas",value:function(){return this.canvas}},{key:"getPixelMap",value:function(){return this.pixelMap}},{key:"setPixelMap",value:function(e){if(e.size!==this.pixelMap.size)throw new RangeError("Cannot set pixel map. Pixel maps are not the same dimensions");this.pixelMap=e.clone()}},{key:"setPixelsFromImage",value:function(e){var t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Could not get context for canvas");t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0),this.setPixelsFromCanvas(t)}},{key:"setPixelsFromCanvas",value:function(e){var t=e.getContext("2d");if(!t)throw new Error("Could not get context for canvas");var n=e.width/this.dimension(),a=e.height/this.dimension();this.mutableMap((function(e){var r=Object(s.a)(e,2),o=r[0],i=r[1],c=t.getImageData(o*n,i*a,1,1).data,l=Object(s.a)(c,4),u=l[0],h=l[1],f=l[2];return 0===l[3]?p.NO_COLOR:new p(u,h,f)}))}},{key:"clear",value:function(){this.mutableMap((function(){return p.NO_COLOR}))}},{key:"setColorAt",value:function(e,t,n){if(!this.pixelMap.has([e,t]))throw RangeError("Pixel at ".concat(e,",").concat(t," does not exist"));this.pixelMap.set([e,t],n)}},{key:"getColorAt",value:function(e,t){var n=this.pixelMap.get([e,t]);if(void 0===n)throw RangeError("Pixel at ".concat(e,",").concat(t," does not exist"));return n}},{key:"mutableMap",value:function(e){var t,n=Object(D.a)(this.pixelMap.entries());try{for(n.s();!(t=n.n()).done;){var a=Object(s.a)(t.value,2),r=a[0],o=e(r,a[1]);this.pixelMap.set(r,o)}}catch(i){n.e(i)}finally{n.f()}}},{key:"forEach",value:function(e){var t,n=Object(D.a)(this.pixelMap.entries());try{for(n.s();!(t=n.n()).done;){var a=Object(s.a)(t.value,2);e(a[0],a[1])}}catch(r){n.e(r)}finally{n.f()}}}],[{key:"DrawToCanvas",value:function(e,t){var n=t.getContext("2d");if(!n)throw new Error("Could not get context for canvas");e.forEach((function(e,t){var a=Object(s.a)(e,2),r=a[0],o=a[1];t!==p.NO_COLOR?(n.fillStyle=t.toHex(),n.fillRect(r,o,1,1)):n.clearRect(r,o,1,1)}))}},{key:"AreDimensionsCompatible",value:function(e,t){var n=t.width,a=t.height,r=e.dimension();return n===a&&r===n}}]),Object(v.a)(e,[{key:"dimension",value:function(){return Math.sqrt(this.pixelMap.size)}},{key:"touchEvent",value:function(e,t){var n=this.touchToCoords(e),a=n.quantX,r=n.quantY,o=this.getColorAt(a,r);"NO_COLOR"===t&&"NO_COLOR"===o||(("NO_COLOR"!==t||"NO_COLOR"===o)&&("NO_COLOR"===t||"NO_COLOR"!==o)?"NO_COLOR"!==t&&"NO_COLOR"!==o&&(p.Equals(t,o)||this.setColorAt(a,r,t)):this.setColorAt(a,r,t))}},{key:"touchToCoords",value:function(e){var t=function(e){var t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY,a=e.target.getBoundingClientRect(),r=function(e,t,n){return Math.min(n,Math.max(e,t))},o=r(t-a.left,0,a.width-1),i=r(n-a.top,0,a.height-1);return{relativeX:o/a.width,relativeY:i/a.height}}(e),n=t.relativeX,a=t.relativeY,r=n*this.dimension(),o=a*this.dimension();return{quantX:Math.floor(r),quantY:Math.floor(o)}}}]),e}()),G=function(e){Object(H.a)(n,e);var t=Object(L.a)(n);function n(){var e;Object(O.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).redoBuffer=new Array,e}return Object(v.a)(n,[{key:"undo",value:function(){var e=this.top();return void 0!==e&&this.getBufferLength()>1&&this.redoBuffer.push(e),Object(P.a)(Object(B.a)(n.prototype),"undo",this).call(this)}},{key:"addCurrent",value:function(e){this.redoBuffer=[],Object(P.a)(Object(B.a)(n.prototype),"addCurrent",this).call(this,e)}},{key:"getUndoSize",value:function(){return Object(P.a)(Object(B.a)(n.prototype),"getUndoSize",this).call(this)}},{key:"getRedoSize",value:function(){return this.redoBuffer.length}},{key:"redoOne",value:function(){var e=this.redoBuffer.pop();return void 0!==e&&Object(P.a)(Object(B.a)(n.prototype),"addCurrent",this).call(this,e),e}},{key:"clear",value:function(){this.redoBuffer=[],Object(P.a)(Object(B.a)(n.prototype),"clear",this).call(this)}}]),n}(function(){function e(t,n){Object(O.a)(this,e),this.base=t,this.maxSize=n,this.buffer=void 0,this.buffer=[t]}return Object(v.a)(e,[{key:"top",value:function(){return this.buffer[this.buffer.length-1]}},{key:"undo",value:function(){this.buffer.pop();var e=this.buffer[this.buffer.length-1];return e||(this.buffer=[this.base],this.base)}},{key:"addCurrent",value:function(e){this.buffer.push(e),this.maxSize&&this.maxSize<this.buffer.length&&(this.buffer=this.buffer.slice(-this.maxSize-2))}},{key:"getUndoSize",value:function(){return Math.max(this.buffer.length-2,0)}},{key:"getBufferLength",value:function(){return this.buffer.length}},{key:"clear",value:function(){this.buffer=[]}}]),e}()),I=n(101),_=n(102),q=n(100),U=function(e){var t=e.canvas,n=Object(r.useRef)(null);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{icon:Object(a.jsx)(q.a,{}),onClick:function(e){var a=document.createElement("canvas");a.width=window.innerWidth,a.height=window.innerWidth;var r=a.getContext("2d");r.imageSmoothingEnabled=!1,r.drawImage(t,0,0,a.width,a.height);var o=a.toDataURL("image/png");n.current&&(n.current.href=o,n.current.click())}}),Object(a.jsx)("a",{ref:n,href:"/",style:{display:"none"},download:"my-pixel-art.png"})]})},W=function(e){var t=e.canvas,n=e.onAddButtonClicked,r=e.setSettingsMenuShown;return Object(a.jsx)(f.a,{gridArea:"footer",direction:"row",pad:{left:"small",right:"small"},children:Object(a.jsxs)(h.a,{columns:{count:3,size:["auto","auto","auto"]},fill:!0,gap:"small",children:[Object(a.jsx)(f.a,{align:"start",children:Object(a.jsx)(j.a,{icon:Object(a.jsx)(I.a,{}),onClick:function(){return r(!0)}})}),Object(a.jsx)(f.a,{align:"center",children:Object(a.jsx)(j.a,{icon:Object(a.jsx)(_.a,{}),onClick:n})}),Object(a.jsx)(f.a,{align:"end",children:Object(a.jsx)(U,{canvas:t})})]})})},X=n(112),Y={"1x1":1,"8x8":8,"10x10":10,"12x12":12,"14x14":14,"16x16":16,"18x18":18,"20x20":20,"22x22":22,"24x24":24},J={1:"1x1",8:"8x8",10:"10x10",12:"12x12",14:"14x14",16:"16x16",18:"18x18",20:"20x20",22:"22x22",24:"24x24"},K=["1x1","8x8","10x10","12x12","14x14","16x16","18x18","20x20","22x22","24x24"],Q=function(e){var t=e.dimension,n=e.onDimensionChange;return Object(a.jsx)(X.a,{name:"Select Dimensions",placeholder:"8x8",value:J[t],options:K,onChange:function(e){var t=e.option;return n(Y[t])}})},V=n(42),Z=n.n(V),$=n(66),ee=function(e){var t=e.setLoadedImage,n=Object(r.useRef)(null);return Object(a.jsxs)(f.a,{direction:"row",gap:"small",children:[Object(a.jsx)(j.a,{label:"Choose File",onClick:function(){var e=n.current;e&&e.click()}}),Object(a.jsx)(E.a,{alignSelf:"center",onClick:function(){var e=n.current;e&&e.click()},children:"No File Chosen"}),Object(a.jsx)("input",{ref:n,style:{display:"none"},onChange:function(){var e=Object($.a)(Z.a.mark((function e(n){var a,r;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Promise((function(e,t){if(n.target.files&&n.target.files[0]){var a=URL.createObjectURL(n.target.files[0]),r=new Image;r.src=a,r.onload=function(){return e(r)}}})),e.next=3,a;case 3:r=e.sent,n.target.value="",t(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),type:"file",accept:"image/*"})]})},te=function(e){var t=e.onClickOutside,n=e.onDimensionChange,r=e.dimension,o=e.setLoadedImage,i=e.setCreateMenuShown,c=e.createNew;return Object(a.jsx)(T.a,{modal:!0,position:"bottom",responsive:!1,full:"horizontal",onClickOutside:t,children:Object(a.jsxs)(f.a,{pad:"small",fill:!0,children:[Object(a.jsxs)(f.a,{pad:{top:"small",bottom:"small"},gap:"small",children:[Object(a.jsx)(E.a,{children:"Canvas Dimensions"}),Object(a.jsx)(Q,{onDimensionChange:n,dimension:r})]}),Object(a.jsxs)(f.a,{pad:{top:"small",bottom:"small"},gap:"small",children:[Object(a.jsx)(E.a,{children:"Upload Image (optional)"}),Object(a.jsx)(ee,{setLoadedImage:o})]}),Object(a.jsxs)(h.a,{columns:{count:2,size:["auto","auto"]},gap:"small",pad:{top:"medium",bottom:"small"},children:[Object(a.jsx)(j.a,{label:"Cancel",onClick:i}),Object(a.jsx)(j.a,{primary:!0,label:"Create New",onClick:c})]})]})})},ne=n(103),ae={c64:["#000000","#FFFFFF","#880000","#AAFFEE","#DD8855","#664400","#FF7777","#333333","#CC44CC","#00CC55","#0000AA","#EEEE77","#777777","#AAFF66","#0088FF","#BBBBBB"],cga:["#000000","#0000AA","#00AA00","#00AAAA","#555555","#5555FF","#55FF55","#55FFFF","#AA0000","#AA00AA","#AA5500","#AAAAAA","#FF5555","#FF55FF","#FFFF55","#FFFFFF"],teletext:["#000000","#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ffffff"]},re={c64:"Commodore 64",cga:"DOS CGA/ EGA",teletext:"Teletext"},oe=["Commodore 64","DOS CGA/ EGA","Teletext"],ie={"Commodore 64":"c64","DOS CGA/ EGA":"cga",Teletext:"teletext"},ce=function(e){var t=e.palette,n=e.onPaletteChange,r=re;return Object(a.jsx)(X.a,{name:"Select Palette",placeholder:r.c64,value:re[t],options:oe,onChange:function(e){var t=e.option;return n(ie[t])}})},se=function(e){var t=e.onClickOutside,n=e.setColor,o=e.palette,i=e.pinnedColors,c=e.setPinnedColors,s=e.setPalette,l=ae[o].map(p.fromHexString),u=function(e,t,n){var a=Object(r.useRef)(),o=Object(r.useRef)(!1),i=function(){a.current&&clearTimeout(a.current),a.current=void 0};return{onPressDown:function(n){a.current=setTimeout((function(){o.current=!0,e(n),i()}),t)},onPressUp:function(e){void 0!==a.current&&(i(),null===n||void 0===n||n(e))},wasLongPress:o}}((function(e){var t=le(e);if(void 0!==t){var n=l[t];if(!!i.find((function(e){return p.Equals(e,n)}))){var a=Object(d.a)(i).filter((function(e){return!p.Equals(n,e)}));c(a)}else{var r=Object(d.a)(i);r.push(n),c(r)}}}),500,(function(e){if(void 0!==e){var a=le(e);if(void 0!==a){var r=l[a];n(r),t()}}})),h=u.onPressDown,b=u.onPressUp;return Object(a.jsx)(T.a,{modal:!0,position:"top",responsive:!1,full:"horizontal",onClickOutside:t,children:Object(a.jsxs)(f.a,{pad:"small",fill:!0,children:[Object(a.jsx)(f.a,{fill:!0,pad:{top:"small",bottom:"small"},gap:"small",children:Object(a.jsx)(f.a,{direction:"row",wrap:!0,justify:"between",alignSelf:"center",onTouchStart:h,onTouchEnd:b,children:Object.values(l).map((function(e,t){var r=!!i.find((function(t){return p.Equals(t,e)}));return Object(a.jsx)(f.a,{height:"xsmall",width:"xsmall",pad:{bottom:"xsmall"},children:Object(a.jsx)(j.a,{primary:!0,fill:"vertical",size:"large",onClick:function(){return n(e)},"data-index":t,color:e.toHex(),icon:r?Object(a.jsx)(ne.a,{}):void 0,style:{borderRadius:"0",border:"none"}},t)},t)}))})}),Object(a.jsx)(f.a,{pad:{top:"small",bottom:"small"},gap:"small",children:Object(a.jsx)(ce,{palette:o,onPaletteChange:s})})]})})};function le(e){var t=e.target.dataset.index;if(t)return parseInt(t,10)}var ue=n(121),he=function(e){var t=e.onClickOutside,n=e.resetMode;return Object(a.jsx)(T.a,{modal:!0,position:"bottom",responsive:!1,full:"horizontal",onClickOutside:t,children:Object(a.jsx)(f.a,{pad:"small",fill:!0,children:Object(a.jsx)(ue.a,{toggle:!0,onChange:function(e){return n(e.target.checked)},label:"Dark Mode"})})})},fe=n(104),de=n(105),je=n(106),be=n(107),Oe=n(108),ve=n(109),xe=n(110),pe=n(9),ge=function(e){return Object(a.jsx)(pe.StyledIcon,Object(w.a)(Object(w.a)({viewBox:"0 0 6.35 6.35",a11yTitle:"Dropper"},e),{},{children:Object(a.jsxs)("g",{fill:"none",stroke:"#000",strokeWidth:".52917",children:[Object(a.jsx)("path",{d:"m5.5002.60932c-.20131-.12441-.4432-.27888-.67352-.22451-.30901.072947-.38019.55202-.67352.67352-.13828.057276-.44901 0-.44901 0l-.22451.22451.22451.22451-2.9186 2.9186-.44901 1.347.22451.22451 1.347-.44901 2.9186-2.9186.22451.22451.22451-.22451s-.057276-.31073 1e-7-.44901c.1215-.29333.60057-.36451.67352-.67352.054371-.23032-.10009-.47221-.22451-.67352-.05564-.090027-.13448-.16887-.22451-.22451z"}),Object(a.jsx)("path",{d:"m3.7042 1.5073 1.1225 1.1225"})]})}))},me=function(e){return Object(a.jsxs)(pe.StyledIcon,Object(w.a)(Object(w.a)({viewBox:"0 0 6.35 6.35",a11yTitle:"Palette"},e),{},{children:[Object(a.jsx)("path",{xmlns:"http://www.w3.org/2000/svg",d:"m5.926 3.1543c-.037745.39288-.36536.56457-.83971.54908-.38933-.01271-1.2873-.15741-1.475.24331-.22247.47492.58533.95042.5725 1.4362-.011288.42757-.61548.57263-1.0208.57263-1.526 0-2.763-1.2542-2.763-2.8012 2e-8-1.5471 1.237-2.8012 2.763-2.8012 1.526 0 2.911 1.2612 2.763 2.8012z",fillOpacity:"0",strokeWidth:".52917"}),Object(a.jsx)("circle",{cx:"1.5769",cy:"3.5063",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"1.8923",cy:"2.1661",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"3.8408",cy:"1.7492",r:"0.3784252",stroke:"none"}),Object(a.jsx)("circle",{cx:"2.7456",cy:"1.4877",r:"0.3784252",stroke:"none"})]}))},Ce=n(67),ke=function(e){var t=e.onClick,n=e.isHighlighted,r=Object(Ce.a)(e,["onClick","isHighlighted"]);return Object(a.jsx)(j.a,Object(w.a)({onClick:t,style:{borderRadius:"18px",boxShadow:n?"0 0 2px 2px green":"none"}},r))},ye=function(e){var t=e.onBrushChange,n=e.onPickerModeClick,r=e.onUndoClick,o=e.onRedoClick,i=e.onPaletteButtonClick,c=e.onGridButtonClick,s=e.onTrashClick,l=e.isGridShown,u=e.color,d=e.pickerMode,b=e.brush;return Object(a.jsxs)(h.a,{fill:!0,columns:["auto","auto"],rows:["flex","flex"],areas:[{name:"left-top",start:[0,0],end:[0,0]},{name:"left-bot",start:[0,1],end:[0,1]},{name:"right-top",start:[1,0],end:[1,0]},{name:"right-bot",start:[1,1],end:[1,1]}],children:[Object(a.jsxs)(f.a,{gridArea:"left-top",direction:"row",children:[Object(a.jsx)(ke,{primary:!0,onClick:function(){return t("paint")},isHighlighted:"paint"===b,icon:Object(a.jsx)(fe.a,{}),color:u.toHex()}),Object(a.jsx)(ke,{onClick:function(){return t("eraser")},isHighlighted:"eraser"===b,icon:Object(a.jsx)(de.a,{})}),Object(a.jsx)(j.a,{onClick:i,icon:Object(a.jsx)(me,{})}),Object(a.jsx)(ke,{onClick:function(){return t("dropper")},isHighlighted:"dropper"===b,icon:Object(a.jsx)(ge,{})})]}),Object(a.jsxs)(f.a,{gridArea:"left-bot",direction:"row",children:[Object(a.jsx)(ke,{icon:Object(a.jsx)(je.a,{}),onClick:function(){return n("history")},isHighlighted:"history"===d}),Object(a.jsx)(ke,{icon:Object(a.jsx)(ne.a,{}),onClick:function(){return n("pinned")},isHighlighted:"pinned"===d})]}),Object(a.jsxs)(f.a,{gridArea:"right-top",direction:"row",justify:"end",children:[Object(a.jsx)(j.a,{icon:Object(a.jsx)(be.a,{}),onClick:r}),Object(a.jsx)(j.a,{icon:Object(a.jsx)(Oe.a,{}),onClick:o})]}),Object(a.jsxs)(f.a,{gridArea:"right-bot",direction:"row",justify:"end",children:[Object(a.jsx)(j.a,{onClick:s,icon:Object(a.jsx)(ve.a,{})}),Object(a.jsx)(ke,{onClick:c,isHighlighted:l,icon:Object(a.jsx)(xe.a,{})})]})]})},we=function(){var e=Object(r.useState)(16),t=Object(s.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(p.fromHexString("#5555ff")),c=Object(s.a)(i,2),d=c[0],j=c[1],b=Object(r.useState)(void 0),O=Object(s.a)(b,2),v=O[0],x=O[1],g=Object(r.useState)("paint"),m=Object(s.a)(g,2),C=m[0],k=m[1],w=Object(r.useState)("pinned"),S=Object(s.a)(w,2),M=S[0],A=S[1],T=Object(r.useState)(!1),E=Object(s.a)(T,2),P=E[0],B=E[1],H=Object(r.useState)(!1),L=Object(s.a)(H,2),D=L[0],N=L[1],G=Object(r.useState)("cga"),I=Object(s.a)(G,2),_=I[0],q=I[1],U=Object(r.useState)(!1),X=Object(s.a)(U,2),Y=X[0],J=X[1],K=Object(r.useState)(!1),Q=Object(s.a)(K,2),V=Q[0],Z=Q[1],$=Object(r.useState)(!1),ee=Object(s.a)($,2),ne=ee[0],ae=ee[1],re=Object(r.useState)(),oe=Object(s.a)(re,2),ie=oe[0],ce=oe[1],le=Object(r.useState)([]),ue=Object(s.a)(le,2),fe=ue[0],de=ue[1],je=Object(r.useMemo)((function(){return new z(n)}),[n]),be=function(e){j(e),k("paint")},Oe=!!v;return Object(a.jsxs)(l.a,{theme:u.a,style:{height:"100%"},themeMode:ne?"dark":"light",children:[Object(a.jsxs)(h.a,{fill:!0,areas:[{name:"canvas",start:[0,0],end:[0,0]},{name:"body",start:[0,1],end:[0,1]},{name:"footer",start:[0,2],end:[0,2]}],columns:["full"],rows:["auto","flex","xxsmall"],children:[Object(a.jsx)(R,{stackProps:{gridArea:"canvas"},isGridShown:P,isPaletteMenuShown:D,onCanvasCreated:function(e){ce(e),je.setCanvas(e)},onCanvasTouch:function(e,t){switch(C){case"dropper":k("paint");var n=je.touchToCoords(t),a=je.getColorAt(n.quantX,n.quantY);if(a===p.NO_COLOR)break;j(a);break;case"paint":je.setCanvas(e),je.touchEvent(t,d),je.drawToCanvas();break;case"eraser":je.setCanvas(e),je.touchEvent(t,p.NO_COLOR),je.drawToCanvas()}},pixelDimensions:n}),Object(a.jsxs)(f.a,{gridArea:"body",pad:"small",children:[Object(a.jsx)(ye,{color:d,brush:C,isGridShown:P,onPickerModeClick:A,onBrushChange:k,onGridButtonClick:function(){return B(!P)},onPaletteButtonClick:function(){return N(!D)},onRedoClick:function(){je.redo(),je.drawToCanvas()},onUndoClick:function(){je.undo(),je.drawToCanvas()},onTrashClick:function(){return x({onAccept:function(){x(void 0),je.clear(),je.drawToCanvas()},message:"Are you sure you want to clear the canvas?",acceptButtonText:"Clear",onCancel:function(){x(void 0)}})},pickerMode:M}),Object(a.jsx)(y,{pickerMode:M,color:d,palette:_,pinnedColors:fe,setColorAndTurnOffPicker:be})]}),ie&&Object(a.jsx)(W,{canvas:ie,onAddButtonClicked:function(){return J(!0)},setSettingsMenuShown:Z})]}),D&&Object(a.jsx)(se,{pinnedColors:fe,setPinnedColors:de,onClickOutside:function(){return N(!1)},setColor:be,palette:_,setPalette:q}),Oe&&Object(a.jsx)(F,{onAccept:v.onAccept,onCancel:v.onCancel,cancelButtonText:v.cancelButtonText,acceptButtonText:v.acceptButtonText,message:v.message}),Y&&Object(a.jsx)(te,{onClickOutside:function(){return J(!1)},onDimensionChange:o,dimension:n,setLoadedImage:function(e){je.setPixelsFromImage(e),je.drawToCanvas()},setCreateMenuShown:function(){return J(!1)},createNew:function(){je.clear(),je.drawToCanvas()}}),V&&Object(a.jsx)(he,{onClickOutside:function(){return Z(!1)},resetMode:ae})]})};window.oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1},c.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(we,{})}),document.getElementById("root"))}},[[88,1,2]]]);
//# sourceMappingURL=main.21b45bfe.chunk.js.map