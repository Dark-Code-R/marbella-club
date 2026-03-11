'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const agendaItems = [
  {
    day: 'Viernes',
    tag: 'DJ Set',
    title: 'Urban Beats',
    artist: 'DJ Alex Moreno',
    time: '23:00 - 05:00',
    desc: 'Reggaeton, Hip Hop y hits urbanos toda la noche.',
    image:
      'https://images.unsplash.com/photo-1571266028243-d220c9c3b3eb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    day: 'Sabado',
    tag: 'Live Show',
    title: 'Electro Nights',
    artist: 'Laura Sanz',
    time: '00:00 - 06:00',
    desc: 'House, techno y musica electronica de primer nivel.',
    image:
      'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    day: 'Domingo',
    tag: 'Noche Especial',
    title: 'Sunday Session',
    artist: 'Collective Sound',
    time: '22:00 - 04:00',
    desc: 'Una noche con mezclas selectas y ambiente exclusivo.',
    image:
      'https://images.unsplash.com/photo-1571266028243-d220c9c3b3eb?auto=format&fit=crop&w=1200&q=80',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1617083934556-0a28f6f4f703?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
];

export default function Page() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.ml-nav-wrap', { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' });
      gsap.fromTo('.ml-badge', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.12, ease: 'power2.out' });
      gsap.fromTo('.ml-hero h1', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, delay: 0.2, ease: 'power2.out' });
      gsap.fromTo('.ml-hero p', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.ml-hero-actions > *', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.38, stagger: 0.08, ease: 'power2.out' });
      gsap.fromTo('.ml-hero-meta li', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, delay: 0.5, stagger: 0.06, ease: 'power2.out' });

      gsap.to('.ml-hero-bg', {
        scale: 1.05,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray<HTMLElement>('.ml-section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.ml-headline, .ml-event-card, .ml-gallery-item, .ml-vip-card, .ml-contact-info, .ml-form'),
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="ml-page" ref={rootRef}>
      <header className="ml-nav-wrap">
        <nav className="ml-nav">
          <a href="#inicio" className="ml-brand">
            Marbella Lounge
          </a>

          <div className="ml-links">
            <a href="#agenda">Agenda</a>
            <a href="#galeria">Galeria</a>
            <a href="#vip">VIP</a>
            <a href="#contacto">Contacto</a>
            <Link href="/reservas" className="ml-cta-nav">
              Reservar Ahora
            </Link>
          </div>
        </nav>
      </header>

      <section className="ml-hero" id="inicio">
        <div className="ml-hero-bg" aria-hidden="true" />
        <div className="ml-hero-overlay" aria-hidden="true" />

        <div className="ml-hero-content">
          <span className="ml-badge">Abierto ahora</span>
          <h1>Viernes, Sabado y Domingo</h1>
          <p>La experiencia musical mas exclusiva de la ciudad</p>

          <div className="ml-hero-actions">
            <Link href="/reservas" className="ml-cta-main">
              Reservar Ahora
            </Link>
            <a href="#agenda" className="ml-cta-ghost">
              Ver Eventos
            </a>
          </div>

          <ul className="ml-hero-meta">
            <li>Jueves - Domingo</li>
            <li>23:00 - 06:00</li>
            <li>Marbella, Espana</li>
          </ul>
        </div>
      </section>

      <section className="ml-section" id="agenda">
        <div className="ml-headline">
          <h2>
            Agenda <span>Semanal</span>
          </h2>
          <p>Los mejores eventos y artistas cada fin de semana</p>
        </div>

        <div className="ml-agenda-grid">
          {agendaItems.map((item) => (
            <article className="ml-event-card" key={item.day}>
              <div className="ml-event-media" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.tag}</span>
                <h3>{item.day}</h3>
              </div>
              <div className="ml-event-body">
                <h4>{item.title}</h4>
                <p className="ml-line">{item.artist}</p>
                <p className="ml-line">{item.time}</p>
                <p className="ml-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ml-section" id="galeria">
        <div className="ml-headline">
          <h2>
            Vive la <span>Experiencia</span>
          </h2>
          <p>Un vistazo al ambiente exclusivo de Marbella Lounge</p>
        </div>

        <div className="ml-gallery-grid">
          {galleryImages.map((img, index) => (
            <div className="ml-gallery-item" key={img} style={{ backgroundImage: `url(${img})` }}>
              {index === 2 ? <span>Ver mas</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="ml-section" id="vip">
        <div className="ml-headline">
          <h2>
            Experiencia <span>VIP</span>
          </h2>
          <p>Disfruta de privilegios exclusivos y servicios premium</p>
        </div>

        <div className="ml-vip-grid">
          <article className="ml-vip-card">
            <h3>Reservas Lounge y VIP</h3>
            <p>Mesas exclusivas con servicio personalizado y mejor vista de pista.</p>
          </article>
          <article className="ml-vip-card">
            <h3>Atencion Personalizada</h3>
            <p>Host dedicado para tu grupo durante toda la noche.</p>
          </article>
          <article className="ml-vip-card">
            <h3>Ubicacion Privilegiada</h3>
            <p>En el corazon de Marbella, facil acceso y parking cercano.</p>
          </article>
          <article className="ml-vip-card">
            <h3>Ambiente Seguro</h3>
            <p>Control de acceso y personal de seguridad profesional.</p>
          </article>
        </div>
      </section>

      <section className="ml-section" id="contacto">
        <div className="ml-headline">
          <h2>
            Ponte en <span>Contacto</span>
          </h2>
          <p>Tienes preguntas? Estamos aqui para ayudarte</p>
        </div>

        <div className="ml-contact-grid">
          <div className="ml-contact-info">
            <h3>Informacion de Contacto</h3>
            <p>
              <strong>Ubicacion:</strong> Av. Ricardo Soriano, 72, 29601 Marbella
            </p>
            <p>
              <strong>WhatsApp:</strong> +34 612 345 678
            </p>
            <p>
              <strong>Horario:</strong> Jueves a Domingo, 23:00 - 06:00
            </p>
            <a href="https://maps.google.com/?q=Av.+Ricardo+Soriano+72+Marbella" target="_blank" rel="noreferrer">
              Ver en Google Maps
            </a>

            <iframe
              title="Mapa Marbella Lounge"
              src="https://www.google.com/maps?q=Av.+Ricardo+Soriano+72,+Marbella&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form className="ml-form">
            <label>
              Nombre Completo
              <input type="text" placeholder="Tu nombre" />
            </label>
            <label>
              Email
              <input type="email" placeholder="tu@email.com" />
            </label>
            <label>
              Telefono
              <input type="tel" placeholder="+34 600 000 000" />
            </label>
            <label>
              Mensaje
              <textarea placeholder="Cuentanos en que podemos ayudarte..." rows={5} />
            </label>
            <button type="button">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      <footer className="ml-footer">
        <div>
          <h4>Marbella Lounge</h4>
          <p>La experiencia musical mas exclusiva. Viernes, Sabado y Domingo.</p>
        </div>
        <div>
          <h4>Navegacion</h4>
          <p>Agenda</p>
          <p>Galeria</p>
          <p>VIP</p>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>Av. Ricardo Soriano, 72</p>
          <p>+34 612 345 678</p>
        </div>
        <div>
          <h4>CTA</h4>
          <Link href="/reservas">Reservar Ahora</Link>
        </div>
      </footer>
    </main>
  );
}
