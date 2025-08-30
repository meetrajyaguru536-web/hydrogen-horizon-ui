// Green Hydrogen Sites Data for India
export interface HydrogenSite {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  type: 'existing' | 'potential';
  description?: string;
}

// Existing Project Sites (Red markers)
export const existingSites: HydrogenSite[] = [
  {
    id: 'ex-1',
    name: 'Bina Project',
    latitude: 24.183,
    longitude: 78.203,
    state: 'Madhya Pradesh',
    type: 'existing',
    description: 'Green hydrogen production facility'
  },
  {
    id: 'ex-2',
    name: 'Vishakhapatnam Project',
    latitude: 17.686,
    longitude: 83.218,
    state: 'Andhra Pradesh',
    type: 'existing',
    description: 'Coastal green hydrogen facility'
  },
  {
    id: 'ex-3',
    name: 'Gujarat Project',
    latitude: 22.258,
    longitude: 71.192,
    state: 'Gujarat',
    type: 'existing',
    description: 'Industrial green hydrogen plant'
  },
  {
    id: 'ex-4',
    name: 'Jorhat Project',
    latitude: 26.757,
    longitude: 94.203,
    state: 'Assam',
    type: 'existing',
    description: 'Northeast green hydrogen initiative'
  },
  {
    id: 'ex-5',
    name: 'Surat Project',
    latitude: 21.170,
    longitude: 72.831,
    state: 'Gujarat',
    type: 'existing',
    description: 'Commercial green hydrogen facility'
  },
  {
    id: 'ex-6',
    name: 'Madhya Pradesh Central',
    latitude: 23.259,
    longitude: 77.412,
    state: 'Madhya Pradesh',
    type: 'existing',
    description: 'Central MP green hydrogen plant'
  },
  {
    id: 'ex-7',
    name: 'Vindhyachal Project',
    latitude: 24.100,
    longitude: 82.650,
    state: 'Madhya Pradesh',
    type: 'existing',
    description: 'Power sector green hydrogen'
  },
  {
    id: 'ex-8',
    name: 'Bikaner Project',
    latitude: 28.022,
    longitude: 73.311,
    state: 'Rajasthan',
    type: 'existing',
    description: 'Solar-powered green hydrogen'
  },
  {
    id: 'ex-9',
    name: 'Leh Project',
    latitude: 34.152,
    longitude: 77.577,
    state: 'Ladakh',
    type: 'existing',
    description: 'High-altitude green hydrogen facility'
  },
  {
    id: 'ex-10',
    name: 'Ujjain (Makone) Project',
    latitude: 23.176,
    longitude: 75.788,
    state: 'Madhya Pradesh',
    type: 'existing',
    description: 'Regional green hydrogen hub'
  },
  {
    id: 'ex-11',
    name: 'Ramagundam Project',
    latitude: 18.800,
    longitude: 79.450,
    state: 'Telangana',
    type: 'existing',
    description: 'Thermal sector green hydrogen'
  },
  {
    id: 'ex-12',
    name: 'Panipat Project',
    latitude: 29.390,
    longitude: 76.963,
    state: 'Haryana',
    type: 'existing',
    description: 'Refinery green hydrogen unit'
  },
  {
    id: 'ex-13',
    name: 'Mathura Project',
    latitude: 27.492,
    longitude: 77.673,
    state: 'Uttar Pradesh',
    type: 'existing',
    description: 'Petroleum refinery green hydrogen'
  },
  {
    id: 'ex-14',
    name: 'Busawal Project',
    latitude: 21.046,
    longitude: 75.787,
    state: 'Maharashtra',
    type: 'existing',
    description: 'Industrial green hydrogen facility'
  },
  {
    id: 'ex-15',
    name: 'Bangalore Project',
    latitude: 12.971,
    longitude: 77.594,
    state: 'Karnataka',
    type: 'existing',
    description: 'Tech hub green hydrogen initiative'
  },
  {
    id: 'ex-16',
    name: 'Cuddalore Project',
    latitude: 11.750,
    longitude: 79.750,
    state: 'Tamil Nadu',
    type: 'existing',
    description: 'Coastal green hydrogen plant'
  },
  {
    id: 'ex-17',
    name: 'Adani Gujarat Project',
    latitude: 22.258,
    longitude: 71.192,
    state: 'Gujarat',
    type: 'existing',
    description: 'Large-scale Adani green hydrogen project'
  }
];

