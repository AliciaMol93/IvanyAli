import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { RsvpService } from './rsvpService.service';
import { RsvpSheetService } from './rsvp-sheet.service';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

const CLAVE_SECRETA = 'retrowedd123';

@Injectable({ providedIn: 'root' })
export class RsvpAdapterService {

  private backend = inject(RsvpService);     // Tu backend local
  private sheets = inject(RsvpSheetService); // Google Sheets

  // Mantiene el estado de asistencia igual que tu servicio original
  private asistenciaSubject = new BehaviorSubject<boolean>(false);
  asistencia$ = this.asistenciaSubject.asObservable();

  // ---------------------------
  // MANEJO DE EMAIL CIFRADO
  // ---------------------------
  guardarEmailCifrado(email: string): void {
    const emailCifrado = CryptoJS.AES.encrypt(email, CLAVE_SECRETA).toString();
    localStorage.setItem('email', emailCifrado);
  }

  getEmailDescifrado(): string | null {
    const emailCifrado = localStorage.getItem('email');
    if (!emailCifrado) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(emailCifrado, CLAVE_SECRETA);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  }

  // ---------------------------
  // GUARDAR INVITADO
  // ---------------------------
  guardarInvitado(invitado: Invitado) {
    if (!environment.useSheets) {

      // --- MODO LOCAL (tu backend) ---
      return this.backend.crearInvitado(invitado);
    }

    // --- MODO PRODUCCIÓN (Google Sheets) ---
    if (invitado.asistencia) {
      this.asistenciaSubject.next(true);
    }

    return this.sheets.guardarInvitado(invitado);
  }

  // ---------------------------
  // CONSULTAR ASISTENCIA
  // ---------------------------
  getAsistenciaStatus(email: string) {
    if (!environment.useSheets) {

      // MODO LOCAL → usa tu backend
      return this.backend.getAsistenciaStatus(email);
    }

    // MODO SHEETS → si está guardado en localStorage, asumimos que sí
    const asistencia = !!this.getEmailDescifrado();
    this.asistenciaSubject.next(asistencia);

    return this.asistenciaSubject;
  }

  // ---------------------------
  // GUARDAR SUGERENCIA
  // ---------------------------
  guardarSugerencia(inv_id: number, email: string, song: string, artist: string) {

    if (!environment.useSheets) {

      // MODO LOCAL → tu backend
      return this.backend.saveSuggestion({
        invitado: {
          invitado_id: inv_id,
          sugerencias: [{ nombre_cancion: song, artista: artist }]
        }
      });
    }

    // MODO SHEETS
    return this.sheets.guardarSugerencia(inv_id, email, song, artist);
  }
}
