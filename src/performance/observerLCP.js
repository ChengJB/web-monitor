export default function observeLCP() {
  // 统计LCP
  const entryHander = (list) => {
    if (observer) {
      observer.disconnect();
    }
    for (const entry of list.getEntries()) {
      const json = entry.toJSON();
      // console.log(json)
      //上报
      const _reportData = {
        ...json,
        type: "performance",
        sunType: entry.name,
        pageUrl: window.location.href,
      };
      //发送数据
    }
  };
  const observer = new PerformanceObserver(entryHander);
  //buffered: true 确保观察到所有事件
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
