import { Product, FinishOption, ShowroomLocation, InteriorProject, AppLanguage } from '../types';

export function getProductName(product: Product, lang: AppLanguage): string {
  if (lang === 'VI' && product.nameVi) return product.nameVi;
  if (lang === 'EN' && product.nameEn) return product.nameEn;
  return product.name;
}

export function getProductTagline(product: Product, lang: AppLanguage): string {
  if (lang === 'VI' && product.taglineVi) return product.taglineVi;
  if (lang === 'EN' && product.taglineEn) return product.taglineEn;
  return product.tagline;
}

export function getProductDescription(product: Product, lang: AppLanguage): string {
  if (lang === 'VI' && product.descriptionVi) return product.descriptionVi;
  if (lang === 'EN' && product.descriptionEn) return product.descriptionEn;
  return product.description;
}

export function getFinishName(finish: FinishOption, lang: AppLanguage): string {
  if (lang === 'VI' && finish.nameVi) return finish.nameVi;
  if (lang === 'EN' && finish.nameEn) return finish.nameEn;
  return finish.name;
}

export function getShowroomCity(room: ShowroomLocation, lang: AppLanguage): string {
  if (lang === 'VI' && room.cityVi) return room.cityVi;
  if (lang === 'EN' && room.cityEn) return room.cityEn;
  return room.city;
}

export function getShowroomTitle(room: ShowroomLocation, lang: AppLanguage): string {
  if (lang === 'VI' && room.titleVi) return room.titleVi;
  if (lang === 'EN' && room.titleEn) return room.titleEn;
  return room.title;
}

export function getShowroomAddress(room: ShowroomLocation, lang: AppLanguage): string {
  if (lang === 'VI' && room.addressVi) return room.addressVi;
  if (lang === 'EN' && room.addressEn) return room.addressEn;
  return room.address;
}

export function getShowroomSchedule(room: ShowroomLocation, lang: AppLanguage): string {
  if (lang === 'VI' && room.scheduleVi) return room.scheduleVi;
  if (lang === 'EN' && room.scheduleEn) return room.scheduleEn;
  return room.schedule;
}

export function getProjectTitle(proj: InteriorProject, lang: AppLanguage): string {
  if (lang === 'VI' && proj.titleVi) return proj.titleVi;
  if (lang === 'EN' && proj.titleEn) return proj.titleEn;
  return proj.title;
}

export function getProjectLocation(proj: InteriorProject, lang: AppLanguage): string {
  if (lang === 'VI' && proj.locationVi) return proj.locationVi;
  if (lang === 'EN' && proj.locationEn) return proj.locationEn;
  return proj.location;
}

export function getProjectDescription(proj: InteriorProject, lang: AppLanguage): string {
  if (lang === 'VI' && proj.descriptionVi) return proj.descriptionVi;
  if (lang === 'EN' && proj.descriptionEn) return proj.descriptionEn;
  return proj.description;
}

export function getProjectType(proj: InteriorProject, lang: AppLanguage): string {
  if (lang === 'VI' && proj.typeVi) return proj.typeVi;
  if (lang === 'EN' && proj.typeEn) return proj.typeEn;
  return proj.type;
}

