import { useEffect, useState } from 'react';
import {
  CalendarCheck2,
  Clock3,
  Copy,
  MapPinned,
  Navigation,
  Share2,
} from 'lucide-react';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

type GalleryPhoto = {
  src: string;
  alt: string;
};

const EVENT = {
  couple: 'Nur & Umut',
  subtitle: 'Nikah Törenimize Davetlisiniz',
  date: '2 Mayıs 2026 Cumartesi',
  time: '13:00',
  venue: 'Tilia Sahne',
  address: 'Fevzi Çakmak, 03100 Erkmen/Afyonkarahisar Merkez/Afyonkarahisar',
  dateIso: '2026-05-02T13:00:00+03:00',
};

const targetTimestamp = new Date(EVENT.dateIso).getTime();
const mapsQuery = `${EVENT.venue}, ${EVENT.address}`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
const whatsappMessage = encodeURIComponent(
  `${EVENT.couple} nikah davetiyesi\n${EVENT.date} - ${EVENT.time}\n${EVENT.venue}\n${mapsLink}`
);
const whatsappShareLink = `https://wa.me/?text=${whatsappMessage}`;

const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/photos/20250725_102131.jpg',
    alt: 'El ele yürüyen çiftin siyah beyaz karesi',
  },
  {
    src: '/photos/20250721_161401.jpg',
    alt: 'Nur ve Umut bahçedeki yürüyüş yolunda',
  },
  {
    src: '/photos/20250715_030208.png',
    alt: 'Nişan anından sıcak bir portre',
  },
  {
    src: '/photos/IMG-20250721-WA0011.jpg',
    alt: 'Çiftin sarıldığı yakın plan kare',
  },
  {
    src: '/photos/20250721_163748.jpg',
    alt: 'Çiftin dans ederken çekilen siyah beyaz fotoğrafı',
  },
];

const getCountdown = (target: number): Countdown => {
  const difference = target - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLive: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isLive: false,
  };
};

const formatTime = (value: number): string => value.toString().padStart(2, '0');

