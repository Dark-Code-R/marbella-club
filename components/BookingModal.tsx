import { Lounge } from "@/lib/data";

interface BookingModalProps {
  lounge: Lounge | null;
  onClose: () => void;
  onConfirm: (loungeId: number) => void;
}

export default function BookingModal({ lounge, onClose, onConfirm }: BookingModalProps) {
  if (!lounge) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Confirmar Reserva</h2>
        <p className="text-gray-300 mb-6">
          Estas a punto de reservar <span className="font-bold text-yellow-400">{lounge.name}</span>.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(lounge.id)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
