'use server';

import {
  getSessionProfile as getProfile,
  getSessionProfileOrRedirect as getProfileOrRedirect,
  getSessionProfileAndOptionallyRenew as getProfileAndRenew,
} from '../mediators/sessionManagementMediators';

export async function getSessionProfile() {
  return await getProfile();
}

export async function getSessionProfileOrRedirect(url: string = '/login') {
  return await getProfileOrRedirect(url);
}

export async function getSessionProfileAndOptionallyRenew() {
  return await getProfileAndRenew();
}