import { motion } from "framer-motion";
import { useNavigate } from "react-router";

interface ThankYouMessageProps {
  onClose: () => void;
}

export default function ThankYouMessage({ onClose }: ThankYouMessageProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // cierra modal o limpia estado
    navigate("/productos"); // redirige a productos
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-xl text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-green-600">
          ¡Gracias por tu compra!
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700"
        >
          Tu pedido fue procesado con éxito.
        </motion.p>

        <button
          onClick={handleClose}
          className="mt-6 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
