//方式1
// export const originProto = XMLHttpRequest.prototype
// export const originOpen = originProto.open
// export const originSend = originProto.send

// export const observerXhr = () => {
//     XMLHttpRequest.prototype.open= function newOpen(...args){
//         this.method= args[0]
//         this.url = args[1]
//         return originOpen.apply(this, args)
//     }

//     XMLHttpRequest.prototype.send = function newSend(...args){
//         this.startTime = Date.now()
//         const onload=()=>{
//             this.endTime = Date.now()
//             this.duration = endTime - startTime
//             const {url,method,startTime,endTime,duration,status} = this
//             const _reoprtData={
//                 url,
//                 method: method.toUpperCase(),
//                 startTime,
//                 endTime,
//                 duration,
//                 status,
//                 type:'performance',
//                 subType:'xhr',
//                 success: status>=200 && status<300
//             }
//             this.removeEventListener('loadend',onload,true)
//         }
//         this.addEventListener('loadend',onload,true)
//         return originSend.apply(this, args)
//     }
// }
//方式2
export const originXhr = window.XMLHttpRequest;
//重写xhr
window.XMLHttpRequest = function () {
  const xhr = new originXhr();
  xhr.addEventListener("loadstart", function () {
    this.startTime = performance.now();
  });
  xhr.addEventListener("loadend", function () {
    this.endTime = performance.now();
    this.duration = endTime - startTime;
    const { url, method, startTime, endTime, duration, status } = this;
    const _reoprtData = {
      url,
      method: method.toUpperCase(),
      startTime,
      endTime,
      duration,
      status: status || 0, //跨域无法读取status
      type: "performance",
      subType: "xhr",
      success: status >= 200 && status < 300,
    };
  });
  // 监听error和abort事件
  // xhr.addEventListener('error', function() {
  //     sendToMonitor({
  //       type: 'performance',
  //       subType: 'xhr',
  //       url: this._url,
  //       method: this._method,
  //       status: this.status || 0,
  //       duration: performance.now() - startTime,
  //       success: false,
  //       error: 'Network Error'
  //     })
  //   })

  //   xhr.addEventListener('abort', function() {
  //     sendToMonitor({
  //       type: 'performance',
  //       subType: 'xhr',
  //       url: this._url,
  //       method: this._method,
  //       status: this.status || 0,
  //       duration: performance.now() - startTime,
  //       success: false,
  //       error: 'Request Aborted'
  //     })
  //   })

  //xhr 没有暴露method和url，需要劫持open方法
  const originOpen = xhr.open;
  xhr.open = function newOpen(...args) {
    this.method = args[0];
    this.url = args[1];
    return originOpen.apply(this, args);
  };

  return xhr;
};
