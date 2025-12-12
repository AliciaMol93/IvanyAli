import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';

@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbxZ8hZaTQwGz_L0anKsDxtOOFfzZ3FhOKC78k-LC-okx6j2k3YcR0KgfCnU8VklJKiGuQ/exec';

  constructor(private http: HttpClient) {}

  guardarInvitado(invitado: Invitado) {
    return this.http.post(
      this.apiUrl,
      { type: 'invitado', ...invitado },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  guardarSugerencia(invitado_id: number, email: string, song_name: string, artist: string) {
    return this.http.post(
      this.apiUrl,
      { type: 'sugerencia', invitado_id, email, song_name, artist },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
