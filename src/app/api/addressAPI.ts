import { DistrictItem, ProvinceItem, WardItem } from 'app/types/address';
import axios from 'axios';

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

const PROVINCE_OPENAI_URL = 'https://provinces.open-api.vn/api';

class AddressAPI {
  async fetchProvinces(): Promise<ProvinceItem[]> {
    try {
      const apiResult = await axios.get(`${PROVINCE_OPENAI_URL}/p/`);

      return apiResult.data.map((it: ApiProvince) => this.mappingProvinceItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchDistricts(provinceCode?: number): Promise<DistrictItem[]> {
    if (!provinceCode) {
      return [];
    }

    try {
      const apiResult = await axios.get(`${PROVINCE_OPENAI_URL}/p/${provinceCode}`, { params: { depth: 2 } });

      return apiResult.data.districts.map((it: ApiDistrict) => this.mappingDistrictItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchWards(districtCode?: number): Promise<WardItem[]> {
    if (!districtCode) {
      return [];
    }

    try {
      const apiResult = await axios.get(`${PROVINCE_OPENAI_URL}/d/${districtCode}`, { params: { depth: 2 } });

      return apiResult.data.wards.map((it: ApiWard) => this.mappingWardItemServerToClient(it));
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
