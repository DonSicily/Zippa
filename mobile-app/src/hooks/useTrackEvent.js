// Custom hook to easily fire analytics events from any UI component.
// Keeps the UI code clean and decoupled from the analytics service.

import { useCallback } from 'react';
import analyticsService from '../services/analytics';
import { EVENT_NAMES } from '../utils/eventNames';

export const useTrackEvent = () => {
  // Generic event tracker
  const track = useCallback((eventName, params = {}) => {
    analyticsService.logEvent(eventName, params);
  }, []);

  // Pre-defined trackers for common actions
  const trackCampusDropView = useCallback((dropId, dropTitle) => {
    analyticsService.logEvent(EVENT_NAMES.CAMPUS_DROP_VIEW, {
      drop_id: dropId,
      drop_title: dropTitle,
    });
  }, []);

  const trackCheckoutStarted = useCallback((cartTotal, itemCount) => {
    analyticsService.logEvent(EVENT_NAMES.CHECKOUT_STARTED, {
      cart_total: cartTotal,
      item_count: itemCount,
    });
  }, []);

  const trackAmbassadorShare = useCallback((referralCode) => {
    analyticsService.logEvent(EVENT_NAMES.AMBASSADOR_SHARE_CLICKED, {
      referral_code: referralCode,
    });
  }, []);

  return { track, trackCampusDropView, trackCheckoutStarted, trackAmbassadorShare };
};
