import { Component } from '@angular/core';
import HomeComponent from './components/home/home.component';
import VideoComponent from './components/video/video.component';
import AboutUsComponent from './components/about-us/about-us.component';
import ItineraryComponent from './components/itinerary/itinerary.component';
import LocationComponent from './components/location/location.component';
import PlaylistComponent from './components/playlist/playlist.component';
import RsvpFormComponent from './components/rsvp/rsvp-form/rsvp-form.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    VideoComponent,
    AboutUsComponent,
    ItineraryComponent,
    LocationComponent,
    PlaylistComponent,
    RsvpFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RetroWedd';
}
