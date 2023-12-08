export type ProvinceItem = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  phoneCode: number;
  districts: [];
};

export type DistrictItem = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  provinceCode: number;
  wards: [];
};

export type WardItem = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  districtCode: number;
};
