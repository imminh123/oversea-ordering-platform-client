export enum Language {
  CN = 'zh-CN',
  TW = 'zh-TW',
  EN = 'en',
  VI = 'vi',
}
export enum SortOption {
  default = 'default',
  totalPriceAsc = 'total_price_asc',
  totalPriceDesc = 'total_price_desc',
  priceAsc = 'price_asc',
  priceDesc = 'price_des',
  volumeDesc = 'volume_desc',
  vendorRatingDesc = 'vendor_rating_desc',
  updatedTimeDesc = 'updated_time_desc',
}

export const TargetLangOptions: { value: Language; label: string }[] = [
  {
    value: Language.CN,
    label: 'Tiếng Trung',
  },
  {
    value: Language.TW,
    label: 'Tiếng Đài',
  },
  {
    value: Language.EN,
    label: 'Tiếng Anh',
  },
  {
    value: Language.VI,
    label: 'Tiếng Việt',
  },
];

export const QueryLangOptions: { value: Language; label: string }[] = [
  {
    value: Language.CN,
    label: 'Tiếng Trung',
  },
  {
    value: Language.TW,
    label: 'Tiếng Đài',
  },
  {
    value: Language.EN,
    label: 'Tiếng Anh',
  },
  {
    value: Language.VI,
    label: 'Tiếng Việt',
  },
];

export const SortOptions: { value: SortOption; label: string }[] = [
  {
    value: SortOption.default,
    label: 'Mặc định',
  },
  {
    value: SortOption.priceAsc,
    label: 'Giá tăng dần',
  },
  {
    value: SortOption.priceDesc,
    label: 'Giá giảm dần',
  },
  {
    value: SortOption.vendorRatingDesc,
    label: 'Đánh giá giảm dần',
  },
  {
    value: SortOption.volumeDesc,
    label: 'Số lượng giảm dần',
  },
];
