export class CreateShareDto {
  color!: string;
  name!: string;
  price!: number;
  thumbnail!: string;
}

export class CreateBrokerDto {
  type!: 'private' | 'business' | 'simulation' | 'stockmarket' | 'liquiditydonor';
  displayName!: string;
}
