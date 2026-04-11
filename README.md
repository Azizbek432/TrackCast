# 🛰️ TrackCast | Professional Telemetry Overlay App

`TrackCast` is a specialized activity tracking application designed to overlay real-time performance metrics (speed, location, and path) onto a user-centric interface. Developed for high-movement activities like driving, skiing, and cycling.

---

## 🚀 MVP Core Features

The primary goal is to build a stable Minimum Viable Product (MVP) that records essential trip data with a clean, high-performance UI.

- **Activity Recording**: Precise tracking for high-velocity sports including driving, walking, and skiing.
- **Dynamic Speedometer**: Live speed visualization using `React Native Reanimated` for 60fps smoothness.
- **Live Map Path**: Real-time breadcrumb trail (polyline) mapping using `react-native-maps`.
- **Telemetry Overlay**: Professional channel branding and data overlays for content creators.
- **Data Persistence**: Local session storage including duration, distance, and peak/average speeds.

---

## 🛠️ Technical Stack

- **Core**: React Native (Expo) + TypeScript for type-safe development.
- **Navigation**: Expo Router or React Navigation for seamless transitions.
- **Location Engine**: `expo-location` and `expo-task-manager` for precise coordinate polling.
- **Database**: `expo-sqlite` for high-performance local data relational storage.

---

## 📂 Architecture & Roadmap

### Project Structure

```text
/src
  /components      # UI elementlar: Speedometer, MapView, ChannelLogo
  /features        # Mantiq: useLocationTracker.ts, trackingStore.ts
  /screens         # Sahifalar: Home, Recording, History
  /utils           # Yordamchi funksiyalar: Speed formatting, Geo-logic
```

---

### 🗺️ Development Roadmap & Strategy

#### ✅ PHASE 1–2: PROJECT SETUP & CORE GPS

- Initialize Expo with TypeScript template.
- Implement GPS subscription and real-time speed polling.
- **Goal:** Speed updates live and works while moving.

#### ✅ PHASE 3–4: MAPS & SPEEDOMETER UI

- Integration of `react-native-maps` with Polyline path rendering.
- Design of big numeric speed display and unit toggle (km/h / mph).
- Implementation of needle animations and smooth gauge transitions.

#### ✅ PHASE 5–6: SESSION RECORDING & OVERLAYS

- SQLite integration for storing trip history (distance, duration, max speed).
- Implementation of the Overlay system (Channel logo + Speedometer).
- Responsive layout support for Landscape mode.

#### 🔮 PHASE 7+: ADVANCED FEATURES (POST-MVP)

- Background tracking and battery optimization via `expo-task-manager`.
- Video capture synchronization with GPS data.
- YouTube Data API integration for automated uploads.

---

## 👥 Team & Collaboration

This project is a collaboration between **Maciej Drahusz** (Founder of "Code & Hustle" channel) and **Azizbek Abdullayev**.

| Role | Name | GitHub |
|------|------|--------|
| Collaborator (Founder) | Maciej Drahusz | [@mrMagic-web](https://github.com/mrMagic-web) |
| Lead Developer | Azizbek Abdullayev | — |

---

## 🎯 Strategic Objectives

- **Sustainability:** Delaying livestreaming functionality, which is risky for junior developers, to focus on a stable MVP.
- **Data Cleanliness:** Implement GPS jitter (noise) filters.
- **Battery Savings:** Background tracking will only be added in Phase 7.

---

## ⚠️ Technical risks

- **Background Location:** Android/iOS battery limitations (High complexity).
- **Video Sync:** Synchronizing video with GPS coordinates challenges.
- **Map Performance:** Optimization of multipoint polylines.

<details>
<summary>🇺🇿 O'zbekcha versiya</summary>

# 🛰️ TrackCast | Professional Telemetriya Overlay Ilovasi

`TrackCast` — foydalanuvchi interfeysiga real vaqt rejimida ishlash ko'rsatkichlarini (tezlik, joylashuv va yo'nalish) ko'rsatish uchun mo'ljallangan maxsus faoliyat kuzatuv ilovasi. Haydash, chang'i uchish va velosiped haydash kabi yuqori harakatli faoliyatlar uchun ishlab chiqilgan.

---

## 🚀 MVP Asosiy Funksiyalar

Asosiy maqsad — toza va yuqori samarali UI bilan muhim sayohat ma'lumotlarini yozib oladigan barqaror Minimal Ishlaydigan Mahsulot (MVP) yaratish.

