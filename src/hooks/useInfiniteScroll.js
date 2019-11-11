import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetchingMore, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetchingMore) return;
    callback();
    setIsFetching(false);
  }, [callback, isFetchingMore]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight
      || isFetchingMore) return;
    setIsFetching(true);
  }

  return setIsFetching;
};

export default useInfiniteScroll;
