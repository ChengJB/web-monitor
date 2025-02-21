//统计静态资源
export default function observeResource() {
  const state = document.readyState;
  if (state === "complete") {
    observeEvent();
  } else {
    window.addEventListener("load", observeEvent, true);
  }
}
export function observeEvent() {
  const entryHander = (list) => {
    if (observer) {
      observer.disconnect();
    }
    const resourceList = list.getEntries();
    for (let entry of resourceList) {
      const _reportData = {
        name: entry.name,
        type: "performance",
        subType: entry.entryType,
        sourceType: entry.initiatorType,
        duration: entry.duration, //加载时间
        redirect: entry.redirectEnd - entry.redirectStart, //重定向时间
        dns: entry.domainLookupEnd - entry.domainLookupStart, //dns解析时间
        tcp: entry.connectEnd - entry.connectStart, //tcp连接时间
        ttfb: entry.reponseStart, //首字节时间
        protocol: entry.nextHopProtocol, //协议
        transferSize: entry.transferSize, //请求内容大小，使用缓存时为0
        responseBodySize: entry.encodedBodySize, //响应内容大小
        responseHeaderSize: entry.transferSize - entry.encodedBodySize, //响应头大小
        resourceSize: entry.decodedBodySize, //资源解压大小
        startTime: performance.now(),
      };
    }
  };
  const observer = new PerformanceObserver(entryHander);
  observer.observe({ entryTypes: ["resource"] });
}
