import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbykLK7Au9Wv1n-jzqLX7S-LJ_v7cib3eJTGHtkR1eusPbkiuq19LYqUAAmrXiMBQB2oJA/exec';

  constructor(private http: HttpClient) {}

  guardarInvitado(invitado: Invitado) {
    console.log("📤 ENVIANDO A SHEETS:", invitado);

    return this.http.post<any>(this.apiUrl, {
      type: 'invitado',
      ...invitado
    });
  }

  guardarSugerencia(invitado_id: number, email: string, song_name: string, artist: string) {
    return this.http.post<any>(this.apiUrl, {
      type: 'sugerencia',
      invitado_id,
      email,
      song_name,
      artist
    });
  }
}
