import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  afterNextRender,
  viewChild,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-itinerary',
  imports: [],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export default class ItineraryComponent implements OnInit, AfterViewInit, OnDestroy {
  // Datos del itinerario de la boda
  events=[
    { i:0,
      title: 'ceremonia',
      description:"Es el momento de la película donde hay un si quiero, una novia que llega tarde, el bramido de un dinosaurio que interrumpe los votos, ya sabéis.. ",
      hour: '18:30h',

    },
    { i:1,
      title: 'cóctel de bienvenida',
      description: 'Ya que se han escuchado algunos rugidos de estómago en la ceremonia, vamos a encargarnos de llenar esos buches, ¡a comer y beber hasta que podáis!',
      hour: '19:45',

    },
    { i:2,
      title: 'banquete',
      description:'Para aquellos que se les ha quedado hueco, (nos incluímos) vamos a culminar con un plato y el postre y porqué no, ¡un poco de sobremesa con los vuestros!',
      hour: '22:00',

    },
    { i:3,
      title: 'fiesta',
      description: "¡Y ahora sí! Olvida todo lo que sabes de 'buenas costumbres', porque esta noche se baila como si no existiera un mañana, se canta como si estuviéramos en un karaoke y se ríe hasta que nos duela la barriga.",
      hour: '23:30',

    },
    { i:4,
      title: 'a casa',
      description: "Gracias a todas esas personas que nos han acompañado en nuestro día más especial. Gracias por estar, por reír, por bailar, por brindar, por hacernos sentir tan queridos. ¡Nos habéis regalado una fiesta inolvidable!...(Todavía no ha pasado pero no dudamos en que esto ocurrirá tal cual)",
      hour: '...',

    }
  ];

  pacmanRef = viewChild<ElementRef<HTMLImageElement>>('pacman');
  pointRefs = viewChildren<ElementRef<HTMLElement>>('point');

  private rafId: number | null = null;
  private visitedPoints = new Set<HTMLElement>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    afterNextRender(() => {
      this.startTracking();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private startTracking(): void {
    const pacmanEl = this.pacmanRef()?.nativeElement;
    const points = this.pointRefs().map((ref) => ref.nativeElement);

    if (!pacmanEl || points.length === 0) {
      return;
    }

    const tick = () => {
      const pacmanRect = pacmanEl.getBoundingClientRect();
      const pacmanCenterX = pacmanRect.left + pacmanRect.width / 2;
      const pacmanCenterY = pacmanRect.top + pacmanRect.height / 2;

      points.forEach((point) => {
        if (this.visitedPoints.has(point)) {
          return;
        }

        const pointRect = point.getBoundingClientRect();
        const pointCenterX = pointRect.left + pointRect.width / 2;
        const pointCenterY = pointRect.top + pointRect.height / 2;
        const distance = Math.hypot(
          pacmanCenterX - pointCenterX,
          pacmanCenterY - pointCenterY
        );

        if (distance <= pointRect.width * 2) {
          point.classList.add('punto-visitado');
          this.visitedPoints.add(point);
        }
      });

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }



}