- **Faoliyat Yozish**: Haydash, piyoda yurish va chang'i uchish kabi yuqori tezlikdagi sportlar uchun aniq kuzatuv.
- **Dinamik Tezlik O'lchagich**: `React Native Reanimated` yordamida 60fps silliqligida jonli tezlik vizualizatsiyasi.
- **Jonli Xarita Yo'li**: `react-native-maps` yordamida real vaqt rejimida non izlari (polyline) xaritalash.
- **Telemetriya Overlay**: Kontent yaratuvchilar uchun professional kanal brendingi va ma'lumot overlaylari.
- **Ma'lumotlarni Saqlash**: Davomiylik, masofa va eng yuqori/o'rtacha tezliklarni o'z ichiga olgan mahalliy sessiya xotirasi.

---

## 🛠️ Texnik Stack

- **Asos**: Xavfsiz ishlab chiqish uchun React Native (Expo) + TypeScript.
- **Navigatsiya**: Muammosiz o'tishlar uchun Expo Router yoki React Navigation.
- **Joylashuv Mexanizmi**: Aniq koordinata so'rovi uchun `expo-location` va `expo-task-manager`.
- **Ma'lumotlar Bazasi**: Yuqori samarali mahalliy relyatsion saqlash uchun `expo-sqlite`.

---

## 📂 Arxitektura va Yo'l Xaritasi

### Loyiha Tuzilmasi

```text
/src
  /components      # UI elementlar: Speedometer, MapView, ChannelLogo
  /features        # Mantiq: useLocationTracker.ts, trackingStore.ts
  /screens         # Sahifalar: Home, Recording, History
  /utils           # Yordamchi funksiyalar: Speed formatting, Geo-logic
```

---

### 🗺️ Rivojlantirish Yo'l Xaritasi va Strategiya

#### ✅ BOSQICH 1–2: LOYIHANI SOZLASH VA ASOSIY GPS

- Expo'ni TypeScript shabloni bilan ishga tushirish.
- GPS obunasi va real vaqt tezlik so'rovini amalga oshirish.
- **Maqsad:** Tezlik jonli yangilanadi va harakat paytida ishlaydi.

#### ✅ BOSQICH 3–4: XARITA VA TEZLIK O'LCHAGICH UI

- `react-native-maps` ni Polyline yo'l ko'rsatish bilan integratsiyalash.
- Katta raqamli tezlik ko'rsatgichi va birlik almashtirish (km/soat / mil/soat) dizayni.
- Igna animatsiyalari va silliq o'lchagich o'tishlarini amalga oshirish.

#### ✅ BOSQICH 5–6: SESSIYANI YOZISH VA OVERLAYLAR

- Sayohat tarixini saqlash uchun SQLite integratsiyasi (masofa, davomiylik, maksimal tezlik).
- Overlay tizimini amalga oshirish (Kanal logotipi + Tezlik o'lchagich).
- Landscape rejimi uchun moslashuvchan tartib qo'llab-quvvatlash.

#### 🔮 BOSQICH 7+: KENGAYTIRILGAN FUNKSIYALAR (MVP DAN KEYIN)

- `expo-task-manager` orqali fon kuzatuvi va batareya optimizatsiyasi.
- GPS ma'lumotlari bilan video yozishni sinxronlash.
- Avtomatlashtirilgan yuklashlar uchun YouTube Data API integratsiyasi.

---

## 👥 Jamoa va Hamkorlik

Bu loyiha **Maciej Drahusz** ("Code & Hustle" kanali asoschisi) va **Azizbek Abdullayev** o'rtasidagi hamkorlikdir.

| Rol | Ism | GitHub |
|-----|-----|--------|
| Hamkorchi (Asoschi) | Maciej Drahusz | [@mrMagic-web](https://github.com/mrMagic-web) |
| Bosh Dasturchi | Azizbek Abdullayev | — |

---

## 🎯 Strategik Maqsadlar

- **Barqarorlik:** Junior dasturchilar uchun xavfli bo'lgan livestreaming funksiyasini kechiktirish, asosiy e'tiborni barqaror MVPga qaratish.
- **Ma'lumotlar Tozaligi:** GPS jitter (shovqin) filtrlarini qo'llash.
- **Batareya Tejamkorligi:** Background tracking faqat Phase 7da qo'shiladi.

---

## ⚠️ Texnik Risklar

- **Background Location:** Android/iOS batareya cheklovlari (Yuqori murakkablik).
- **Video Sync:** Videoni GPS koordinatalari bilan sinxronlash challenges.
- **Map Performance:** Ko'p nuqtali polylinelarni optimizatsiya qilish.

</details>
