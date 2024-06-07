export interface IUser {
  id: number;
  FirstName: string;
  lastName: string;
  email: string;
}

export interface INav {
  link: string;
  label: string;
}

export interface ICarousel {
  img: string;
  title: string;
  desc: string;
}

export interface IAccount {
  img: string;
  currency: string;
  type: string;
  balance: number;
  label: string;
  accountName: string;
  bank: string;
  accountNumber: string;
  currAbbreviation: string;
  refrenceCode: string;
}

export interface IQiuckAction {
  label: string;
  value: string;
}
export interface IUserDetails {
  first_name: string;
  last_name: string;
  middle_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}

export interface ILoggedInUser {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  is_email_verified: boolean;
  date_of_birth: Date;
  is_pin_set: boolean;
}
export interface ISideNav {
  link: string;
  label: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
}

export interface ICards {
  name: string;
  description: string;
  creationFee: number;
  transactionFee: {
    minValue: number;
    maxValue: number;
  };
  secure: boolean;
  img: string;
}
