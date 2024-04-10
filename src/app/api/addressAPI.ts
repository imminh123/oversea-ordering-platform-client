import { DistrictItem, ProvinceItem, WardItem } from 'app/types/address';
import axios from 'axios';
import { FetchQueryOptions, useQuery } from 'react-query';

type ApiProvince = {
  ProvinceID: string;
  ProvinceName: string;
};

type ApiDistrict = {
  DistrictName: string;
  DistrictID: string;
};

type ApiWard = {
  WardName: string;
  WardCode: string;
};

const PROVINCE_OPENAI_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';

const ADDRESS_AXIOS = axios.create({
  headers: {
    Token: '9136808f-f76e-11ee-983e-5a49fc0dd8ec',
  },
  baseURL: PROVINCE_OPENAI_URL,
});
class AddressAPI {
  async fetchProvinces(): Promise<ProvinceItem[]> {
    try {
      const { data } = await ADDRESS_AXIOS.get(`/province`, {
        headers: {
          Token: '9136808f-f76e-11ee-983e-5a49fc0dd8ec',
        },
      });
      return data?.data.map((it: ApiProvince) => this.mappingProvinceItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchDistricts(provinceCode?: string): Promise<DistrictItem[]> {
    if (!provinceCode) {
      return [];
    }

    try {
      const { data } = await ADDRESS_AXIOS.get(`/district`, { params: { province_id: provinceCode } });
      return data?.data.map((it: ApiDistrict) => this.mappingDistrictItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  async fetchWards(districtCode?: string): Promise<WardItem[]> {
    if (!districtCode) {
      return [];
    }

    try {
      const { data } = await ADDRESS_AXIOS.get(`/ward`, { params: { district_id: districtCode } });

      return data?.data.map((it: ApiWard) => this.mappingWardItemServerToClient(it));
    } catch (e) {
      return [];
    }
  }

  private mappingProvinceItemServerToClient(provinceServerResponse: ApiProvince): ProvinceItem {
    return {
      name: provinceServerResponse.ProvinceName,
      code: provinceServerResponse.ProvinceID,
      // divisionType: provinceServerResponse.division_type,
      // codename: provinceServerResponse.codename,
      // phoneCode: provinceServerResponse.phone_code,
      // districts: provinceServerResponse.districts,
    };
  }

  private mappingDistrictItemServerToClient(districtServerResponse: ApiDistrict): DistrictItem {
    return {
      name: districtServerResponse.DistrictName,
      code: districtServerResponse.DistrictID,
      // divisionType: districtServerResponse.division_type,
      // codename: districtServerResponse.codename,
      // provinceCode: districtServerResponse.province_code,
      // wards: districtServerResponse.wards,
    };
  }

  private mappingWardItemServerToClient(wardServerResponse: ApiWard): WardItem {
    return {
      name: wardServerResponse.WardName,
      code: wardServerResponse.WardCode,
      // divisionType: wardServerResponse.division_type,
      // codename: wardServerResponse.codename,
      // districtCode: wardServerResponse.district_code,
    };
  }
}

export const addressAPI = new AddressAPI();

const provincesQuery: () => FetchQueryOptions<ProvinceItem[]> = () => ({
  queryKey: ['provinces'],
  queryFn: () => addressAPI.fetchProvinces(),
});

const districtsQuery: (provincesCode?: string) => FetchQueryOptions<DistrictItem[]> = (provincesCode) => ({
  queryKey: ['province', provincesCode, 'districts'],
  queryFn: () => addressAPI.fetchDistricts(provincesCode),
});

const wardsQuery: (districtCode?: string) => FetchQueryOptions<WardItem[]> = (districtCode) => ({
  queryKey: ['districts', districtCode, 'wards'],
  queryFn: () => addressAPI.fetchWards(districtCode),
});

export function useAddressDataQuery(params?: { province?: string; district?: string; ward?: string }) {
  const { data: provinces, isLoading: fetchProvincesLoading } = useQuery(provincesQuery());
  const { data: districts, isLoading: fetchDistrictsLoading } = useQuery<any, any, DistrictItem[], any>(
    districtsQuery(provinces?.find((p) => p.name === params?.province)?.code),
  );

  const { data: wards, isLoading: fetchWardsLoading } = useQuery<number, any, WardItem[], any>(
    wardsQuery(districts?.find((d) => d.name === params?.district)?.code),
  );

  return {
    provinces: provinces || [],
    districts: districts || [],
    wards: wards || [],
    loading: fetchProvincesLoading || fetchDistrictsLoading || fetchWardsLoading,
  };
}
