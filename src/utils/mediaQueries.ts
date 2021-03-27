import store from '@/store';

export const mqIsDesktop = window.matchMedia('(min-width: 851px)');

function mediaListenerDesktop(event: MediaQueryListEvent): void {
  store.commit('isDesktop', event && event.matches);
}

export function registerMediaQueries() {
  mqIsDesktop.addListener(mediaListenerDesktop);
  store.commit('isDesktop', mqIsDesktop.matches);
}

export function unregisterMediaQueries() {
  mqIsDesktop.removeListener(mediaListenerDesktop);
}
