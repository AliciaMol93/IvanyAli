import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';


@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbxYYScQrj2YFUlpa-INitV-b6Lnp5gq_xPh4HRsujvmkV1i-xt3WSVtfa2NgSSzlyA50g/exec';


  constructor(private http: HttpClient) {}

  guardarInvitado(invitado: Invitado) {
    return this.http.post(this.apiUrl, {
      type: 'invitado',
      ...invitado
    });
  }

  guardarSugerencia(invitado_id: number, email: string, song_name: string, artist: string) {
    return this.http.post(this.apiUrl, {
      type: 'sugerencia',
      invitado_id,
      email,
      song_name,
      artist
    });
  }
}
