export interface Property {
  id: number;
  title: string;
  price: number | null;
  location: string;
  area: string;
  status: string;
  isVip: boolean | null;
  isNegotiable: boolean | null;
  image_urls: string[] | null;
  ownerName?: string;
  ownerPhone?: string;
  floor?: number | null;
  beds?: number | null;
  bathroom?: number | null;
  features?: string[];
}
export interface PropertyForm {
  title: string;
  price: number | null;
  area: string;
  location: string;
  status: string;
  isVip: boolean;
  isNegotiable: boolean;
  ownerName: string;
  ownerPhone: string;
  type: string;
  image_urls: string[] | null;
  user_id: string | undefined;
  floor: number | null;
  beds: number | null;
  bathroom: number | null;
  features: string[];
}
