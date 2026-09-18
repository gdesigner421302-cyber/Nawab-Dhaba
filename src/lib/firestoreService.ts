import { 
  db, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from './firebase';

export interface ReservationData {
  id?: string;
  userId: string;
  userName: string;
  userEmail?: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingPreference: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated';
  createdAt?: unknown;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  spiceLevel?: string;
}

export interface OrderData {
  id?: string;
  userId: string;
  userName: string;
  userEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  diningType: 'Dine-In' | 'Highway Takeaway' | 'Table Delivery';
  tableNumber?: string;
  paymentMethod: 'Pay at Counter' | 'UPI' | 'Card on Arrival';
  status: 'confirmed' | 'kitchen-prep' | 'ready';
  specialNotes?: string;
  createdAt?: unknown;
}

export async function saveReservation(data: Omit<ReservationData, 'createdAt' | 'status'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'reservations'), {
    ...data,
    status: 'confirmed',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function saveOrder(data: Omit<OrderData, 'createdAt' | 'status'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...data,
    status: 'kitchen-prep',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function fetchUserReservations(userId: string): Promise<ReservationData[]> {
  try {
    const q = query(
      collection(db, 'reservations'), 
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReservationData));
  } catch (err) {
    console.error('Error fetching reservations:', err);
    return [];
  }
}

export async function fetchUserOrders(userId: string): Promise<OrderData[]> {
  try {
    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as OrderData));
  } catch (err) {
    console.error('Error fetching orders:', err);
    return [];
  }
}
