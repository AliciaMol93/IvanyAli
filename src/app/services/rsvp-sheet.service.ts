import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = '/api/sheets-proxy';


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
