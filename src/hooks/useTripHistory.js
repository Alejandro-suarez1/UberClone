// AI-assisted: see docs/AI_LOG.md #A-40
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDriverSession } from '../context/DriverSessionContext';
import { getDriverTrips } from '../services/tripService'; // servicio de B
import { getMockDriverTrips } from '../utils/mockTrips';
import { ENV, HISTORY_PAGE_SIZE } from '../config/env';

const MAX_PAGES_WHEN_LOADING_ALL = 25;

export default function useTripHistory({ since, until, paymentMethod, pageSize = HISTORY_PAGE_SIZE, loadAll = false } = {}) {
  const { driverId } = useDriverSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);

  const cursorRef = useRef(null);
  const requestId = useRef(0);

  const fetchPage = useCallback(
    (cursor) => {
      const fetcher = ENV.USE_MOCKS ? getMockDriverTrips : getDriverTrips;
      return fetcher(driverId, { since, until, paymentMethod, cursor: cursor ?? undefined, limit: pageSize });
    },
    [driverId, since, until, paymentMethod, pageSize],
  );

  const load = useCallback(async () => {
    const current = ++requestId.current;
    setLoading(true);
    setError(null);
    cursorRef.current = null;
    try {
      let all = [];
      let cursor = null;
      let pages = 0;
      do {
        const page = await fetchPage(cursor);
        if (current !== requestId.current) return; // llegó una consulta más nueva
        all = all.concat(page.trips);
        cursor = page.nextCursor;
        pages += 1;
      } while (loadAll && cursor !== null && pages < MAX_PAGES_WHEN_LOADING_ALL);

      cursorRef.current = cursor;
      setTrips(all);
      setHasMore(cursor !== null);
    } catch (e) {
      if (current === requestId.current) setError(e);
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }, [fetchPage, loadAll]);

  // Cada vez que cambian los filtros se vuelve a empezar desde la primera página
  useEffect(() => {
    if (!driverId) return;
    load();
  }, [driverId, load]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore || cursorRef.current === null) return;
    const current = requestId.current;
    setLoadingMore(true);
    try {
      const page = await fetchPage(cursorRef.current);
      if (current !== requestId.current) return;
      cursorRef.current = page.nextCursor;
      setTrips((prev) => prev.concat(page.trips));
      setHasMore(page.nextCursor !== null);
    } catch (e) {
      setError(e);
    } finally {
      setLoadingMore(false);
    }
  }, [fetchPage, hasMore, loading, loadingMore]);

  return { trips, loading, loadingMore, hasMore, error, loadMore, refresh: load };
}
