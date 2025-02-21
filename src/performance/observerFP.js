export default function observeFP() {
  // 统计FP
  const entryHander = (list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        observer.disconnect();

        // console.log('首次绘制时间',entry.startTime)
        // console.log('entry',entry)
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
    }
  };
  const observer = new PerformanceObserver(entryHander);
  //buffered: true 确保观察到所有的paint事件
  observer.observe({ type: "paint", buffered: true });
}
