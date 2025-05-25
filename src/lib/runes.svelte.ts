import { writable, type Writable } from 'svelte/store';
import type { User } from './types/app-types';


export const loggedInUser: Writable<User | null> = writable(null);
