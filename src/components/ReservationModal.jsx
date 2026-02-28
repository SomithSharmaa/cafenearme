import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose, cafe }) => {
    const [step, setStep] = useState('form'); // 'form' | 'success'
    const [formData, setFormData] = useState({
        name: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: 2
    });

    if (!isOpen || !cafe) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setStep('loading');
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleClose = () => {
        setStep('form');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-lg text-gray-800">
                        {step === 'success' ? 'Confirmed!' : 'Reserve a Table'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {step === 'success' ? (
                        <div className="flex flex-col items-center text-center py-8 animate-in slide-in-from-bottom-5 duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                                <CheckCircle size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Booked!</h2>
                            <p className="text-gray-500 mb-8">
                                Your table at <span className="font-semibold text-gray-800">{cafe.name}</span> has been confirmed for <span className="font-semibold text-gray-800">{formData.guests} guests</span>.
                            </p>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 bg-black text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                            >
                                Awesome, thanks!
                            </button>
                        </div>
                    ) : step === 'loading' ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                            <p className="text-gray-400 font-medium">Securing your spot...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Cafe Info */}
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                    <img src={cafe.image} alt={cafe.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{cafe.name}</h4>
                                    <p className="text-xs text-gray-500">{cafe.address.split(',')[0]}</p>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium text-gray-800 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Date</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                type="date"
                                                required
                                                className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-3 py-3 font-medium text-gray-800 focus:ring-2 focus:ring-blue-500/20"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Time</label>
                                        <div className="relative">
                                            <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                type="time"
                                                required
                                                className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-3 py-3 font-medium text-gray-800 focus:ring-2 focus:ring-blue-500/20"
                                                value={formData.time}
                                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Guests</label>
                                    <div className="relative">
                                        <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <select
                                            className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-3 py-3 font-medium text-gray-800 focus:ring-2 focus:ring-blue-500/20 appearance-none"
                                            value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: e.target.value })}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                            <option value="9+">9+ Guests</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-black text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg mt-2"
                            >
                                Confirm Reservation
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
