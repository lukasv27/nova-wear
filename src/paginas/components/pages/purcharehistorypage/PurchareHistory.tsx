
import HistoryEmpty from '../../HistoryEmpty';
import { Outlet } from 'react-router';
import { useCart } from '../../CartProvider';

const PurchaseHistory = () => {
    
    const { cart } = useCart();   // <--- aquí obtienes los productos

    if (cart.length === 0)
        return <HistoryEmpty/>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Productos en tu carrito</h2>

            {/* LISTA DE PRODUCTOS */}
            <div className="space-y-4">
                {cart.map(item => (
                    <div
                        key={`${item.productId}-${item.size}`}
                        className="flex items-center gap-4 border-b pb-3"
                    >
                        {/* Imagen */}
                        {item.imageBase64 && (
                            <img
                                src={item.imageBase64}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                        )}

                        {/* Info */}
                        <div className="flex-1">
                            <p className="font-semibold text-lg">{item.name}</p>
                            <p className="text-sm text-gray-500">Talla: {item.size}</p>
                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>

                        {/* Precio */}
                        <span className="font-bold text-lg">
                            ${Number(item.price) * item.quantity}
                        </span>
                    </div>
                ))}
            </div>

            <Outlet/>
        </div>
    );
};

export default PurchaseHistory;
