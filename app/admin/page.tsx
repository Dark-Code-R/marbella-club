'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { lounges as initialLounges, Lounge } from '@/lib/data';
import Link from 'next/link';

export default function AdminPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [lounges, setLounges] = useState<Lounge[]>(initialLounges);

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleCancelReservation = (loungeId: number) => {
    setLounges(prevLounges =>
      prevLounges.map(lounge =>
        lounge.id === loungeId ? { ...lounge, status: 'available' } : lounge
      )
    );
  };

  // Render a loading state or null while redirecting
  if (!currentUser || currentUser.role !== 'admin') {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <p>Redirigiendo...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-500">
          Panel de Administrador
        </h1>
        <Link href="/" className="text-indigo-400 hover:text-indigo-300">&larr; Volver al mapa</Link>
      </header>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Estado de los Lounges</h2>
        <div className="space-y-4">
          {lounges.map(lounge => (
            <div key={lounge.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
              <div>
                <p className="font-bold">{lounge.name}</p>
                <p className={`text-sm ${lounge.status === 'available' ? 'text-green-400' : 'text-red-400'}`}>
                  {lounge.status === 'available' ? 'Disponible' : 'Reservado'}
                </p>
              </div>
              {lounge.status === 'reserved' && (
                <button
                  onClick={() => handleCancelReservation(lounge.id)}
                  className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 transition-colors font-semibold text-sm"
                >
                  Cancelar Reserva
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
