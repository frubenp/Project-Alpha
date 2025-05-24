# S-DES Cracker Webapp

This project is a simple web application that enables
 the brute-force cracking of the Simplified DES (S-DES)
 encryption scheme based on a given plaintext and its corresponding ciphertext.

## Project Motivation
The motivation behind this project was to explore and understand the fundamentals
 of cryptographic security in a practical and accessible manner while also using F#.
 The inspiration came from learning "Data Security" during this semester.
  S-DES, being a simplified version of DES, is an ideal choice for learning key cryptographic concepts
   like encryption, decryption, and brute-force attacks without overwhelming complexity.


## Technologies

- **Frontend**: React (Next.js)
- **Backend**: F# + Giraffe


## RUNNING LOCALLY

## Requirements

- [.NET SDK 7+](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)

### 1. Running the backend

```bash
cd backend
dotnet run
```

This will make the API available at http://localhost:5000/crack.

### 2. Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

This will make the frontend available at http://localhost:3000.

---


## File Structure

```
cipher-cracker/
├── backend/
│   ├── Program.fs
│   ├── Handlers.fs
│   └── Sdes.fs
├── frontend/
│   └── pages/index.tsx
└── railway.json
```

