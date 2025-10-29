import React, { useState, useEffect } from 'react'
import './App.css'

interface Memory {
  id: number
  date: string
  title: string
  description: string
  image: string
}

const App: React.FC = () => {
  const [currentMemory, setCurrentMemory] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Tanggal ulang tahun pacar kamu: 30 Oktober 2004
  const thisYear = new Date().getFullYear()
  const birthdayThisYear = new Date(thisYear, 9, 30) // Oktober = 9 (0-11), tanggal 30
  const currentDate = new Date()
  
  // Tentukan tanggal ulang tahun berikutnya
  let nextBirthday = new Date(birthdayThisYear)
  if (birthdayThisYear < currentDate) {
    nextBirthday.setFullYear(thisYear + 1)
  }

  // Calculate age - Pacar kamu lahir tahun 2004
  const birthYear = 2004
  let age = thisYear - birthYear
  if (birthdayThisYear > currentDate) {
    age = age - 1 // Jika belum ulang tahun tahun ini, kurangi 1
  }

  // Check if today is birthday
  const isTodayBirthday = 
    birthdayThisYear.getMonth() === currentDate.getMonth() &&
    birthdayThisYear.getDate() === currentDate.getDate()

  // Memories data - kenangan-kenangan indah kalian
  const memories: Memory[] = [
    {
      id: 1,
      date: '30 Oktober 2023',
      title: 'Ulang Tahun ke-19',
      description: 'Ulang tahun pertamamu yang kita rayakan bersama. Saat itu kamu masih 19 tahun dan aku sudah tahu bahwa kamu adalah orang yang tepat untukku.',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      date: 'Desember 2023',
      title: 'Momen Liburan Akhir Tahun',
      description: 'Liburan akhir tahun kita bersama. Kamu yang masih 19 tahun tapi sudah begitu dewasa dan penuh perhatian. Aku semakin yakin bahwa kamu adalah jodohku.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      date: 'Valentine 2024',
      title: 'Valentine Pertama Bersama',
      description: 'Valentine pertama kita saat kamu sudah hampir 20 tahun. Momen dimana aku tahu bahwa cintaku padamu semakin dalam dan aku ingin menghabiskan sisa hidupku bersamamu.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      date: 'Musim Semi 2024',
      title: 'Momen Spesial Bersamamu',
      description: 'Setiap momen bersamamu adalah kenangan yang paling berharga. Kamu yang baru berusia 20 tahun tapi sudah membuat hidupku penuh warna dan kebahagiaan.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      date: 'Musim Panas 2024',
      title: 'Petualangan Kita',
      description: 'Petualangan-petualangan kecil kita yang penuh tawa. Kamu yang masih muda tapi sudah begitu bijak dan penuh cinta. Aku bersyukur bisa mengenalmu.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
    }
  ]

  // Countdown timer ke ulang tahun
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = nextBirthday.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextBirthday])

  // Auto-rotate memories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMemory((prev) => (prev + 1) % memories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [memories.length])

  const nextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % memories.length)
  }

  const prevMemory = () => {
    setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="hearts">
          <span className="heart">🎂</span>
          <span className="heart">🎉</span>
          <span className="heart">🎈</span>
          <span className="heart">🎁</span>
          <span className="heart">✨</span>
        </div>
        <h1 className="title">Happy 20th Birthday!</h1>
        <p className="subtitle">Selamat Ulang Tahun yang ke-{age} Tahun!</p>
        <p className="special-message">🎉 Welcome to your 20Th! 🎉</p>
      </header>

      {/* Countdown Timer */}
      <section className="countdown-section">
        {isTodayBirthday ? (
          <>
            <h2 style={{fontSize: '2.5rem', marginBottom: '20px'}}>🎉 HARI INI ADALAH ULANG TAHUNMU! 🎉</h2>
            <p style={{fontSize: '1.5rem', color: 'white', marginBottom: '20px'}}>
              Selamat ulang tahun yang ke-{age} tahun! Hari ini adalah hari spesialmu! 🎂✨
            </p>
            <div className="countdown">
              <div className="time-unit">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Jam</span>
              </div>
              <div className="time-unit">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Menit</span>
              </div>
              <div className="time-unit">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Detik</span>
              </div>
            </div>
            <p style={{fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', marginTop: '20px'}}>
              Nikmati setiap momen spesial hari ini! 💕
            </p>
          </>
        ) : (
          <>
            <h2>Menuju Ulang Tahunmu</h2>
            <div className="countdown">
              <div className="time-unit">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Hari</span>
              </div>
              <div className="time-unit">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Jam</span>
              </div>
              <div className="time-unit">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Menit</span>
              </div>
              <div className="time-unit">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Detik</span>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Love Quote */}
      <section className="quote-section">
        <blockquote className="love-quote">
          "Selamat ulang tahun yang ke-{age} tahun, sayangku! Di usia 20 tahun ini, kamu sudah menjadi wanita yang begitu istimewa. 
          Aku bangga melihatmu tumbuh menjadi pribadi yang penuh cinta, bijak, dan penuh perhatian. 
          Semoga di usia yang baru ini, semua impianmu terwujud dan kebahagiaan selalu menyertaimu. Aku akan selalu ada untuk mendukungmu! 💕"
        </blockquote>
      </section>

      {/* Memories Gallery */}
      <section className="memories-section">
        <h2>Kenangan Indah Bersamamu</h2>
        <div className="memory-container">
          <button className="nav-btn prev" onClick={prevMemory}>‹</button>
          <div className="memory-card">
            <div className="memory-image">
              <img src={memories[currentMemory].image} alt={memories[currentMemory].title} />
            </div>
            <div className="memory-content">
              <h3>{memories[currentMemory].title}</h3>
              <p className="memory-date">{memories[currentMemory].date}</p>
              <p className="memory-description">{memories[currentMemory].description}</p>
            </div>
          </div>
          <button className="nav-btn next" onClick={nextMemory}>›</button>
        </div>
        <div className="memory-dots">
          {memories.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentMemory ? 'active' : ''}`}
              onClick={() => setCurrentMemory(index)}
            />
          ))}
        </div>
      </section>

      {/* Love Letter */}
      <section className="love-letter-section">
        <h2>Ucapan Ulang Tahun untuk Kamu</h2>
        <div className="love-letter">
          <p>
            Sayangku yang tercinta,
          </p>
          <p>
            Selamat ulang tahun yang ke-{age} tahun! Hari ini, 30 Oktober, adalah hari yang sangat spesial 
            karena 20 tahun yang lalu, dunia mendapat hadiah terindah - yaitu kamu. Di hari spesialmu ini, 
            aku ingin mengucapkan terima kasih sudah menjadi bagian terpenting dalam hidupku.
          </p>
          <p>
            Kamu yang baru berusia 20 tahun tapi sudah begitu dewasa, bijak, dan penuh cinta. Setiap hari 
            bersamamu adalah hadiah terindah yang pernah aku terima. Senyummu yang manis, tawamu yang 
            menular, dan kepedulianmu yang tulus membuatku jatuh cinta lebih dalam setiap harinya.
          </p>
          <p>
            Di usia 20 tahun ini, kamu sudah membuktikan bahwa usia hanyalah angka. Kamu sudah menjadi 
            wanita yang mandiri, penuh perhatian, dan selalu membuat orang di sekitarmu merasa bahagia. 
            Aku bangga melihatmu tumbuh menjadi pribadi yang begitu istimewa.
          </p>
          <p>
            Semoga di usia yang baru ini, semua impianmu terwujud, semoga kebahagiaan selalu menyertaimu, 
            dan semoga kamu selalu sehat dan bahagia. Aku berjanji akan selalu ada untuk mendukungmu 
            dalam setiap langkah, dalam setiap impian, dan dalam setiap momen hidupmu.
          </p>
          <p>
            Terima kasih sudah mengajariku arti cinta sejati, arti kebahagiaan sederhana, dan arti hidup 
            yang sesungguhnya. Kamu adalah inspirasi terbesar dalam hidupku.
          </p>
          <p>
            Sekali lagi, selamat ulang tahun yang ke-{age} tahun, sayang! Semoga hari ini menjadi hari 
            yang penuh dengan kebahagiaan, canda tawa, dan cinta. Nikmati setiap momen spesial hari ini 
            dan ingat bahwa kamu sangat dicintai.
          </p>
          <p>
            Aku tidak bisa membayangkan hidupku tanpa kamu. Kamu adalah segalanya bagiku, sekarang dan 
            selamanya.
          </p>
          <p className="signature">
            Selamat ulang tahun yang ke-{age} tahun, sayang! 🎂🎉🎈<br />
            <strong>Dari pacarmu yang sangat mencintaimu</strong><br />
            <span style={{fontSize: '1.2rem'}}>💕 Happy 20th Birthday! 💕</span><br />
            <span style={{fontSize: '0.9rem', color: '#666'}}>30 Oktober 2004 - 30 Oktober 2024</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with 💕 for the most amazing person in the world</p>
        <p>© 2024 - Birthday Website</p>
      </footer>
    </div>
  )
}

export default App