export const backendUrl = 'https://boerse.moonstonks.space/';
export const socketUrl = 'http://privat.moonstonks.space:16001/';

// export const backendUrl = 'http://localhost:3000/';
// export const socketUrl = 'http://localhost:3000/';

export const periods = [
  { title: '1H', amount: 1000 * 60 * 60 },
  { title: '1D', amount: 1000 * 60 * 60 * 24 },
  { title: '1W', amount: 1000 * 60 * 60 * 24 },
  { title: '1M', amount: 1000 * 60 * 60 * 24 * 30 },
  { title: '1Y', amount: 1000 * 60 * 60 * 24 * 365 },
  { title: 'All', amount: 10000 * 60 * 60 * 24 * 365 }
];
