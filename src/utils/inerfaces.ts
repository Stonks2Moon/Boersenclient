export interface IBroker {
  id: string;
  token: string;
  type: 'private' | 'business' | 'simulation' | 'stockmarket';
  displayName: string;
}
