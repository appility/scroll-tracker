export const trackScrollDepth = (
  thresholds: number[],
  callback: (progress: number) => void
) => {
  const triggeredOffsets = new Set<number>();

  const handleScroll = () => {
    const scrollY = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const percentage = (scrollY / totalHeight) * 100;

    thresholds.forEach((offset) => {
      if (percentage >= offset && !triggeredOffsets.has(offset)) {
        window.dispatchEvent(
          new CustomEvent('scrollProgress', { detail: { percentage: offset } })
        );
        triggeredOffsets.add(offset);
        callback(offset);
      }
    });
  };

  return handleScroll;
};