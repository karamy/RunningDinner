import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RDStorageService {

  private _storage: Storage;

  constructor(storage: Storage) {
    this._storage = storage;
  }

  // Aggiunge una chiave allo storage
  setItem(key: string, value: any): Promise<any> {
    return this._storage.set(key, value);
  }

  // Restituisce una chiave dello storage
  getItem(key: string): Promise<any> {
    return this._storage.get(key);
  }
}