// Potential Sites (Green markers)
export const potentialSites: HydrogenSite[] = [
  {
    id: 'pot-1',
    name: 'Singrauli Potential',
    latitude: 24.200,
    longitude: 82.650,
    state: 'Madhya Pradesh',
    type: 'potential',
    description: 'High potential for green hydrogen development'
  },
  {
    id: 'pot-2',
    name: 'Bhavnagar Potential',
    latitude: 21.764,
    longitude: 72.151,
    state: 'Gujarat',
    type: 'potential',
    description: 'Coastal potential site with good infrastructure'
  },
  {
    id: 'pot-3',
    name: 'Dibrugarh Potential',
    latitude: 27.472,
    longitude: 94.912,
    state: 'Assam',
    type: 'potential',
    description: 'Northeast potential development area'
  },
  {
    id: 'pot-4',
    name: 'Dahej Potential',
    latitude: 21.717,
    longitude: 72.617,
    state: 'Gujarat',
    type: 'potential',
    description: 'Industrial corridor potential site'
  },
  {
    id: 'pot-5',
    name: 'Rewa Potential',
    latitude: 24.536,
    longitude: 81.303,
    state: 'Madhya Pradesh',
    type: 'potential',
    description: 'Solar energy rich potential area'
  },
  {
    id: 'pot-6',
    name: 'Jaisalmer Potential',
    latitude: 26.911,
    longitude: 70.922,
    state: 'Rajasthan',
    type: 'potential',
    description: 'Desert solar potential for green hydrogen'
  },
  {
    id: 'pot-7',
    name: 'Kargil Potential',
    latitude: 34.568,
    longitude: 76.110,
    state: 'Ladakh',
    type: 'potential',
    description: 'High-altitude renewable energy potential'
  },
  {
    id: 'pot-8',
    name: 'Indore Potential',
    latitude: 22.719,
    longitude: 75.857,
    state: 'Madhya Pradesh',
    type: 'potential',
    description: 'Central India development potential'
  },
  {
    id: 'pot-9',
    name: 'Warangal Potential',
    latitude: 17.978,
    longitude: 79.594,
    state: 'Telangana',
    type: 'potential',
    description: 'South India potential hub'
  },
  {
    id: 'pot-10',
    name: 'Faridabad Potential',
    latitude: 28.408,
    longitude: 77.317,
    state: 'Haryana',
    type: 'potential',
    description: 'NCR region potential site'
  },
  {
    id: 'pot-11',
    name: 'Nagpur Potential',
    latitude: 26.449,
    longitude: 80.331,
    state: 'Maharashtra',
    type: 'potential',
    description: 'Central Maharashtra potential'
  },
  {
    id: 'pot-12',
    name: 'Mumbai Potential',
    latitude: 19.07,
    longitude: 72.87,
    state: 'Maharashtra',
    type: 'potential',
    description: 'Metropolitan green hydrogen potential'
  },
  {
    id: 'pot-13',
    name: 'Mysuru Potential',
    latitude: 12.295,
    longitude: 76.639,
    state: 'Karnataka',
    type: 'potential',
    description: 'South Karnataka development area'
  },
  {
    id: 'pot-14',
    name: 'Tuticorin Potential',
    latitude: 8.764,
    longitude: 78.134,
    state: 'Tamil Nadu',
    type: 'potential',
    description: 'Port-based green hydrogen potential'
  },
  {
    id: 'pot-15',
    name: 'Kandla Potential',
    latitude: 23.033,
    longitude: 70.217,
    state: 'Gujarat',
    type: 'potential',
    description: 'Port infrastructure potential'
  },
  {
    id: 'pot-16',
    name: 'Paradip Potential',
    latitude: 20.316,
    longitude: 86.611,
    state: 'Odisha',
    type: 'potential',
    description: 'Eastern coast potential site'
  },
  {
    id: 'pot-17',
    name: 'Kutch Potential',
    latitude: 23.733,
    longitude: 69.859,
    state: 'Gujarat',
    type: 'potential',
    description: 'Desert region high potential area'
  }
];

export const allSites = [...existingSites, ...potentialSites];