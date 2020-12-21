import CarLogos from '../widget/data/car-logo';
import _find from 'lodash/find';
import _map from 'lodash/map';
import { IDropdownItem } from '../web/component/dropdown/type';
import { getCarMakeList } from '../widget/data/search-data';
import { IHomeSearch } from '../widget/types/home-search-params';
import { IFormData } from '../web/container/details';

type IRawSObject = IFormData & IHomeSearch & {
  meta: {
    carvin: string;
    caroffmsrp: number;
  },
  pricing: {
    carsellingprice: number;
    cartotalcost: number;
    carmonthlydefault: string;
    cardasdefault: number;
  }
};
export interface ISaleforceObject {
  Email: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Car_ID__c: string;
  Car_Notes__c: string;
  Car_Maker__c: string;
  Car_Model__c: string;
  Max_Credit_Score__c: number;
  Lease_Max_Payment__c: string;
  Miles__c: number;
  Money_Down__c: string;
  Months__c: string;
  Region__c: string;
  Trade_In__c: string;
  Search_Radius__c: number;
  VIN__c?: string;
  Lease_Payment__c: string;
  Lease_Total_Cost__c: string;
  Lease_APR__c: number;
  Due_At_Signing__c: string;
};

interface ICarLogoItem {
  name: string;
  url: string;
  fileName: string;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const currencyFormat = (amount: number): string => (
  formatter.format(amount).replace(/\D00$/, '')
);

const getCarLogo = (branchName: string): string => {
  const carItem: ICarLogoItem | undefined = _find(CarLogos, (item: ICarLogoItem) => item.name.toLowerCase() === branchName.toLowerCase());

  if (typeof carItem !== 'undefined') {
    return `https://bentious.sirv.com/Images/car-logos/${carItem.fileName}?scale.width=100`;
  }

  return '';
};

const getRandomCarMakes = (numberOfBranch: number): string[] => {
  const carMakes: IDropdownItem[] = getCarMakeList();
  const randomList: IDropdownItem[] = carMakes.sort(() => Math.random() - Math.random()).slice(0, numberOfBranch);

  return _map(randomList, (item: IDropdownItem) => item.value);
};

const saleForceObjectMapping = (body: IRawSObject): ISaleforceObject => {
  const { pricing, leasemonths } = body;
  const { carmonthlydefault, carsellingprice, cardasdefault } = pricing;
  const leasepayment: string = carmonthlydefault ? carmonthlydefault : `${carsellingprice / leasemonths}`;
  let result: ISaleforceObject = {
    Email: body.Email,
    FirstName: body.FirstName,
    LastName: body.LastName,
    Phone: body.Phone,
    Car_ID__c: body.a || '',
    Car_Notes__c: body.carincentive || '',
    Car_Maker__c: body.carmake || '',
    Car_Model__c: body.carmodel || '',
    Max_Credit_Score__c: body.leasemaxcredit,
    Lease_Max_Payment__c: body.leasemaxpayment.toString(),
    Miles__c: body.leasemiles,
    Money_Down__c: body.leasemoney.toString(),
    Months__c: `${body.leasemonths} months`,
    Region__c: body.leaseregion,
    Trade_In__c: body.leasetradein.toString().toLowerCase() === 'true' ? 'Yes' : 'No',
    Search_Radius__c: body.searchradius,
    Lease_Payment__c: leasepayment,
    Lease_Total_Cost__c: body.pricing.cartotalcost.toString(),
    Lease_APR__c: body.meta.caroffmsrp,
    Due_At_Signing__c: `${cardasdefault}`
  };

  if (body.meta.carvin !== 'none' && body.meta.carvin !== 'null') {
    result = {
      ...result,
      VIN__c: body.meta.carvin
    }
  }

  return result;
};

export {
  currencyFormat,
  getCarLogo,
  getRandomCarMakes,
  saleForceObjectMapping
};
