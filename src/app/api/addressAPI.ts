import { DistrictItem, ProvinceItem, WardItem } from 'app/types/address';
import { ApiWrapper } from 'app/api/apiWrapper';
import queryString from 'query-string';

type ApiProvince = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: [];
};

type ApiDistrict = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: [];
};

type ApiWard = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
};

const provinceApiWrapper = new ApiWrapper('https://provinces.open-api.vn/api');

class AddressAPI {
  async fetchProvinces(): Promise<ProvinceItem[]> {
    try {
      const apiResult = await provinceApiWrapper.get<ApiProvince[]>(`p/`);

      return apiResult.map((it) => this.mappingProvinceItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchDistricts(provinceCode?: number): Promise<DistrictItem[]> {
    if (!provinceCode) {
      return [];
    }

    try {
      const url = queryString.stringifyUrl({
        url: `p/${provinceCode}`,
        query: { depth: 2 },
      });
      const apiResult = await provinceApiWrapper.get<{ districts: ApiDistrict[] }>(url);

      return apiResult.districts.map((it) => this.mappingDistrictItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchWards(districtCode?: number): Promise<WardItem[]> {
    if (!districtCode) {
      return [];
    }

    try {
      const url = queryString.stringifyUrl({
        url: `d/${districtCode}`,
        query: { depth: 2 },
      });
      const apiResult = await provinceApiWrapper.get<{ wards: ApiWard[] }>(url);

      return apiResult.wards.map((it) => this.mappingWardItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  private mappingProvinceItemServerToClient(provinceServerResponse: ApiProvince): ProvinceItem {
    return {
      name: provinceServerResponse.name,
      code: provinceServerResponse.code,
      divisionType: provinceServerResponse.division_type,
      codename: provinceServerResponse.codename,
      phoneCode: provinceServerResponse.phone_code,
      districts: provinceServerResponse.districts,
    };
  }

  private mappingDistrictItemServerToClient(districtServerResponse: ApiDistrict): DistrictItem {
    return {
      name: districtServerResponse.name,
      code: districtServerResponse.code,
      divisionType: districtServerResponse.division_type,
      codename: districtServerResponse.codename,
      provinceCode: districtServerResponse.province_code,
      wards: districtServerResponse.wards,
    };
  }

  private mappingWardItemServerToClient(wardServerResponse: ApiWard): WardItem {
    return {
      name: wardServerResponse.name,
      code: wardServerResponse.code,
      divisionType: wardServerResponse.division_type,
      codename: wardServerResponse.codename,
      districtCode: wardServerResponse.district_code,
    };
  }
}

export const addressAPI = new AddressAPI();