function App() {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(targetTimestamp));
  const [copyButtonText, setCopyButtonText] = useState('Adresi Kopyala');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(targetTimestamp));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!revealElements.length) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const countdownItems = [
    { label: 'Gün', value: countdown.days },
    { label: 'Saat', value: countdown.hours },
    { label: 'Dakika', value: countdown.minutes },
    { label: 'Saniye', value: countdown.seconds },
  ];

  const handleCopyAddress = async (): Promise<void> => {
    if (!navigator.clipboard) {
      setCopyButtonText('Bu cihazda desteklenmiyor');
      return;
    }

    try {
      await navigator.clipboard.writeText(EVENT.address);
      setCopyButtonText('Adres kopyalandı');
    } catch {
      setCopyButtonText('Tekrar deneyin');
    }

    window.setTimeout(() => {
      setCopyButtonText('Adresi Kopyala');
    }, 2200);
  };

  return (
    <div className="invitation-page">
      <div className="ambient-orb orb-left" aria-hidden="true" />
      <div className="ambient-orb orb-right" aria-hidden="true" />

      <header className="hero-section">
        <div className="hero-surface reveal" data-reveal>
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-badge">Nikah Davetiyesi</span>
              <h1 className="couple-names">{EVENT.couple}</h1>
              <p className="hero-subtitle">{EVENT.subtitle}</p>
              <p className="hero-lead">
                2 Mayıs 2026 Cumartesi günü, Tilia Sahne&apos;de mutluluğumuzu sizinle paylaşmak
                istiyoruz.
              </p>

              <div className="event-meta">
                <article className="meta-item">
                  <CalendarCheck2 aria-hidden="true" />
                  <div>
                    <p>Tarih</p>
                    <strong>{EVENT.date}</strong>
                  </div>
                </article>
                <article className="meta-item">
                  <Clock3 aria-hidden="true" />
                  <div>
                    <p>Saat</p>
                    <strong>{EVENT.time}</strong>
                  </div>
                </article>
                <article className="meta-item">
                  <MapPinned aria-hidden="true" />
                  <div>
                    <p>Mekan</p>
                    <strong>{EVENT.venue}</strong>
                  </div>
                </article>
              </div>

              <section className="countdown-card" aria-label="Etkinliğe kalan süre">
                {countdown.isLive ? (
                  <div className="countdown-live">
                    <p>Bugün büyük gün.</p>
                    <strong>Mutluluğumuza hoş geldiniz.</strong>
                  </div>
                ) : (
                  <div className="countdown-grid">
                    {countdownItems.map((item) => (
                      <div className="countdown-cell" key={item.label}>
                        <span>{formatTime(item.value)}</span>
                        <small>{item.label}</small>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="hero-actions">
                <a className="action-button primary" href="#location">
                  Konuma Git
                </a>
                <a className="action-button ghost" href="/nikah-davetiye.ics" download>
                  Takvime Ekle
                </a>
              </div>
            </div>

            <figure className="hero-portrait">
              <img
                src="/photos/20250721_161401.jpg"
                alt="Nur ve Umut'un nikah davetiyesi için seçilen portre fotoğrafı"
              />
              <figcaption>
                <span>{EVENT.venue}</span>
                <strong>2 Mayıs 2026 • 13:00</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      <main>
        <section className="section story-section reveal" data-reveal>
          <article className="story-card">
            <h2>En Özel Günümüzde Birlikte Olalım</h2>
            <p>
              Hayatımızın en anlamlı anında, sevdiğimiz insanlarla aynı çatı altında olmak
              istiyoruz. 2 Mayıs 2026 Cumartesi günü, Tilia Sahne&apos;de gerçekleşecek nikah
              törenimize katılımınız bize büyük mutluluk verecek.
            </p>
            <p>
              Bu davetiye, birlikte biriktirdiğimiz güzel anıların devamı için yazıldı. Sizleri
              aramızda görmek bizim için çok kıymetli.
            </p>
          </article>
          <figure className="story-photo">
            <img
              src="/photos/IMG-20250721-WA0011.jpg"
              alt="Nur ve Umut'un samimi bir kareden portresi"
            />
            <figcaption>Nur & Umut</figcaption>
          </figure>
        </section>

        <section className="section schedule-section reveal" data-reveal>
          <div className="section-heading">
            <p>Tören Akışı</p>
            <h2>Nikah Programı</h2>
          </div>

          <div className="schedule-grid">
            <article className="schedule-card">
              <span>12:30</span>
              <h3>Karşılama</h3>
            </article>
            <article className="schedule-card">
              <span>13:00</span>
              <h3>Nikah Merasimi</h3>
            </article>
            <article className="schedule-card">
              <span>13:30</span>
              <h3>Tebrik & Fotoğraf</h3>
            </article>
          </div>
        </section>

        <section className="section gallery-section reveal" data-reveal id="gallery">
          <div className="section-heading">
            <p>Nişandan Kareler</p>
            <h2>Nişan Fotoğrafları</h2>
          </div>
          <div className="gallery-grid">
            {galleryPhotos.map((photo, index) => (
              <figure className="gallery-item" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span>{(index + 1).toString().padStart(2, '0')}</span>
              </figure>
            ))}
          </div>
        </section>

        <section className="section location-section reveal" data-reveal id="location">
          <article className="location-card">
            <div className="section-heading">
              <p>Lokasyon</p>
              <h2>{EVENT.venue}</h2>
            </div>
            <p className="address-text">{EVENT.address}</p>

            <button className="action-button ghost full-width" onClick={handleCopyAddress} type="button">
              <Copy aria-hidden="true" />
              {copyButtonText}
            </button>

            <div className="location-actions">
              <a
                className="action-button primary full-width"
                href={mapsLink}
                rel="noreferrer"
                target="_blank"
              >
                <Navigation aria-hidden="true" />
                Yol Tarifi Al
              </a>
              <a
                className="action-button ghost full-width"
                href={whatsappShareLink}
                rel="noreferrer"
                target="_blank"
              >
                <Share2 aria-hidden="true" />
                WhatsApp ile Paylaş
              </a>
            </div>
          </article>

          <div className="map-frame">
            <iframe
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsEmbedSrc}
              title={`${EVENT.venue} harita konumu`}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{EVENT.couple}</p>
        <small>2 Mayıs 2026 | Tilia Sahne, Afyonkarahisar</small>
      </footer>
    </div>
  );
}

export default App;
