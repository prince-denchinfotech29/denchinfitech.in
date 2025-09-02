// components/footer/types.ts

export interface Service {
  name: string;
  slug: string;
}

export interface NavItem {
  name: string;
  slug: string;
  services: Service[];
}

export interface Setting {
  footer_col2_title?: string;
  footer_col3_title?: string;
  footer_col4_title?: string;
  footer_address?: string;
  footer_phone?: string;
  footer_copyright?: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface HomeData {
  setting: Setting;
  social_media?: SocialMedia;
}
