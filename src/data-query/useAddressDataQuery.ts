import { FetchQueryOptions, useQuery } from 'react-query';
import { addressAPI } from 'app/api/addressAPI';
import { DistrictItem, ProvinceItem, WardItem } from 'app/types/address';

const provincesQuery: () => FetchQueryOptions<ProvinceItem[]> = () => ({
  queryKey: ['provinces'],
  queryFn: () => addressAPI.fetchProvinces(),
});

const districtsQuery: (provincesCode?: number) => FetchQueryOptions<DistrictItem[]> = (provincesCode) => ({
  queryKey: ['province', provincesCode, 'districts'],
  queryFn: () => addressAPI.fetchDistricts(provincesCode),
});

const wardsQuery: (districtCode?: number) => FetchQueryOptions<WardItem[]> = (districtCode) => ({
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
